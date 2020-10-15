import clean from "../src/utils/clean";

test("None", () => {
  expect(clean("", {})).toBe("");
  expect(clean(" aB3$", {})).toBe(" aB3$");
});

test("Lower case", () => {
  expect(clean("", { lower: true })).toBe("");
  expect(clean("ABCDE", { lower: true })).toBe("abcde");
  expect(clean("12345", { lower: true })).toBe("12345");
  expect(clean("~!@#$", { lower: true })).toBe("~!@#$");
});

test("Trim", () => {
  expect(clean("", { trim: true })).toBe("");
  expect(clean(" ", { trim: true })).toBe("");
  expect(clean(" aB3$ ", { trim: true })).toBe("aB3$");
});

test("Deburr", () => {
  expect(clean("ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÎÏÐÑÖØÙÚÛÜÝÞß", { deburr: true })).toBe(
    "AAAAAAAeCEEEEIIIIIDNOOUUUUYThss"
  );
  expect(clean("àáâãäåæçèéêëìíîîïðñöøùúûüýþß", { deburr: true })).toBe(
    "aaaaaaaeceeeeiiiiidnoouuuuythss"
  );
});

test("Compact spaces", () => {
  expect(clean(" aB3$", { replace_symbol: "-" })).toBe("-aB3-");
});

test("Compact spaces", () => {
  expect(clean("  a  B  3  $  ", { compact_spaces: true })).toBe(" a B 3 $ ");
});

/*
{
  lower: false,
  trim: false,
  deburr: false,
  replace_symbol: false,
  compact_spaces: false
}
 */
