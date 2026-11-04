export type PageItem = number | "gap";

// First, last, and a window around the current page; the window widens at the
// ends so page 1 reads "1 2 3 4 5 … 16" rather than "1 2 … 16".
export function pageItems(page: number, count: number): PageItem[] {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);
  let start = Math.max(2, page - 1);
  let end = Math.min(count - 1, page + 1);
  if (page <= 4) {
    start = 2;
    end = 5;
  } else if (page >= count - 3) {
    start = count - 4;
    end = count - 1;
  }
  const items: PageItem[] = [1];
  if (start > 2) items.push("gap");
  for (let n = start; n <= end; n++) items.push(n);
  if (end < count - 1) items.push("gap");
  items.push(count);
  return items;
}
