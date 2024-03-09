export const GET = {
  empty: {
    message: "success!",
    data: {
      id: "mycart",
      products: [],
    },
  },
  full: {
    message: "success!",
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
};
export const POST = {
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
};
