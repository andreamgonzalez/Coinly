"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Coin = require("./coin.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testCoinIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let coins = await Coin.findAll();
    expect(coins).toEqual([
      {
        id: testCoinIds[0],
        symbol: "DEF",
        price: 200
      },
      {
        id: testCoinIds[1],
        title: "ABC",
        price: 1000
      }
    ]);
  });

  test("works: by min price", async function () {
    let coins = await Coin.findAll({ minPrice: 1000 });
    expect(coins).toEqual([
      {
        id: testCoinIds[1],
        symbol: "ABC",
        price: 1000
      },
    ]);
  });

  test("works: by name", async function () {
    let coins = await Coin.findAll({ symbol: "DEF" });
    expect(coins).toEqual([
      {
        id: testCoinIds[0],
        symbol: "DEF",
        price: 200
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let coin = await Coin.get(testCoinIds[0]);
    expect(coin).toEqual({
      id: testCoinIds[0],
      symbol: "ABC",
      price: 1000,
    });
  });

  test("not found if no such coin", async function () {
    try {
      await Coin.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
