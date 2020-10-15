import React from "react";
import renderer from "react-test-renderer";

import AbsoluteCircularProgress from "../src/components/AbsoluteCircularProgress";

test("Render", () => {
  const component = renderer.create(<AbsoluteCircularProgress />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
