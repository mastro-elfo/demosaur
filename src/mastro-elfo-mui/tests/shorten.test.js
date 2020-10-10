import shorten from "../src/utils/shorten";

test("String", () => {
  expect(shorten("Hello", 4)).toBe("ello");
});

test("Array", () => {
  expect(shorten("Hello".split(""), 4)).toEqual("ello".split(""));
});
