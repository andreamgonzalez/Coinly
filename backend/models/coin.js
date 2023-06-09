"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for coins. WAS JOB*/

class Coin {
 
  /** Find all coins (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minPrice
   * - symbol (will find case-insensitive, partial matches)
   *
   * Returns [{ id, symbol, price }, ...]
   * */

  static async findAll({ minPrice, symbol } = {}) {
    let query = `SELECT c.id,
                        c.symbol,
                        c.price
                 FROM coins c`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (minPrice !== undefined) {
      queryValues.push(minPrice);
      whereExpressions.push(`price >= ${queryValues.length}`);
    }

    if (symbol !== undefined) {
      queryValues.push(`%${symbol}%`);
      whereExpressions.push(`symbol ILIKE ${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY symbol";
    const coinsRes = await db.query(query, queryValues);
    return coinsRes.rows;
  }

  /** Given a coin id, return data about coin.
   *
   * Returns { id, symbol, price }
   *   where coin is { id, symbol, price }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const coinResp = await db.query(
          `SELECT id,
                  symbol,
                  price
           FROM coins
           WHERE id = $1`, [id]);

    const coin = coinResp.rows[0];
 
    if (!coin) throw new NotFoundError(`No coin: ${id}`);

    return coin;
  }

}

module.exports = Coin;
