import unique from "../src/utils/unique";

test("String", () => {
  expect(unique([])).toEqual([]);
  expect(unique([0])).toEqual([0]);

  expect(unique([0, 0])).toEqual([0]);
});
