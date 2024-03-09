import request from "supertest";
import app from "../../../..";
import { GET, POST } from "./mock.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { dbDisconnect } from "../../../database/memory-database.js";

beforeAll((done) => {
  done();
});

afterAll(async () => {
  await dbDisconnect();
});
describe("GET /cart", () => {
  it("should return a empty cart", async () => {
    const response = await request(app).get("/cart").expect(200);
    expect(response.body).toMatchObject(GET.empty);
  });

  it("should return a cart with itens", async () => {});
});
