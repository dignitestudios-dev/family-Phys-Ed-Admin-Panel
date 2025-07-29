import { PlayCircleIcon } from "lucide-react";
import { useState } from "react";

type MediaItem = {
  id: number;
  url: string;
  model_type: string;
  model_id: number;
  type: 'image' | 'video' | string;
  video_duration: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type Props = {
  media: MediaItem[];
};

function Portfolio({ media }: Props) {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-4 gap-2 p-4 auto-rows-[150px]">
      {media.length > 0 ? (
        media.map((item, index) => {
          const isLarge = index % 7 === 0 || index % 10 === 2;
          const colSpan = isLarge ? "col-span-2" : "col-span-1";
          const rowSpan = isLarge ? "row-span-2" : "row-span-1";
          const mediaUrl = `${process.env.NEXT_PUBLIC_MEDIA_URL}${item.url}`;
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className={`relative rounded-lg overflow-hidden shadow-sm group cursor-pointer ${colSpan} ${rowSpan}`}
              onClick={() =>
                item.type === "video"
                  ? setPlayingId((prev) => (prev === item.id ? null : item.id))
                  : null
              }
            >
              {item.type === "video" ? (
                isPlaying ? (
                  <video
                    src={mediaUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <img
                      src={mediaUrl}
                      alt={`Video thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircleIcon className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    {item.video_duration && (
                      <span className="absolute bottom-1 right-2 text-xs text-white bg-black bg-opacity-60 rounded px-1">
                        {item.video_duration}s
                      </span>
                    )}
                  </>
                )
              ) : (
                <img
                  src={mediaUrl}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })
      ) : (
        <div className="bg-secondary h-[200px] flex items-center justify-center rounded-2xl w-full col-span-4">
          <h1 className="text-white">No Media Found</h1>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
