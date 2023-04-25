import React from "react";
import { render } from "@testing-library/react";
import Coins from "./CoinList";

it("renders without crashing", function() {
  render(<Coins />);
});

it("matches snapshot with no coins", function() {
  const { asFragment } = render(<Coins />);
  expect(asFragment()).toMatchSnapshot();
});
