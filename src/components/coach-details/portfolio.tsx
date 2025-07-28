import { PlayCircleIcon } from "lucide-react"
type Props = {
    media: any[]
}

function Portfolio({media}:Props) {
  return (
     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4">
      {media.map((item, index) => (
        <div
          key={index}
          className="relative aspect-video rounded-lg overflow-hidden shadow-sm group"
        >
          <img
            src={item.thumbnail}
            alt={`Media ${index}`}
            className="w-full h-full object-cover"
          />

          {item.type === "video" && (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <PlayCircleIcon className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
              </div>
              {item.duration && (
                <span className="absolute top-1 right-2 text-xs text-white bg-black bg-opacity-60 rounded px-1">
                  {item.duration}
                </span>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Portfolio