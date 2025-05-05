export function info(...args: unknown[]): void {
  console.log('%cINFO', 'background:#4CAF50;color: #111;padding:0 5px;border-radius:10px', ...args)
}

export function warn(...args: unknown[]): void {
  console.warn('%cWARN', 'background:#FF9800;color: #111;padding:0 5px;border-radius:10px', ...args)
}
