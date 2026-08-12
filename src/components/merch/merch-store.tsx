"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { MerchCartButton } from "./merch-cart-button";

type ShopifyProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  featuredImage: { url: string; altText: string | null } | null;
  variants: {
    nodes: {
      id: string;
      title: string;
      availableForSale: boolean;
      price: { amount: string; currencyCode: string };
    }[];
  };
};

type StoreProduct = Omit<ShopifyProduct, "variants"> & {
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
  }[];
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: CartLine[] };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    title: string;
    price: { amount: string; currencyCode: string };
    product: { title: string; handle: string; featuredImage: { url: string; altText: string | null } | null };
  };
};

const endpoint = "https://store.digitalgroundgame.org/api/2026-07/graphql.json";
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const cartFields = `id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } lines(first: 100) { nodes { id quantity merchandise { ... on ProductVariant { title price { amount currencyCode } product { title handle featuredImage { url altText } } } } } }`;

const productsQuery = `query Products {
  products(first: 24, sortKey: TITLE) {
    nodes { id title handle description descriptionHtml featuredImage { url altText }
      variants(first: 100) { nodes { id title availableForSale price { amount currencyCode } } }
    }
  }
}`;

export async function shopifyRequest<T>(query: string, variables?: Record<string, unknown>) {
  if (!storefrontToken) throw new Error("Shopify is not configured yet.");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": storefrontToken },
    body: JSON.stringify({ query, variables }),
  });
  const payload = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (!response.ok || payload.errors?.length) throw new Error(payload.errors?.[0]?.message ?? "Shopify request failed.");
  return payload.data as T;
}

export function money(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(Number(amount));
}

export function persistCartSummary(cart: Pick<Cart, "id" | "totalQuantity"> | null) {
  if (typeof window === "undefined") return;
  if (!cart) {
    window.localStorage.removeItem("dgg-shopify-cart-id");
    window.localStorage.removeItem("dgg-shopify-cart-total-quantity");
    return;
  }
  window.localStorage.setItem("dgg-shopify-cart-id", cart.id);
  window.localStorage.setItem("dgg-shopify-cart-total-quantity", String(cart.totalQuantity));
}

export function MerchStore() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [bagCount, setBagCount] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [busyProduct, setBusyProduct] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      setBagCount(Number(window.localStorage.getItem("dgg-shopify-cart-total-quantity") ?? 0));
    });
  }, []);

  useEffect(() => {
    shopifyRequest<{ products: { nodes: ShopifyProduct[] } }>(productsQuery)
      .then(({ products: result }) => {
        const normalizedProducts: StoreProduct[] = result.nodes.map((product) => ({
          ...product,
          variants: product.variants.nodes,
        }));
        setProducts(normalizedProducts);
        setSelectedVariants(Object.fromEntries(normalizedProducts.map((product) => [product.id, product.variants[0]?.id ?? ""])));
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  async function addToCart(product: StoreProduct) {
    const merchandiseId = selectedVariants[product.id];
    if (!merchandiseId) return;
    setBusyProduct(product.id);
    setError(null);
    try {
      const existingCartId = window.localStorage.getItem("dgg-shopify-cart-id");
      if (existingCartId) {
        const result = await shopifyRequest<{ cartLinesAdd: { cart: Cart | null; userErrors: { message: string }[] } }>(
          `mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${cartFields} } userErrors { message } } }`,
          { cartId: existingCartId, lines: [{ merchandiseId, quantity: 1 }] },
        );
        if (result.cartLinesAdd.userErrors.length) throw new Error(result.cartLinesAdd.userErrors[0].message);
        if (result.cartLinesAdd.cart) {
          persistCartSummary(result.cartLinesAdd.cart);
          setBagCount(result.cartLinesAdd.cart.totalQuantity);
        }
      } else {
        const result = await shopifyRequest<{ cartCreate: { cart: Cart | null; userErrors: { message: string }[] } }>(
          `mutation AddToCart($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { ${cartFields} } userErrors { message } } }`,
          { lines: [{ merchandiseId, quantity: 1 }] },
        );
        if (result.cartCreate.userErrors.length) throw new Error(result.cartCreate.userErrors[0].message);
        if (result.cartCreate.cart) {
          persistCartSummary(result.cartCreate.cart);
          setBagCount(result.cartCreate.cart.totalQuantity);
        }
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to add that item.");
    } finally {
      setBusyProduct(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-8 py-14 sm:px-12 lg:px-20 lg:py-20">
      <div className="flex justify-center">
        <div className="w-full text-center"><div className="flex items-center justify-center gap-4"><PixelIcon className="h-12 w-12 shrink-0 text-black sm:h-16 sm:w-16" name="business-product-price-tag" /><h1 className="type-hero uppercase">MERCH</h1></div></div>
        <MerchCartButton count={bagCount} />
      </div>
      {error && <p className="mt-10 bg-accent-red p-4 font-bold text-near-white-blue">{error}</p>}
      {loading && <p className="mt-12 type-body">Loading the shop…</p>}
      {!loading && !error && products.length === 0 && <p className="mt-12 type-body">The shop is getting stocked. Check back soon.</p>}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const selected = product.variants.find((variant) => variant.id === selectedVariants[product.id]) ?? product.variants[0];
          return <article className="flex flex-col bg-white" key={product.id}>
            <Link className="relative aspect-square w-full min-w-0 overflow-hidden bg-brand-blue/10" href={`/merch/${product.handle}`} aria-label={`View details for ${product.title}`}>{product.featuredImage && <Image className="max-w-full object-cover" src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />}</Link>
            <div className="flex flex-1 flex-col p-5"><Link className="group" href={`/merch/${product.handle}`}><h2 className="text-2xl font-black group-hover:text-brand-blue">{product.title}</h2></Link>
              {product.variants.length > 1 && <label className="mt-5 text-sm font-bold">Size<select className="mt-1 block w-full bg-near-white-blue px-3 py-2" value={selected?.id} onChange={(event) => setSelectedVariants((current) => ({ ...current, [product.id]: event.target.value }))}>{product.variants.map((variant) => <option disabled={!variant.availableForSale} key={variant.id} value={variant.id}>{variant.title}{variant.availableForSale ? "" : " — sold out"}</option>)}</select></label>}
              <div className="mt-auto flex items-center justify-between gap-4 pt-6"><span className="text-xl font-bold">{selected && money(selected.price.amount, selected.price.currencyCode)}</span><button className="type-button bg-brand-blue px-4 py-3 text-near-white-blue transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50" disabled={!selected?.availableForSale || busyProduct === product.id} onClick={() => addToCart(product)}>{busyProduct === product.id ? "Adding…" : "Add to bag"}</button></div>
            </div>
          </article>;
        })}
      </div>
    </section>
  );
}
