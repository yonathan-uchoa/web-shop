import request from "supertest";
import app from "../../../../index.js";
import { GET, POST } from "./mock.js";
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
  describe("GET /cart", () => {
    it("should create and return a empty cart", async () => {
      Cart.findOne({ id: "mycart" }).then((data) => expect(data).toBeNull());

      const response = await request(app).get("/cart").expect(200);
      expect(response.body).toMatchObject(GET);
    });
  });

  describe("POST /cart", () => {
    it("should return a cart with products", async () => {
      const response = await request(app)
        .post("/cart")
        .send({ products: POST.products })
        .expect(200);

      expect(response.body).toMatchObject(POST.success);
    });
  });
});
