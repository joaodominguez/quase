export default function MediaBlock({ tone = "porto", size = "md", className = "" }) {
  return (
    <div
      className={`media media-${size} ${className}`.trim()}
      data-tone={tone}
      aria-hidden="true"
    />
  );
}
