import type { RegionPhoto } from "@/lib/region-content";
import Image from "next/image";

type RegionPhotoListProps = {
  photos: RegionPhoto[];
  regionName: string;
};

export function RegionPhotoList({ photos, regionName }: RegionPhotoListProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="px-8 py-16 sm:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="type-kicker text-light-charcoal">
          {regionName} Squad In The Wild
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure
              className="bg-charcoal text-near-white-blue"
              key={photo.slug}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  alt={photo.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                  src={photo.image}
                />
              </div>
              {photo.caption ? (
                <figcaption className="p-4">
                  <p className="font-roboto text-sm leading-5 text-near-white-blue/80">
                    {photo.caption}
                  </p>
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
