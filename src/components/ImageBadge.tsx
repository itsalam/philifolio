import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { cn } from "@/src/lib/utils";

type ImageBadgeProps = {
  src: string;
} & React.ComponentPropsWithoutRef<typeof Avatar>;

export function ImageBadge(props: ImageBadgeProps) {
  const { src, className, ...rest } = props;
  return (
    <Avatar
      {...rest}
      className={cn(
        className,
        "border-4 border-black drop-shadow-2xl shadow-2xl",
      )}
    >
      <AvatarImage src={src} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
