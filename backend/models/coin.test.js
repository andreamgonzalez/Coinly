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

/************************************** create */

describe("create", function () {
  let newCoin = {
    companyHandle: "c1",
    title: "Test",
    salary: 100,
    equity: "0.1",
  };

  test("works", async function () {
    let coin = await Coin.create(newCoin);
    expect(coin).toEqual({
      ...newCoin,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let coins = await Coin.findAll();
    expect(coins).toEqual([
      {
        id: testCoinIds[0],
        title: "Coin1",
        salary: 100,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: testCoinIds[1],
        title: "Coin2",
        salary: 200,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: testCoinIds[2],
        title: "Coin3",
        salary: 300,
        equity: "0",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: testCoinIds[3],
        title: "Coin4",
        salary: null,
        equity: null,
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: by min salary", async function () {
    let coins = await Coin.findAll({ minSalary: 250 });
    expect(coins).toEqual([
      {
        id: testCoinIds[2],
        title: "Coin3",
        salary: 300,
        equity: "0",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: by equity", async function () {
    let coins = await Coin.findAll({ hasEquity: true });
    expect(coins).toEqual([
      {
        id: testCoinIds[0],
        title: "Coin1",
        salary: 100,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
      },
      {
        id: testCoinIds[1],
        title: "Coin2",
        salary: 200,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: by min salary & equity", async function () {
    let coins = await Coin.findAll({ minSalary: 150, hasEquity: true });
    expect(coins).toEqual([
      {
        id: testCoinIds[1],
        title: "Coin2",
        salary: 200,
        equity: "0.2",
        companyHandle: "c1",
        companyName: "C1",
      },
    ]);
  });

  test("works: by name", async function () {
    let coins = await Coin.findAll({ title: "ob1" });
    expect(coins).toEqual([
      {
        id: testCoinIds[0],
        title: "Coin1",
        salary: 100,
        equity: "0.1",
        companyHandle: "c1",
        companyName: "C1",
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
      title: "Coin1",
      salary: 100,
      equity: "0.1",
      company: {
        handle: "c1",
        name: "C1",
        description: "Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img",
      },
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

/************************************** update */

describe("update", function () {
  let updateData = {
    title: "New",
    salary: 500,
    equity: "0.5",
  };
  test("works", async function () {
    let coin = await Coin.update(testCoinIds[0], updateData);
    expect(coin).toEqual({
      id: testCoinIds[0],
      companyHandle: "c1",
      ...updateData,
    });
  });

  test("not found if no such coin", async function () {
    try {
      await Coin.update(0, {
        title: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Coin.update(testCoinIds[0], {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Coin.remove(testCoinIds[0]);
    const res = await db.query(
        "SELECT id FROM coins WHERE id=$1", [testCoinIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such coin", async function () {
    try {
      await Coin.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
