import React from "react";
import { render } from "@testing-library/react";
import CoinCard from "./CoinCard";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  let item = { symbol: "CEO", price: 1000000};
  const { asFragment } = render(
      <UserProvider>
        <CoinCard item={item} />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
