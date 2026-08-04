"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { persistCartSummary, shopifyRequest } from "./merch-store";
import { MerchCartButton } from "./merch-cart-button";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
};

type ProductMetafield = {
  key: string;
  value: string;
  type: string;
} | null;

type Product = {
  title: string;
  descriptionHtml: string;
  featuredImage: { url: string; altText: string | null } | null;
  variants: { nodes: Variant[] };
  metafields: ProductMetafield[];
};

function money(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(Number(amount));
}

function readMetafield(metafields: ProductMetafield[], key: string) {
  return metafields.find((metafield) => metafield?.key === key)?.value.trim() ?? "";
}

export function MerchProductDetail({ handle }: { handle: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [bagCount, setBagCount] = useState(0);

  useEffect(() => {
    Promise.resolve().then(() => {
      setBagCount(Number(window.localStorage.getItem("dgg-shopify-cart-total-quantity") ?? 0));
    });
  }, []);

  useEffect(() => {
    shopifyRequest<{ product: Product | null }>(
      `query Product($handle: String!) { product(handle: $handle) { title descriptionHtml featuredImage { url altText } variants(first: 100) { nodes { id title availableForSale price { amount currencyCode } } } metafields(identifiers: [{ namespace: "custom", key: "materials" }]) { key value type } } }`,
      { handle },
    )
      .then(({ product: result }) => {
        setProduct(result);
        setSelectedVariant(result?.variants.nodes[0]?.id ?? "");
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [handle]);

  const variant = product?.variants.nodes.find((item) => item.id === selectedVariant) ?? product?.variants.nodes[0];
  const materials = product ? readMetafield(product.metafields, "materials") : "";
  async function addToBag() {
    if (!variant) return;
    setAdding(true);
    setError(null);
    try {
      const result = await shopifyRequest<{ cartCreate: { cart: { id: string; checkoutUrl: string } | null; userErrors: { message: string }[] } }>(
        `mutation AddToCart($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { id checkoutUrl } userErrors { message } } }`,
        { lines: [{ merchandiseId: variant.id, quantity: 1 }] },
      );
      if (result.cartCreate.userErrors.length) throw new Error(result.cartCreate.userErrors[0].message);
      const nextCheckoutUrl = result.cartCreate.cart?.checkoutUrl ?? null;
      setCheckoutUrl(nextCheckoutUrl);
      if (result.cartCreate.cart) {
        persistCartSummary({ id: result.cartCreate.cart.id, totalQuantity: 1 });
        setBagCount(1);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to add that item.");
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <section className="mx-auto w-full max-w-6xl flex-1 px-8 py-20 sm:px-12 lg:px-20"><p className="type-body">Loading product…</p></section>;
  if (error) return <section className="mx-auto w-full max-w-6xl flex-1 px-8 py-20 sm:px-12 lg:px-20"><p className="bg-accent-red p-4 font-bold text-near-white-blue">{error}</p></section>;
  if (!product || !variant) return <section className="mx-auto w-full max-w-6xl flex-1 px-8 py-20 sm:px-12 lg:px-20"><h1 className="type-section-title">Product not found</h1><Link className="mt-6 inline-block text-brand-blue underline" href="/merch">Back to merch</Link></section>;

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-8 py-14 sm:px-12 lg:px-20 lg:py-20">
      <Link className="font-bold text-brand-blue hover:text-black" href="/merch">← Back to merch</Link>
      <div className="mt-8 grid min-w-0 gap-10 md:grid-cols-2 md:items-start">
        <div className="relative aspect-square w-full min-w-0 overflow-hidden bg-brand-blue/10">
          {product.featuredImage && <Image className="max-w-full object-cover" src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} fill sizes="(min-width: 768px) 50vw, 100vw" />}
        </div>
        <div className="min-w-0">
          <h1 className="type-section-title">{product.title}</h1>
          <p className="mt-4 text-2xl font-bold">{money(variant.price.amount, variant.price.currencyCode)}</p>
          <div className="mt-8 min-w-0 max-w-full overflow-x-auto"><div className="font-roboto leading-7 text-charcoal/80 [&_h1]:mb-3 [&_h1]:font-sans [&_h1]:text-2xl [&_h1]:font-black [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-bold [&_table]:mt-4 [&_table]:inline-table [&_table]:!w-auto [&_table]:max-w-full [&_table]:table-auto [&_table]:border-collapse [&_table]:text-left [&_table]:m-0 [&_table]:p-2 [&_th]:whitespace-nowrap [&_th]:bg-charcoal [&_th]:px-1 [&_th]:py-1 [&_th]:text-xs [&_th]:font-bold [&_th]:text-near-white-blue [&_td]:whitespace-nowrap [&_td]:px-1 [&_td]:py-1 [&_td]:text-sm" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /></div>
          {materials && <p className="mt-5 text-charcoal/80"><strong>Materials:</strong> {materials}</p>}
          {product.variants.nodes.length > 1 && <label className="mt-8 block text-sm font-bold">Size<select className="mt-1 block w-full bg-white px-3 py-3" value={variant.id} onChange={(event) => setSelectedVariant(event.target.value)}>{product.variants.nodes.map((item) => <option disabled={!item.availableForSale} key={item.id} value={item.id}>{item.title}{item.availableForSale ? "" : " — sold out"}</option>)}</select></label>}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="type-button bg-brand-blue px-6 py-4 text-near-white-blue hover:bg-black disabled:cursor-not-allowed disabled:opacity-50" disabled={!variant.availableForSale || adding} onClick={addToBag}>{adding ? "Adding…" : checkoutUrl ? "Added to bag" : "Add to bag"}</button>
            <MerchCartButton className="ml-auto h-14" count={bagCount} />
          </div>
        </div>
      </div>
    </section>
  );
}
