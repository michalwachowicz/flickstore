import { act } from "react";
import getBreakpointValue from "../mediaQueryUtils";
import VisibleCountObject from "../../interfaces/VisibleCountObject";

describe("mediaQueryUtils", () => {
  const updateWidth = (value: number) => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value,
    });
    window.dispatchEvent(new Event("resize"));
  };

  const checkBreakpointValue = (
    innerWidth: number,
    visibleCount: VisibleCountObject,
    expectedValue: number,
  ) => {
    act(() => {
      updateWidth(innerWidth);
    });

    expect(getBreakpointValue(visibleCount)).toEqual(expectedValue);
  };

  describe("getBreakpointValue", () => {
    it("returns proper values for different breakpoints", () => {
      const visibleCount = { sm: 1, md: 2, lg: 3, xl: 4 };

      [
        { innerWidth: 1600, expectedValue: 4 },
        { innerWidth: 1024, expectedValue: 3 },
        { innerWidth: 768, expectedValue: 2 },
        { innerWidth: 640, expectedValue: 1 },
        { innerWidth: 300, expectedValue: 1 },
      ].forEach(({ innerWidth, expectedValue }) => {
        checkBreakpointValue(innerWidth, visibleCount, expectedValue);
      });
    });
  });
});
