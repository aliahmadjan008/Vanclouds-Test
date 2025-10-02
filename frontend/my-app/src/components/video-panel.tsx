import { Card, Typography } from "antd"

type VideoPanelProps = {
  url?: string
  name?: string
  description?: string
}

function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ" // fallback

  // Handle regular YouTube links
  const watchRegex = /youtube\.com\/watch\?v=([^&]+)/;
  const shortRegex = /youtu\.be\/([^?]+)/;

  if (watchRegex.test(url)) {
    const match = url.match(watchRegex);
    return `https://www.youtube.com/embed/${match?.[1]}`;
  } else if (shortRegex.test(url)) {
    const match = url.match(shortRegex);
    return `https://www.youtube.com/embed/${match?.[1]}`;
  }

  // Already embed or other URL
  return url;
}

export default function VideoPanel({ url, name, description }: VideoPanelProps) {
  const videoUrl = getYouTubeEmbedUrl(url);

  return (
    <section aria-label="Video player" className="w-full">
      <Card size="small" style={{ borderRadius: 8, overflow: "hidden", padding: 0 }}>
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title={name || "Video Player"}
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        {(name || description) && (
          <div className="p-4">
            {name && <Typography.Title level={5}>{name}</Typography.Title>}
            {/* {description && <Typography.Paragraph>{description}</Typography.Paragraph>} */}
          </div>
        )}
      </Card>
    </section>
  )
}
