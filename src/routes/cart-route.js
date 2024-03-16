import express from "express";
import Cart from "../model/cart.js";
import CartService from "../service/cart-service.js";

const router = express.Router();

/** Cart definition
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        products:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /cart:
 *  get:
 *    description: Return current cart with products.
 *    tags: [Cart]
 *    responses:
 *      200:
 *        description: success!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                data:
 *                  $ref: '#/components/schemas/Cart'
 */
router.get("/", (req, res) => {
  Cart.findOne({ id: "mycart" }, "-_id -__v").then((data) => {
    if (data) {
      res.status(200).send({ message: "success!", data: data });
    } else {
      Cart.new().then((data) => {
        res.status(200).send({ message: "success!", data: data });
      });
    }
  });
});

/**
 * @swagger
 * /cart:
 *  post:
 *    summary: Insert new products to a cart.
 *    tags: [Cart]
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *    responses:
 *      200:
 *        description: cart has been updated!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: cart has been updated successfully!
 *                data:
 *                  type: object
 */
router.post("/", async (req, res) => {
  const { products } = req.body;
  Cart.updateCart(products).then((data) =>
    res.status(200).send({
      message: "cart item has been added!",
      data: data,
    })
  );
});

/**
 * @swagger
 * /cart:
 *  put:
 *    summary: Insert new products to a cart.
 *    tags: [Cart]
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              products:
 *                $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: cart has been updated!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: cart has been updated successfully!
 *                data:
 *                  type: object
 */
router.put("/", async (req, res) => {
  const { products } = req.body;
  Cart.updateCart(products).then((data) =>
    res.status(200).send({
      message: "cart item has been added!",
      data: data,
    })
  );
});

/**
 * @swagger
 * /cart/{productId}:
 *  patch:
 *    summary: Insert new products to a cart.
 *    tags: [Cart]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productId
 *        type: integer
 *        required: true
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              quantity:
 *                type: integer
 *    responses:
 *      200:
 *        description: cart has been updated!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: cart has been updated successfully!
 *                data:
 *                  type: object
 */
router.patch("/:productId", async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;
  if (quantity < 1) {
    return null;
  }
  Cart.updateProduct(productId, quantity).then((data) => {
    res
      .status(200)
      .send({ message: "cart item has been updated!", data: data });
  });
});

/**
 * @swagger
 * /cart/{productId}:
 *  delete:
 *    summary: Insert new products to a cart.
 *    tags: [Cart]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: integer
 *          required: true
 *    responses:
 *      200:
 *        description: cart has been updated!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: cart has been updated successfully!
 *                data:
 *                  type: object
 */
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  CartService.deleteProduct(productId).then((data) => {
    res
      .status(200)
      .send({ message: "cart item has been updated!", data: data });
  });
});

export default router;
