import Product from "../model/product.js";

export class ProductService {
  static async findProduct(
    limit = null,
    sort = "asc",
    title = "",
    attributeValue = null,
    attributeName = null
  ) {
    return Product.findByFilter(
      limit,
      sort,
      title,
      attributeValue,
      attributeName
    );
  }

  static async findCategories() {
    return Product.findCategories();
  }
}
