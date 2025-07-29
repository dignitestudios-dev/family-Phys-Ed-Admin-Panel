import { PlayCircleIcon } from "lucide-react"
type Props = {
    media: {
  id: number;
  url: string;
  model_type: string;
  model_id: number;
  type: 'image' | 'video' | string;
  video_duration: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}[]
}

function Portfolio({media}:Props) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {media.length > 0 ? (
        media.map((item, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden shadow-sm group"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.url}`}
              alt={`Media ${index}`}
              className="w-full h-full object-cover"
            />

            {item.type === "video" && (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <PlayCircleIcon className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                {item.video_duration && (
                  <span className="absolute top-1 right-2 text-xs text-white bg-black bg-opacity-60 rounded px-1">
                    {item.video_duration}s
                  </span>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <div className="bg-secondary h-[200px] flex items-center justify-center rounded-2xl w-full">
          <h1 className="text-white">No Media Found</h1>
        </div>
      )}
    </div>
  );
}

export default Portfolio