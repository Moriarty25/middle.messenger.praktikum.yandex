export function debounce<T extends Function>(cb: T, wait = 250) {
  let h = 0;
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}
