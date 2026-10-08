export function Butterfly({className = ""}: {className?: string}) {
  return <svg className={`garden-accent butterfly ${className}`} viewBox="0 0 100 80" fill="none" aria-hidden="true"><path d="M49 44C20 2 1 15 14 39C18 47 31 48 46 48C16 45 17 74 35 66L50 51M52 44C68 3 100 13 87 37C82 46 70 48 56 49C91 42 84 77 66 64L54 52"/><path d="M50 39L54 59M50 39L41 30M51 39L58 27"/><path d="M24 24L35 35M72 23L65 35"/></svg>;
}

export function Rainbow() {
  return <svg className="garden-accent little-rainbow" viewBox="0 0 110 80" fill="none" aria-hidden="true"><path d="M12 67C12-6 98-6 98 67"/><path d="M24 67C24 11 86 11 86 67"/><path d="M36 67C36 28 74 28 74 67"/><path d="M4 73H30M80 73H106"/></svg>;
}

export function LittleCloud() {
  return <svg className="garden-accent little-cloud" viewBox="0 0 100 65" fill="none" aria-hidden="true"><path d="M22 47C1 48 5 23 23 27C21 3 58 0 63 25C84 9 105 45 78 48Z"/><path d="M26 56L23 61M48 55L45 61M70 55L67 60"/></svg>;
}
