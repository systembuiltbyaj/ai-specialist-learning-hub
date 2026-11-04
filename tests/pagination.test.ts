import { describe, expect, it } from "vitest";
import { pageItems } from "@/app/lib/pagination";

describe("pageItems", () => {
  it("lists every page when there are seven or fewer", () => {
    expect(pageItems(1, 1)).toEqual([1]);
    expect(pageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("widens the window at the start instead of showing a lone gap", () => {
    expect(pageItems(1, 16)).toEqual([1, 2, 3, 4, 5, "gap", 16]);
    expect(pageItems(4, 16)).toEqual([1, 2, 3, 4, 5, "gap", 16]);
  });

  it("centres a window on middle pages with gaps on both sides", () => {
    expect(pageItems(8, 16)).toEqual([1, "gap", 7, 8, 9, "gap", 16]);
  });

  it("widens the window at the end", () => {
    expect(pageItems(16, 16)).toEqual([1, "gap", 12, 13, 14, 15, 16]);
    expect(pageItems(13, 16)).toEqual([1, "gap", 12, 13, 14, 15, 16]);
  });

  it("always includes the first, last and current page", () => {
    for (let count = 8; count <= 20; count++) {
      for (let page = 1; page <= count; page++) {
        const items = pageItems(page, count);
        expect(items[0]).toBe(1);
        expect(items[items.length - 1]).toBe(count);
        expect(items).toContain(page);
      }
    }
  });
});
