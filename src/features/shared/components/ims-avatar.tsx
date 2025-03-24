"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/features/ui/avatar";
import { cn } from "@/lib/utils";

export function ImsAvatar({
  src,
  fallback,
  alt,
  className,
}: Readonly<{
  src: string | null;
  fallback: string;
  alt: string;
  className?: string;
}>) {
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage alt={alt} src={src ?? undefined} />
      <AvatarFallback className="capitalize">{fallback}</AvatarFallback>
    </Avatar>
  );
}
