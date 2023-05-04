"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
// const Company = require("../models/company");
const Coin = require("../models/coin");
const coinSearchSchema = require("../schemas/coinSearch.json");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, companyNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { coins: [ { symbol, price }, ...] }
 *
 * Can filter on provided search filters:
 * - minPrice
 * - maxPrice
 * - symbolLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as ints
  if (q.minPrice !== undefined) q.minPrice = +q.minPrice;
  if (q.maxPrice !== undefined) q.maxPrice = +q.maxPrice;

  try {
    const validator = jsonschema.validate(q, coinSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const coins = await Coin.findAll(q);
    return res.json({ coins });
  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  { coin }
 *
 *  Coin is { id, symbol, price }
 *
 * Authorization required: none
 */

router.get("/:symbol", async function (req, res, next) {
  try {
    const coin = await Coin.get(req.params.symbol);
    return res.json({ coin });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
