interface MapEmbedProps {
  src: string;
  title: string;
  mapsUrl: string;
}

export function MapEmbed({ src, title, mapsUrl }: MapEmbedProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-bg-base/85 px-3 py-1.5 text-xs font-medium text-text-primary backdrop-blur-md transition-colors hover:bg-bg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        Abrir en Maps
        <span aria-hidden="true">↗</span>
        <span className="sr-only"> ({title})</span>
      </a>
    </div>
  );
}
