import express from "express";
import Product from "../model/product.js";
import { ProductService } from "../service/product-service.js";
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
 *        - image
 *      properties:
 *        id:
 *          type: integer
 *        category:
 *          type: string
 *        title:
 *          type: string
 *        quantity:
 *          type: integer
 *        price:
 *          type: number
 *        image:
 *          type: string
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
 *      - in: query
 *        name: title
 *        type: string
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
  const { title, limit, sort } = req.query;
  ProductService.findProduct(limit, sort, title).then((data) =>
    res.status(200).send(data)
  );
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
  ProductService.findCategories().then((data) => {
    res.status(200).send(data);
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
 *      - in: query
 *        name: title
 *        type: string
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
  const { title, limit, sort } = req.query;
  ProductService.findProduct(limit, sort, title, "category", "jewelery").then(
    (data) => res.status(200).send(data)
  );
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
 *      - in: query
 *        name: title
 *        type: string
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
  const { title, limit, sort } = req.query;
  ProductService.findProduct(
    limit,
    sort,
    title,
    "category",
    "men's clothing"
  ).then((data) => res.status(200).send(data));
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
 *      - in: query
 *        name: title
 *        type: string
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
  const { title, limit, sort } = req.query;
  ProductService.findProduct(
    limit,
    sort,
    title,
    "category",
    "women's clothing"
  ).then((data) => res.status(200).send(data));
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
 *      - in: query
 *        name: title
 *        type: string
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
  const { title, limit, sort } = req.query;
  ProductService.findProduct(limit, sort, title, "category", "eletronics").then(
    (data) => res.status(200).send(data)
  );
});

export default router;
