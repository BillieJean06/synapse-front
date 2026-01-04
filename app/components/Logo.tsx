import Image from "next/image";

export default function Logo({ size = 160 }) {
  return (
    <Image
      src="/logo-neodits.png"
      alt="Neodits"
      width={size}
      height={size / 3}
      priority
    />
  );
}
