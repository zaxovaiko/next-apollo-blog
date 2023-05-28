export type Tail<T extends unknown[]> = ((...args: T) => void) extends (
  _arg: any,
  ...rest: infer R
) => void
  ? R
  : never;
