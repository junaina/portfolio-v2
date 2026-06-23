type ResponsiveImageProps = {
  mobileSrc: string;
  desktopSrc: string;
  alt?: string;
  className?: string;
};

export default function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  alt = "",
  className = "",
}: ResponsiveImageProps) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrc} />
      <img src={desktopSrc} alt={alt} className={className} draggable={false} />
    </picture>
  );
}
