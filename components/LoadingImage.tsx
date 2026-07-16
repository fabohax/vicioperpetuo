"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

type LoadingImageProps = ComponentProps<typeof Image> & {
  allowOverflow?: boolean;
  wrapperClassName?: string;
  spinnerLabel?: string;
};

const LoadingImage = ({
  allowOverflow = false,
  alt,
  className = "",
  onLoad,
  onError,
  spinnerLabel,
  wrapperClassName = "",
  style,
  ...props
}: LoadingImageProps) => {
  const [loading, setLoading] = useState(true);
  const srcValue = typeof props.src === "string" ? props.src : "";
  const isImgurImage = srcValue.includes("imgur.com");
  const imageStyle = isImgurImage
    ? { ...style, width: style?.width ?? "auto", height: style?.height ?? "auto" }
    : { width: "auto", height: "auto", ...style };

  return (
    <span className={`relative block ${allowOverflow ? "overflow-visible" : "overflow-hidden"} ${wrapperClassName}`}>
      {loading && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-transparent">
          <LoadingSpinner label={spinnerLabel || `Cargando ${alt}`} />
        </span>
      )}
      <Image
        {...props}
        alt={alt}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"}`}
        style={imageStyle}
        onLoad={(event) => {
          setLoading(false);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoading(false);
          onError?.(event);
        }}
      />
    </span>
  );
};

export default LoadingImage;
