"use client";

import Image from "next/image";
import {useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type FeaturedActivityItem = {id: string; imageUrl: string; title: string; description: string};

export default function FeaturedActivities({items}: {items: FeaturedActivityItem[]}) {
  const [index, setIndex] = useState(-1);
  return <>
    <div className="featured-activity-grid">
      {items.map((item, itemIndex) => <button key={item.id} type="button" className="featured-activity-card" onClick={() => setIndex(itemIndex)} aria-label={`放大查看：${item.title}`}>
        <span className="featured-activity-image"><Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 800px) 100vw, 33vw"/></span>
        <span className="featured-activity-copy"><small>FEATURED ACTIVITY</small><strong>{item.title}</strong><span>{item.description}</span><em>點擊查看完整照片</em></span>
      </button>)}
    </div>
    <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={items.map(item => ({src: item.imageUrl, alt: item.title}))} on={{view: ({index: currentIndex}) => setIndex(currentIndex)}}/>
  </>;
}
