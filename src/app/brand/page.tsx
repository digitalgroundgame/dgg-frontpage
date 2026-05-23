import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const colors = [
  {
    name: "Primary Brand Blue",
    hex: "#1144FF",
    variable: "--color-brand-blue",
    textClass: "text-brand-blue",
    bgClass: "bg-brand-blue",
    sampleClass: "bg-brand-blue text-near-white-blue",
  },
  {
    name: "Darker Blue",
    hex: "#123EDE",
    variable: "--color-dark-blue",
    textClass: "text-dark-blue",
    bgClass: "bg-dark-blue",
    sampleClass: "bg-dark-blue text-near-white-blue",
  },
  {
    name: "Near White Blue",
    hex: "#EEF2FF",
    variable: "--color-near-white-blue",
    textClass: "text-near-white-blue",
    bgClass: "bg-near-white-blue",
    sampleClass: "bg-near-white-blue text-charcoal",
  },
  {
    name: "Accent Red",
    hex: "#FF0F43",
    variable: "--color-accent-red",
    textClass: "text-accent-red",
    bgClass: "bg-accent-red",
    sampleClass: "bg-accent-red text-near-white-blue",
  },
  {
    name: "Charcoal",
    hex: "#242424",
    variable: "--color-charcoal",
    textClass: "text-charcoal",
    bgClass: "bg-charcoal",
    sampleClass: "bg-charcoal text-near-white-blue",
  },
  {
    name: "Lighter Charcoal",
    hex: "#333333",
    variable: "--color-light-charcoal",
    textClass: "text-light-charcoal",
    bgClass: "bg-light-charcoal",
    sampleClass: "bg-light-charcoal text-near-white-blue",
  },
  {
    name: "Black",
    hex: "#000000",
    variable: "--color-black",
    textClass: "text-black",
    bgClass: "bg-black",
    sampleClass: "bg-black text-near-white-blue",
  },
];

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h1 className="text-5xl font-black leading-tight md:text-7xl">
          Brand Palette
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-9">
          Use these colors for the DGG frontpage. New colors should be rare and
          intentional.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-16 sm:px-10 md:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <article className="bg-charcoal p-4 text-near-white-blue" key={color.name}>
            <div className={`${color.sampleClass} min-h-44 p-5`}>
              <h2 className="text-3xl font-black">{color.name}</h2>
              <p className="mt-4 text-xl font-bold">{color.hex}</p>
            </div>
            <dl className="grid gap-3 px-2 py-5 text-sm">
              <div>
                <dt className="font-black uppercase tracking-[0.18em] text-accent-red">
                  CSS variable
                </dt>
                <dd className="mt-1 font-bold">{color.variable}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.18em] text-accent-red">
                  Text class
                </dt>
                <dd className="mt-1 font-bold">{color.textClass}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.18em] text-accent-red">
                  Background class
                </dt>
                <dd className="mt-1 font-bold">{color.bgClass}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <section className="bg-brand-blue px-6 py-14 text-near-white-blue sm:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black">Usage</h2>
            <p className="mt-5 text-lg leading-8">
              Brand blue and near-white blue should carry most layouts. Darker
              blue pairs with brand blue on layered surfaces. Charcoal, lighter
              charcoal, and black are for grounding sections, footer surfaces,
              and high-contrast text.
            </p>
          </div>
          <div className="bg-near-white-blue p-6 text-charcoal">
            <h3 className="text-2xl font-black">Example</h3>
            <pre className="mt-4 overflow-x-auto bg-black p-4 text-sm leading-6 text-near-white-blue">
              <code>{`<section className="bg-brand-blue text-near-white-blue">
  <a className="bg-accent-red px-5 py-3 font-bold">
    Donate
  </a>
</section>`}</code>
            </pre>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
