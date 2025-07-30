'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
}

const Slider: React.FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[400px] bg-black/20 rounded-xl overflow-hidden relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${images[selected]}`}
          alt={`Product image ${selected + 1}`}
          fill
          className="object-contain  h-[400px]"
        />
      </div>
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`w-20 h-20 relative rounded-md overflow-hidden cursor-pointer border-2 ${
              selected === idx ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => setSelected(idx)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${img}`}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
