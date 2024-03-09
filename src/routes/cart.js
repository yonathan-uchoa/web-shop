import express from "express";
import Cart from "../model/cart.js";

const router = express.Router();

/** Cart definition
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      properties:
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
 *                  type: object
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
      message: "cart has been updated successfully!",
      data: data,
    })
  );
});

export default router;
