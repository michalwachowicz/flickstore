import normalizeString from "../stringNormalizer";

describe("stringNormalizer", () => {
  it("trims spaces", () => {
    expect(normalizeString("   test  ")).toBe("test");
    expect(normalizeString("     ")).toBe("");
  });

  it("converts to lowercase", () => {
    expect(normalizeString("Abc DEF")).toBe("abc def");
  });

  it("removes accents", () => {
    expect(normalizeString("Śćńśóą")).toBe("scnsoa");
  });

  it("removes special characters and keeps only alphanumeric and spaces", () => {
    expect(normalizeString("spider,-man: across the spiderverse!")).toBe(
      "spiderman across the spiderverse",
    );
  });

  it("collapses multiple spaces", () => {
    expect(normalizeString("pulp         fiction")).toBe("pulp fiction");
  });
});
