export const GET = {
  message: "success!",
  data: {
    id: "mycart",
    products: [],
  },
};
const defaultPost = {
  idProduct: 0,
  quantity: 5,
};

export const mockPut = {
  idProduct: {
    null: {
      body: { ...defaultPost, idProduct: null },
      response: {
        message: "id is a required field",
        data: ["id is a required field"],
      },
    },
    negative: {
      body: { ...defaultPost, idProduct: -1 },
      response: {
        message: "id must be greater than or equal to 0",
        data: ["id must be greater than or equal to 0"],
      },
    },
    notFound: {
      body: { ...defaultPost, idProduct: 999 },
      response: {
        message: "product id: 999 not found!",
        data: {},
      },
    },
  },
  quantity: {
    null: {
      body: { ...defaultPost, quantity: null },
      response: {
        message: "quantity is a required field",
        data: ["quantity is a required field"],
      },
    },
    less1: {
      body: { ...defaultPost, quantity: -1 },
      response: {
        message: "min quantity is 1",
        data: ["min quantity is 1"],
      },
    },
    more9: {
      body: { ...defaultPost, quantity: 999 },
      response: {
        message: "max quantity is 9",
        data: ["max quantity is 9"],
      },
    },
    float: {
      body: { ...defaultPost, quantity: 2.55 },
      response: {
        message: "quantity must be an integer",
        data: ["quantity must be an integer"],
      },
    },
  },
  success: {
    body: { quantity: 5, idProduct: 0 },
    response: {
      message: "cart item has been added!",
      data: {
        id: "mycart",
        products: [
          {
            rating: {
              rate: 3.9,
              count: 120,
            },
            id: 0,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description:
              "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            quantity: 5,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          },
        ],
      },
    },
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
