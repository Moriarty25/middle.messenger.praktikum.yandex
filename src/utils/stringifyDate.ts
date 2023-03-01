export function stringifyDate(date: string | undefined): string {
  if (date) {
    return new Date(date).toLocaleTimeString([], { timeStyle: "short" });
  }
  return "";
}
