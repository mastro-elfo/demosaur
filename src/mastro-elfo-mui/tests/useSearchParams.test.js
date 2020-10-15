import { reducer } from "../src/utils/useSearchParams";

test("Empty search", () => {
  expect(reducer("")).toEqual({});
  expect(reducer("?")).toEqual({});
});

test("?q=query", () => {
  expect(reducer("?q=query")).toEqual({ q: "query" });
});

test("?q=query&p=param", () => {
  expect(reducer("?q=query&p=param")).toEqual({ q: "query", p: "param" });
});
