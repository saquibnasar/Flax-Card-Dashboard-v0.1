"use client";
import { useState, useEffect } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
type ClientImageWithFallbackProps = ImageProps & {
  fallbackSrc: StaticImageData;
};

const ClientImageWithFallback = ({
  src,
  alt = "image",
  fallbackSrc,
  ...props
}: ClientImageWithFallbackProps) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackSrc : src}
      {...props}
    />
  );
};
export default ClientImageWithFallback;
