"use client";

import {useEffect, useRef, useState, type ReactNode} from "react";

export default function Reveal({children, className = ""}: {children: ReactNode; className?: string}) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const target = element.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {setVisible(true); observer.disconnect();}
    }, {threshold: 0.08});
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <div ref={element} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}
