import express from "express";
import Order from "../model/order.js";
import Counter from "../model/counter.js";
import OrderService from "../service/order-service.js";

const router = express.Router();

/** Cart definition
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        cart:
 *          $ref: '#/components/schemas/Cart'
 *        payment:
 *          type: string
 *    Order-response:
 *      type: object
 *      properties:
 *        cart:
 *          $ref: '#/components/schemas/Cart'
 *        payment:
 *          type: string
 *        total:
 *          type: string
 *
 */

/**
 * @swagger
 * /order:
 *  get:
 *    description: Return all sale orders.
 *    tags: [Order]
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
 *                  example: success!
 *                data:
 *                  $ref: '#/components/schemas/Order-response'
 *
 */
router.get("/", (req, res) => {
  Order.find({}, { _id: 0 }).then((data) => {
    res.status(200).send({ message: "success!", data: data });
  });
});

/**
 * @swagger
 * /order:
 *  post:
 *    summary: Post a new sale order.
 *    tags: [Order]
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              payment:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: new order has been saved successfully!
 *                data:
 *                  $ref: '#/components/schemas/Order-response'
 */
router.post("/", async (req, res) => {
  const { payment } = req.body;

  OrderService.generateOrder(payment)
    .then((data) => {
      res.status(200).send({
        message: "new order has been saved successfully!",
        data: data,
      });
    })
    .catch((err) => res.status(err.status).send({ message: err.message }));
});

export default router;
