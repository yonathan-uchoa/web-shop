import express from "express";
import Cart from "../model/cart.js";
import CartService from "../service/cart-service.js";
import { CartValidation } from "../validation/cart-validation.js";

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
  Cart.findOne({ id: "mycart" }, "-_id -__v")
    .then((data) => {
      if (data) {
        res.status(200).send({ message: "success!", data: data });
      } else {
        Cart.new().then((data) => {
          res.status(200).send({ message: "success!", data: data });
        });
      }
    })
    .catch((err) => console.log(err));
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
 *              idProduct:
 *                type: number
 *              quantity:
 *                type: number
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
  const { idProduct, quantity } = req.body;
  CartService.addProduct(idProduct, quantity)
    .then((data) =>
      res.status(200).send({
        message: "cart item has been added!",
        data: data,
      })
    )
    .catch((err) =>
      res.status(err.status).send({ message: err.message, data: err.data })
    );
});

/**
 * @swagger
 * /cart/{idProduct}:
 *  patch:
 *    summary: Insert new products to a cart.
 *    tags: [Cart]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: idProduct
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
router.patch("/:idProduct", async (req, res) => {
  const { quantity } = req.body;
  const { idProduct } = req.params;
  await CartValidation.addProduct(idProduct, quantity);
  CartService.updateProduct(idProduct, quantity)
    .then((data) =>
      res
        .status(200)
        .send({ message: "cart item has been updated!", data: data })
    )
    .catch((err) =>
      res.status(err.status).send({ message: err.message, data: err.data })
    );
});

/**
 * @swagger
 * /cart/{idProduct}:
 *  delete:
 *    summary: Insert new products to a cart.
 *    tags: [Cart]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: idProduct
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
router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  CartService.deleteProduct(idProduct)
    .then((data) => {
      res
        .status(200)
        .send({ message: "cart item has been updated!", data: data });
    })
    .catch((err) => res.status(400).send({ message: err }));
});

export default router;
