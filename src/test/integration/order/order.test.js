import request from "supertest";
import app from "../../../..";

import { dbDisconnect } from "../../../database/memory-database.js";
import Cart from "../../../model/cart.js";

import { CARTFULL, CARTEMPTY, GET, POST } from "./mock.js";

afterAll(async () => {
  await dbDisconnect();
  await app.closeServer();
});

beforeEach(async () => {
  await Cart.findOneAndDelete({ id: "mycart" });
});

describe("ROUTE - /order/*", () => {
  describe("/order", () => {
    describe("GET", () => {
      it("should return all orders", async () => {});
    });
    describe("POST", () => {
      it("should create and return a new order sale", async () => {});

      it("should return a error, cart.products empty", async () => {
        await Cart.new();

        const response = await request(app).post("/order").expect(400);
      });

      it("should return a error, cart null", async () => {
        const response = await request(app).post("/order").expect(400);
      });
    });
  });
  describe("/order", () => {});
});
