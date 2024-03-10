export const GET = {
  message: "success!",
  data: {
    id: "mycart",
    products: [],
  },
};

export const POST = {
  success: {
    message: "cart has been updated successfully!",
    data: {
      id: "mycart",
      products: [
        {
          id: 1234,
          price: 300,
          category: "TEST",
          title: "some product",
          quantity: 2,
        },
      ],
    },
  },
  products: [
    {
      id: 1234,
      price: 300,
      category: "TEST",
      title: "some product",
      quantity: 2,
    },
  ],
};
