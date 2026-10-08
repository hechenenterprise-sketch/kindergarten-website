export function GardenSprig({className = ""}: {className?: string}) {
  return <svg className={`garden-sprig ${className}`} viewBox="0 0 70 130" fill="none" aria-hidden="true"><path d="M31 120C45 85 22 52 37 12M35 77C12 78 9 59 10 49C28 49 37 61 35 77ZM35 54C60 48 62 31 57 22C43 26 35 40 35 54ZM36 31C23 19 30 9 37 3C46 14 47 22 36 31Z"/><path d="M13 53L34 73M54 29L36 50"/></svg>;
}

export function GardenFlower({className = ""}: {className?: string}) {
  return <svg className={`garden-flower ${className}`} viewBox="0 0 100 140" fill="none" aria-hidden="true"><path className="flower-stem" d="M49 130C52 104 40 78 52 49M47 105C29 105 25 92 24 84C40 87 48 94 47 105"/><path d="M50 43C26 22 39 8 51 27C60 2 78 17 64 35C94 28 92 50 70 49C88 66 66 82 58 59C48 86 30 66 43 53C17 63 16 38 40 42Z"/><circle cx="54" cy="44" r="7"/></svg>;
}

export function GardenSun({className = ""}: {className?: string}) {
  return <svg className={`garden-sun ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="18"/><path d="M50 8V23M50 77V92M8 50H23M77 50H92M20 20L31 31M69 69L80 80M20 80L31 69M69 31L80 20"/></svg>;
}

export function StoryCurve({className = ""}: {className?: string}) {
  return <svg className={`story-curve ${className}`} viewBox="0 0 1200 180" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M-30 135C180 245 255 12 435 60S680 180 850 88S1065 82 1230 15"/></svg>;
}
