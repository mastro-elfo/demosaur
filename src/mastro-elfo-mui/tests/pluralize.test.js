import pluralize from "../src/utils/pluralize";

test("Plural with count 0", () => {
  expect(pluralize(0, "Singular", "Plural")).toBe("Plural");
});

test("Singular with count 1", () => {
  expect(pluralize(1, "Singular", "Plural")).toBe("Singular");
});

test("Plural with count > 1", () => {
  expect(pluralize(2, "Singular", "Plural")).toBe("Plural");
});
