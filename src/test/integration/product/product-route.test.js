import request from "supertest";
import app from "../../../../index.js";

import { dbDisconnect } from "../../../database/memory-database.js";
import { mockProducts as mockDatabase } from "../data/database-mock.js";
import {
  mockElectronics,
  mockJewelery,
  mockMenClothing,
  mockPost,
  mockProducts,
  mockWomenClothing,
} from "./mock.js";

beforeEach(async () => {
  await app.closeServer();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Products route test", () => {
  describe("/product", () => {
    describe("GET", () => {
      it("SUCCESS - should return all products", async () => {
        const { body: response } = await request(app)
          .get("/products")
          .expect(200);
        expect(response).toStrictEqual(mockDatabase);
      });
    });
    describe("POST", () => {
      it("ERROR 400 - price 0, negative or null", async () => {
        let response = null;

        response = await request(app)
          .post("/products")
          .send(mockPost.price.null.body)
          .expect(400);
        expect(response.body).toStrictEqual(mockPost.price.null.response);

        response = await request(app)
          .post("/products")
          .send(mockPost.price.zero.body)
          .expect(400);
        expect(response.body).toStrictEqual(mockPost.price.zero.response);

        response = await request(app)
          .post("/products")
          .send(mockPost.price.negative.body)
          .expect(400);
        expect(response.body).toStrictEqual(mockPost.price.negative.response);
      });
      it("ERROR 400 - title greater than 255 or null", async () => {
        let response = null;

        response = await request(app)
          .post("/products")
          .send(mockPost.title.null.body)
          .expect(400);
        expect(response.body).toStrictEqual(mockPost.title.null.response);

        response = await request(app)
          .post("/products")
          .send(mockPost.title.moreThan255.body)
          .expect(400);
        expect(response.body).toStrictEqual(
          mockPost.title.moreThan255.response
        );
      });
      it("ERROR 400 - category greater than 100 or null", async () => {
        let response = null;

        response = await request(app)
          .post("/products")
          .send(mockPost.category.null.body)
          .expect(400);
        expect(response.body).toStrictEqual(mockPost.category.null.response);

        response = await request(app)
          .post("/products")
          .send(mockPost.category.moreThan100.body)
          .expect(400);
        expect(response.body).toStrictEqual(
          mockPost.category.moreThan100.response
        );
      });
    });
    describe("/product/categories", () => {});
    describe("/product/category/*", () => {
      it("SUCCESS - Should return data without filters - no query params", async () => {
        let response = null;

        response = await request(app)
          .get("/products/category/women%27s%20clothing")
          .expect(200);
        expect(response.body).toStrictEqual(mockWomenClothing);

        response = await request(app)
          .get("/products/category/men%27s%20clothing")
          .expect(200);
        expect(response.body).toStrictEqual(mockMenClothing);

        response = await request(app)
          .get("/products/category/electronics")
          .expect(200);
        expect(response.body).toStrictEqual(mockElectronics);

        response = await request(app)
          .get("/products/category/jewelery")
          .expect(200);
        expect(response.body).toStrictEqual(mockJewelery);

        response = await request(app).get("/products").expect(200);
        expect(response.body).toStrictEqual(mockProducts.allProducts);
      });
      describe("Filters with query params", () => {
        it("SUCCESS - sort filter", async () => {
          const query = { sort: "desc" };

          const response = await request(app)
            .get("/products")
            .query(query)
            .expect(200);
          expect(response.body).toStrictEqual(mockProducts.sortDesc);
        });
        it("SUCCESS - limit filter", async () => {
          const query = { limit: 5 };

          const response = await request(app)
            .get("/products")
            .query(query)
            .expect(200);
          expect(response.body).toStrictEqual(mockProducts.limit5);
        });
        it("SUCCESS - title filter - uppercase and lowercase & same word", async () => {
          const query = { title: "s" };

          let response = await request(app)
            .get("/products")
            .query(query)
            .expect(200);
          expect(response.body).toStrictEqual(mockProducts.titleS);

          query.title = "S";
          response = await request(app)
            .get("/products")
            .query(query)
            .expect(200);
          expect(response.body).toStrictEqual(mockProducts.titleS);
        });
        it("SUCCESS - all filter at same time", async () => {
          const query = { sort: "desc", limit: 2, title: "s" };

          const response = await request(app)
            .get("/products")
            .query(query)
            .expect(200);
          expect(response.body).toStrictEqual(
            mockProducts.sortDescLimit2TitleS
          );
        });
      });
    });
  });
});
