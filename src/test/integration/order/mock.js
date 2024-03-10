export const CARTFULL = {
  cart: {
    id: "mycart",
    products: [
      {
        id: 1,
        price: 300,
        category: "TEST",
        title: "some product",
        quantity: 2,
      },
      {
        id: 2,
        price: 200,
        category: "TEST 2",
        title: "some product",
        quantity: 5,
      },
    ],
  },
};

export const CARTEMPTY = {
  cart: {
    id: "mycart",
    products: [],
  },
};

export const POST = {
  err400: {
    message: "cart is empty!",
  },
};

export const GET = {};
