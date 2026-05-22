"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cartFields, money, persistCartSummary, shopifyRequest, type Cart } from "./merch-store";

export function MerchBag() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingLine, setUpdatingLine] = useState<string | null>(null);

  useEffect(() => {
    const cartId = window.localStorage.getItem("dgg-shopify-cart-id");
    if (!cartId) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }
    shopifyRequest<{ cart: Cart | null }>(
      `query CurrentCart($cartId: ID!) { cart(id: $cartId) { ${cartFields} } }`,
      { cartId },
    )
      .then(({ cart: result }) => {
        setCart(result?.totalQuantity ? result : null);
        persistCartSummary(result?.totalQuantity ? result : null);
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const cartTotal = useMemo(() => cart ? money(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode) : null, [cart]);

  async function updateLine(lineId: string, quantity: number) {
    if (!cart) return;
    setUpdatingLine(lineId);
    setError(null);
    try {
      const result = quantity === 0
        ? await shopifyRequest<{ cartLinesRemove: { cart: Cart | null; userErrors: { message: string }[] } }>(
            `mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${cartFields} } userErrors { message } } }`,
            { cartId: cart.id, lineIds: [lineId] },
          )
        : await shopifyRequest<{ cartLinesUpdate: { cart: Cart | null; userErrors: { message: string }[] } }>(
            `mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${cartFields} } userErrors { message } } }`,
            { cartId: cart.id, lines: [{ id: lineId, quantity }] },
          );
      const mutation = "cartLinesRemove" in result ? result.cartLinesRemove : result.cartLinesUpdate;
      if (mutation.userErrors.length) throw new Error(mutation.userErrors[0].message);
      if (mutation.cart?.totalQuantity) {
        setCart(mutation.cart);
        persistCartSummary(mutation.cart);
      } else {
        setCart(null);
        persistCartSummary(null);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update your bag.");
    } finally {
      setUpdatingLine(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-8 py-14 sm:px-12 lg:px-20 lg:py-20">
      <Link className="font-bold text-brand-blue hover:text-black" href="/merch">← Continue shopping</Link>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-5"><div><h1 className="type-hero">Your bag.</h1></div>{cart && <p className="text-xl font-bold">{cart.totalQuantity} item{cart.totalQuantity === 1 ? "" : "s"} · {cartTotal}</p>}</div>
      {error && <p className="mt-8 bg-accent-red p-4 font-bold text-near-white-blue">{error}</p>}
      {loading && <p className="mt-10 type-body">Loading your bag…</p>}
      {!loading && !cart && !error && <div className="mt-10 bg-white p-8"><p className="type-body">Your bag is empty.</p><Link className="type-button mt-6 inline-block bg-brand-blue px-5 py-3 text-near-white-blue hover:bg-black" href="/merch">Shop merch</Link></div>}
      {cart && <div className="mt-10 grid gap-4">{cart.lines.nodes.map((line) => <article className="grid gap-5 bg-white p-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-6" key={line.id}><Link className="relative aspect-square bg-brand-blue/10" href={`/merch/${line.merchandise.product.handle}`} aria-label={`View details for ${line.merchandise.product.title}`}><Image className="object-cover" src={line.merchandise.product.featuredImage?.url ?? "/dgg-og-image.png"} alt={line.merchandise.product.featuredImage?.altText ?? line.merchandise.product.title} fill sizes="112px" /></Link><div><Link className="group" href={`/merch/${line.merchandise.product.handle}`}><h2 className="text-xl font-black group-hover:text-brand-blue">{line.merchandise.product.title}</h2></Link><p className="mt-1 text-charcoal/70">{line.merchandise.title}</p><p className="mt-2 font-bold">{money(line.merchandise.price.amount, line.merchandise.price.currencyCode)} each</p></div><div className="flex items-center gap-2 sm:justify-self-end"><button aria-label={`Decrease quantity of ${line.merchandise.product.title}`} className="grid h-9 w-9 place-items-center bg-charcoal font-bold text-near-white-blue hover:bg-black disabled:opacity-50" disabled={updatingLine === line.id} onClick={() => updateLine(line.id, line.quantity - 1)}>−</button><span className="min-w-7 text-center font-bold">{line.quantity}</span><button aria-label={`Increase quantity of ${line.merchandise.product.title}`} className="grid h-9 w-9 place-items-center bg-charcoal font-bold text-near-white-blue hover:bg-black disabled:opacity-50" disabled={updatingLine === line.id} onClick={() => updateLine(line.id, line.quantity + 1)}>+</button><button className="ml-3 text-sm font-bold text-accent-red underline" disabled={updatingLine === line.id} onClick={() => updateLine(line.id, 0)}>Remove</button></div></article>)}</div>}
      {cart && <div className="mt-8 flex flex-col items-start gap-4 bg-brand-blue p-6 text-near-white-blue sm:flex-row sm:items-center sm:justify-between"><p className="text-2xl font-bold">Total · {cartTotal}</p><a className="type-button bg-charcoal px-5 py-3 hover:bg-black" href={cart.checkoutUrl} target="_blank" rel="noopener noreferrer">Checkout</a></div>}
    </section>
  );
}
