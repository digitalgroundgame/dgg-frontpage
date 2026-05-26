import { PixelIcon } from "@/components/pixel-icon";
import Image from "next/image";

type AuthorAvatarProps = {
  name: string;
  picture?: string | null;
};

export function AuthorAvatar({ name, picture }: AuthorAvatarProps) {
  if (picture) {
    return (
      <Image
        alt={name}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        height={48}
        src={picture}
        width={48}
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue">
      <PixelIcon
        className="h-7 w-7 translate-x-1 translate-y-0.5 text-near-white-blue"
        name="user-man-love"
      />
    </div>
  );
}
