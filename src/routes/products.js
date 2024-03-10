import express from "express";
const router = express.Router();

/** Product definition
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - id
 *        - price
 *        - category
 *        - title
 *        - quantity
 *      properties:
 *        id:
 *          type: string
 *        category:
 *          type: string
 *        title:
 *          type: string
 *        quantity:
 *          type: integer
 *        price:
 *          type: number
 */

/**
 * @swagger
 * /products:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: number of products in one response
 *      - in: query
 *        name: sort
 *        type: string
 *        description: sort desc or asc
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/", (req, res) => {
  fetch(
    `https://fakestoreapi.com/products?limit=${req.query.limit}&sort=${req.query.sort}`
  )
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    });
});

/**
 * @swagger
 * /products/categories:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/categories", (req, res) => {
  fetch(`https://fakestoreapi.com/products/categories`)
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    });
});

/**
 * @swagger
 * /products/category/jewelery:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: number of products in one response
 *      - in: query
 *        name: sort
 *        type: string
 *        description: sort desc or asc
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/category/jewelery", (req, res) => {
  fetch(
    `https://fakestoreapi.com/products/category/jewelery?limit=${req.query.limit}&sort=${req.query.sort}`
  )
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    });
});

/**
 * @swagger
 * /products/category/men's clothing:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: number of products in one response
 *      - in: query
 *        name: sort
 *        type: string
 *        description: sort desc or asc
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/category/men's%20clothing", (req, res) => {
  fetch(
    `https://fakestoreapi.com/products/category/men's%20clothing?limit=${req.query.limit}&sort=${req.query.sort}`
  )
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    });
});

/**
 * @swagger
 * /products/category/women's clothings:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: number of products in one response
 *      - in: query
 *        name: sort
 *        type: string
 *        description: sort desc or asc
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/category/women's%20clothing", (req, res) => {
  fetch(
    `https://fakestoreapi.com/products/category/women's%20clothing?limit=${req.query.limit}&sort=${req.query.sort}`
  )
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    });
});

/**
 * @swagger
 * /products/category/electronics:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: number of products in one response
 *      - in: query
 *        name: sort
 *        type: string
 *        description: sort desc or asc
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/category/electronics", (req, res) => {
  fetch(
    `https://fakestoreapi.com/products/category/electronics?limit=${req.query.limit}&sort=${req.query.sort}`
  )
    .then((res) => res.json())
    .then((json) => {
      res.status(200).send(json);
    });
});

export default router;
