"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testCoinIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /coins */

describe("GET /coins", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/coins");
    expect(resp.body).toEqual({
      coins:
          [
            {
              symbol: "c1",
              price: "C1"
            },
            {
              symbol: "c2",
              price: "C2",
            },
            {
              symbol: "c3",
              price: "C3"
            },
          ],
    });
  });

  test("works: filtering", async function () {
    const resp = await request(app)
        .get("/coins")
        .query({ minEmployees: 3 });
    expect(resp.body).toEqual({
      coins: [
        {
          symbol: "cryptonite",
          price: 3000,
        },
      ],
    });
  });

  test("works: filtering on all filters", async function () {
    const resp = await request(app)
        .get("/coins")
        .query({ minEmployees: 2, maxEmployees: 3, name: "3" });
    expect(resp.body).toEqual({
      coins: [
        {
          symbol: "cryptonite",
          price: 3000,
        },
      ],
    });
  });

  test("bad request if invalid filter key", async function () {
    const resp = await request(app)
        .get("/coins")
        .query({ minEmployees: 2, nope: "nope" });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /coins/:symbol */

describe("GET /coins/:symbol", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/coins/c1`);
    expect(resp.body).toEqual({
      coin: {
        symbol: "c1",
        price: 100
      },
    });
  });

  test("works for anon: coin w/o coins", async function () {
    const resp = await request(app).get(`/coins/c2`);
    expect(resp.body).toEqual({
      coin: {
        symbol: "c2",
        price: 200
      },
    });
  });

  test("not found for no such coin", async function () {
    const resp = await request(app).get(`/coins/nope`);
    expect(resp.statusCode).toEqual(404);
  });
});
