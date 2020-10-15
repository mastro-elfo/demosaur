import React from "react";
import renderer from "react-test-renderer";

import ResultList from "../src/components/ResultList";
import { IconButton } from "@material-ui/core";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";

test("Render", () => {
  const component = renderer.create(
    <ResultList
      subheader="subheader"
      results={[
        {
          primary: "Primary",
          secondary: "Secondary",
          onClick: () => {},
          LeftIcon: <BrokenImageIcon />,
          rightAction: (
            <IconButton onClick={() => {}}>
              <span />
            </IconButton>
          )
        }
      ].map((item, i) => ({ key: i, ...item }))}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
