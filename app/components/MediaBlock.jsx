export default function MediaBlock({
  src,
  alt = "",
  tone = "porto",
  size = "md",
  className = "",
  priority = false,
}) {
  const classes = `media media-${size} ${className}`.trim();

  if (src) {
    return (
      <div className={classes} data-tone={tone}>
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      </div>
    );
  }

  return <div className={classes} data-tone={tone} aria-hidden="true" />;
}
