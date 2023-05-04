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

/************************************** POST /coins */

describe("POST /coins", function () {
  const newCoin = {
    symbol: "cryptonite",
    price: 3000,
  };

  test("ok for admin", async function () {
    const resp = await request(app)
        .post("/coins")
        .send(newCoin)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      coin: newCoin,
    });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
        .post("/coins")
        .send(newCoin)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/coins")
        .send({
          handle: "new",
          numEmployees: 10,
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/coins")
        .send({
          ...newCoin,
          logoUrl: "not-a-url",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

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

/************************************** GET /coins/:handle */

describe("GET /coins/:handle", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/coins/c1`);
    expect(resp.body).toEqual({
      coin: {
        handle: "c1",
        name: "C1",
        description: "Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img",
        coins: [
          { id: testCoinIds[0], title: "J1", equity: "0.1", salary: 1 },
          { id: testCoinIds[1], title: "J2", equity: "0.2", salary: 2 },
          { id: testCoinIds[2], title: "J3", equity: null, salary: 3 },
        ],
      },
    });
  });

  test("works for anon: coin w/o coins", async function () {
    const resp = await request(app).get(`/coins/c2`);
    expect(resp.body).toEqual({
      coin: {
        handle: "c2",
        name: "C2",
        description: "Desc2",
        numEmployees: 2,
        logoUrl: "http://c2.img",
        coins: [],
      },
    });
  });

  test("not found for no such coin", async function () {
    const resp = await request(app).get(`/coins/nope`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /coins/:handle */

describe("PATCH /coins/:handle", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .patch(`/coins/c1`)
        .send({
          name: "C1-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      coin: {
        handle: "c1",
        name: "C1-new",
        description: "Desc1",
        numEmployees: 1,
        logoUrl: "http://c1.img",
      },
    });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
        .patch(`/coins/c1`)
        .send({
          name: "C1-new",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/coins/c1`)
        .send({
          name: "C1-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such coin", async function () {
    const resp = await request(app)
        .patch(`/coins/nope`)
        .send({
          name: "new nope",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on handle change attempt", async function () {
    const resp = await request(app)
        .patch(`/coins/c1`)
        .send({
          handle: "c1-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
        .patch(`/coins/c1`)
        .send({
          logoUrl: "not-a-url",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /coins/:handle */

describe("DELETE /coins/:handle", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/coins/c1`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: "c1" });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
        .delete(`/coins/c1`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/coins/c1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such coin", async function () {
    const resp = await request(app)
        .delete(`/coins/nope`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
