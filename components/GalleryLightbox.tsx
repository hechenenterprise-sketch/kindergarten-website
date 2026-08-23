"use client";

import Image from "next/image";
import {useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type GalleryImage = {
  src: string;
  title: string;
};

type Props = {
  images: GalleryImage[];
};

export default function GalleryLightbox({images}: Props) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {images.map((item, itemIndex) => (
          <button
            key={`${item.title}-${itemIndex}`}
            type="button"
            onClick={() => setIndex(itemIndex)}
            className="group overflow-hidden rounded-[28px] bg-white text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[#df0873]">
                點擊放大查看
              </p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((item) => ({
          src: item.src,
          alt: item.title,
        }))}
        on={{
          view: ({index: currentIndex}) => setIndex(currentIndex),
        }}
      />
    </>
  );
}