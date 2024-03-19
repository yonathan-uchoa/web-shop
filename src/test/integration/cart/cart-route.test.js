import request from "supertest";
import app from "../../../../index.js";
import { GET, POST, mockPut } from "./mock.js";
import { dbDisconnect } from "../../../database/memory-database.js";
import Cart from "../../../model/cart.js";

beforeEach(async () => {
  await Cart.findOneAndDelete({ id: "mycart" });
  await app.closeServer();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("ROUTE - /cart/*", () => {
  describe("/cart", () => {
    describe("GET", () => {
      it("SUCCESS - should create and return a empty cart", async () => {
        await Cart.findOne({ id: "mycart" }).then((data) =>
          expect(data).toBeNull()
        );

        const response = await request(app).get("/cart").expect(200);
        expect(response.body).toMatchObject(GET);
      });
      it("SUCCESS - should return a cart with products", async () => {
        await Cart.findOne({ id: "mycart" }).then((data) =>
          expect(data).toBeNull()
        );

        const response = await request(app).get("/cart").expect(200);
        expect(response.body).toMatchObject(GET);
      });
    });
    describe("PUT", () => {
      it("ERROR 400 - idProduct null or negative", async () => {
        let response = {};

        response = await request(app)
          .put("/cart")
          .send(mockPut.idProduct.null.body)
          .expect(400);
        expect(response.body).toMatchObject(mockPut.idProduct.null.response);

        response = await request(app)
          .put("/cart")
          .send(mockPut.idProduct.negative.body)
          .expect(400);
        expect(response.body).toMatchObject(
          mockPut.idProduct.negative.response
        );
      });
      it("ERROR 404 - idProduct not found in database", async () => {
        await Cart.findOne({ id: "mycart" }).then((data) =>
          expect(data).toBeNull()
        );

        const response = await request(app)
          .put("/cart")
          .send(mockPut.idProduct.notFound.body)
          .expect(404);
        expect(response.body).toMatchObject(
          mockPut.idProduct.notFound.response
        );
      });
      it("ERROR 400 - quantity null, < 1, > 9 or float", async () => {
        let response = {};

        response = await request(app)
          .put("/cart")
          .send(mockPut.quantity.null.body)
          .expect(400);
        expect(response.body).toMatchObject(mockPut.quantity.null.response);

        response = await request(app)
          .put("/cart")
          .send(mockPut.quantity.less1.body)
          .expect(400);
        expect(response.body).toMatchObject(mockPut.quantity.less1.response);

        response = await request(app)
          .put("/cart")
          .send(mockPut.quantity.more9.body)
          .expect(400);
        expect(response.body).toMatchObject(mockPut.quantity.more9.response);

        response = await request(app)
          .put("/cart")
          .send(mockPut.quantity.float.body)
          .expect(400);
        expect(response.body).toMatchObject(mockPut.quantity.float.response);
      });
      it("SUCCESS - should insert a product and return cart", async () => {
        const response = await request(app)
          .put("/cart")
          .send(mockPut.success.body)
          .expect(200);
        expect(response.body).toMatchObject(mockPut.success.response);
      });
    });
  });
  describe("/cart/:idProduct", () => {
    describe("PATCH", () => {});
    describe("DELETE", () => {});
  });
});
