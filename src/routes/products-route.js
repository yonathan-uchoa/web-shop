import express from "express";
import Product from "../model/product.js";
import { ProductService } from "../service/product-service.js";
import CartService from "../service/cart-service.js";

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
 *        description:
 *          type: string
 *        quantity:
 *          type: integer
 *        price:
 *          type: number
 *        image:
 *          type: string
 *        rating:
 *          type: object
 *          properties:
 *            rate:
 *              type: number
 *            count:
 *              type: number
 *    Product-post:
 *      type: object
 *      required:
 *        - price
 *        - category
 *        - title
 *      properties:
 *        category:
 *          type: string
 *        title:
 *          type: string
 *        price:
 *          type: number
 *        image:
 *          type: string
 *        description:
 *          type: string
 *        rating:
 *          type: object
 *          properties:
 *            rate:
 *              type: number
 *            count:
 *              type: number
 *    Product-patch:
 *      type: object
 *      properties:
 *        category:
 *          type: string
 *        title:
 *          type: string
 *        price:
 *          type: number
 *        image:
 *          type: string
 *        description:
 *          type: string
 *        rating:
 *          type: object
 *          properties:
 *            rate:
 *              type: number
 *            count:
 *              type: number
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
 * /products/{idProduct}:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: idProduct
 *        type: integer
 *        description: number of products in one response
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.get("/:idProduct", (req, res) => {
  const { idProduct } = req.params;
  Product.findOne({ id: idProduct }, "-_id -__v")
    .lean()
    .then((data) =>
      data
        ? res.status(200).send(data)
        : res
            .status(404)
            .send({ message: `product id: ${idProduct}, not found!` })
    );
});

/**
 * @swagger
 * /products/{idProduct}:
 *  patch:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: idProduct
 *        type: integer
 *        description: number of products in one response
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product-post'
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.patch("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const patchProduct = req.body;
  try {
    const _product = await ProductService.update(idProduct, patchProduct);
    await CartService.cascadeUpdateProduct(_product);
    return res.status(200).send(_product);
  } catch (err) {
    return res
      .status(err.status)
      .send({ message: err.message, data: err.data });
  }
});

/**
 * @swagger
 * /products:
 *  post:
 *    description: Return all sale orders.
 *    tags: [Products]
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product-post'
 *
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 */
router.post("/", (req, res) => {
  const product = req.body;
  ProductService.save(product)
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res.status(err.status).send({ message: err.message, data: err.data })
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
  ProductService.findProduct(limit, sort, title, "jewelery").then((data) =>
    res.status(200).send(data)
  );
});

/**
 * @swagger
 * /products/category/men%27s clothing:
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
router.get("/category/men%27s%20clothing", (req, res) => {
  const { title, limit, sort } = req.query;
  ProductService.findProduct(limit, sort, title, "men's clothing").then(
    (data) => res.status(200).send(data)
  );
});

/**
 * @swagger
 * /products/category/women%27s clothing:
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
router.get("/category/women%27s%20clothing", (req, res) => {
  const { title, limit, sort } = req.query;
  ProductService.findProduct(limit, sort, title, "women's clothing").then(
    (data) => res.status(200).send(data)
  );
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
  ProductService.findProduct(limit, sort, title, "electronics").then((data) =>
    res.status(200).send(data)
  );
});

export default router;
