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
        className="h-10 w-10 shrink-0 rounded-full object-cover"
        height={40}
        src={picture}
        width={40}
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal/10">
      <PixelIcon
        className="h-6 w-6 translate-y-0.5 text-red-600"
        name="user-man-love"
      />
    </div>
  );
}
