export * from './txUrl';

export function shortenAddress(
  address: string,
  chars = 4,
  dot = '.',
): string {
  return `${address.slice(0, chars)}${dot}${dot}${dot}${address.slice(
    -chars,
  )}`;
}
