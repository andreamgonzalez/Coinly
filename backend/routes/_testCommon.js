"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Coin = require("../models/coin");
const { createToken } = require("../helpers/tokens");

const testCoinIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");

  await Coin.create(
      {
        symbol: "c1",
        price: 100
      });
  await Coin.create(
      {
        symbol: "c2",
        price: 200
      });
  await Coin.create(
      {
        symbol: "c3",
        price: 300
      });

  testCoinIds[0] = (await Coin.create(
      { symbol: "c4", price: 400 })).id;
  testCoinIds[1] = (await Coin.create(
      { symbol: "c5", price: 500 })).id;
  testCoinIds[2] = (await Coin.create(
      { symbol: "c6", price: 600 })).id;

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  await User.favoritesCoin("u1", testCoinIds[0]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testCoinIds,
  u1Token,
  u2Token,
  adminToken,
};
