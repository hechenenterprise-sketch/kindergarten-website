export function GardenSprig({className = ""}: {className?: string}) {
  return <svg className={`garden-sprig ${className}`} viewBox="0 0 70 130" fill="none" aria-hidden="true"><path d="M31 120C45 85 22 52 37 12M35 77C12 78 9 59 10 49C28 49 37 61 35 77ZM35 54C60 48 62 31 57 22C43 26 35 40 35 54ZM36 31C23 19 30 9 37 3C46 14 47 22 36 31Z"/><path d="M13 53L34 73M54 29L36 50"/></svg>;
}

export function GardenFlower({className = ""}: {className?: string}) {
  return <svg className={`garden-flower ${className}`} viewBox="0 0 100 140" fill="none" aria-hidden="true"><path className="flower-stem" d="M49 130C52 104 40 78 52 49M47 105C29 105 25 92 24 84C40 87 48 94 47 105"/><path d="M50 43C26 22 39 8 51 27C60 2 78 17 64 35C94 28 92 50 70 49C88 66 66 82 58 59C48 86 30 66 43 53C17 63 16 38 40 42Z"/><circle cx="54" cy="44" r="7"/></svg>;
}

export function GardenSun({className = ""}: {className?: string}) {
  return <svg className={`garden-sun ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="18"/><path d="M50 8V23M50 77V92M8 50H23M77 50H92M20 20L31 31M69 69L80 80M20 80L31 69M69 31L80 20"/></svg>;
}

export function SakuraBlossom({className = ""}: {className?: string}) {
  return <svg className={`sakura-blossom ${className}`} viewBox="0 0 64 64" aria-hidden="true">
    <g className="sakura-petals">
      <ellipse cx="32" cy="15" rx="8" ry="13"/>
      <ellipse cx="48" cy="27" rx="8" ry="13" transform="rotate(72 48 27)"/>
      <ellipse cx="42" cy="47" rx="8" ry="13" transform="rotate(144 42 47)"/>
      <ellipse cx="22" cy="47" rx="8" ry="13" transform="rotate(216 22 47)"/>
      <ellipse cx="16" cy="27" rx="8" ry="13" transform="rotate(288 16 27)"/>
    </g>
    <circle className="sakura-center" cx="32" cy="32" r="5"/>
  </svg>;
}

export function SakuraBranch({className = ""}: {className?: string}) {
  return <svg className={`sakura-branch ${className}`} viewBox="0 0 180 110" fill="none" aria-hidden="true">
    <path className="sakura-stem" d="M8 93C48 85 61 55 91 49C119 43 137 54 172 16M54 68C48 53 43 44 32 35M101 48C111 34 116 26 127 18"/>
    <g transform="translate(25 22) scale(.43)"><SakuraBlossom/></g>
    <g transform="translate(75 31) scale(.34)"><SakuraBlossom/></g>
    <g transform="translate(117 1) scale(.5)"><SakuraBlossom/></g>
  </svg>;
}

export function StoryCurve({className = "", variant = "hero"}: {className?: string; variant?: "hero" | "about" | "courses"}) {
  const paths = {
    hero: "M-30 155C190 175 240 15 410 38C585 60 680 170 855 105C1020 45 1110 85 1230 10",
    about: "M-30 70C250 155 480 165 730 100C930 48 1070 55 1230 90",
    courses: "M-30 140C140 155 220 50 355 72C490 95 500 155 655 120C790 90 870 20 1010 55C1110 85 1170 125 1230 90",
  };
  return <svg className={`story-curve story-curve-${variant} ${className}`} viewBox="0 0 1200 180" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d={paths[variant]}/></svg>;
}
