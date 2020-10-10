import evaluate from "../src/utils/evaluate";

test("Evaluate function", () => {
  expect(evaluate((a, b) => [a, b].join(", "), "Param1", "Param2")).toBe(
    "Param1, Param2"
  );
});

test("Evaluate boolean", () => {
  expect(evaluate(true, "Param1", "Param2")).toBe(true);
  expect(evaluate(false, "Param1", "Param2")).toBe(false);
});

test("Evaluate number", () => {
  expect(evaluate(0, "Param1", "Param2")).toBe(0);
});

test("Evaluate string", () => {
  expect(evaluate("string", "Param1", "Param2")).toBe("string");
});

test("Evaluate array", () => {
  expect(evaluate([3, 4, 5], "Param1", "Param2")).toEqual([3, 4, 5]);
});

test("Evaluate object", () => {
  expect(evaluate({ key: "value" }, "Param1", "Param2")).toEqual({
    key: "value"
  });
});
