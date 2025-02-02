import getBackdropWidth from "../backdropUtils";

describe("backdropUtils", () => {
  describe("getBackdropWidth()", () => {
    it("returns proper value based on window width", () => {
      expect(getBackdropWidth(280)).toBe(300);
      expect(getBackdropWidth(780)).toBe(780);
      expect(getBackdropWidth(1200)).toBe(1280);
    });
  });
});
