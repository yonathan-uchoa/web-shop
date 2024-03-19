# Web-shop

![GitHub repo size](https://img.shields.io/github/repo-size/yonathan-uchoa/web-shop?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/yonathan-uchoa/web-shop?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/yonathan-uchoa/web-shop?style=for-the-badge)

![project /home](https://github.com/yonathan-uchoa/web-shop/assets/44504264/447dd5f3-4d35-4cd6-9003-83307842c87f)

> A web-shop, a simple program who put items to a cart and create a order.

### About the project

This project its a simple example to use CRUD, Validations, Testing and JSdocs.

It's not interest of the project to show a amazing technics in Js or Mongoose, the true objective is to create a basic but **robust** project with a good **test coverage**, easy maintenance, good practices with validation and documentation with **jsdocs**.

<details>
<summary>Here you can see my Actual Coverage</summary>

![actual coverage statistics](https://github.com/yonathan-uchoa/web-shop/assets/44504264/4450943f-1e49-473c-9645-87f97426c1a2)

</details>

## 🔧 Technologies

- mongoose - MongoDB
- mongodb-memory-server
- swagger-jsdocs
- yup - validation
- jest | supertest - for testing


## 🚀 Installing

Just run:

```
npm i
```

## ☕ Runs

For run the project in mongodb-memory:

```
npm run dev
```

For run the tests:

```
npm run test
```

If you want to create a local database, you must use the .env.test as a example to set the uri, port and the **NODE_ENV** must be set as **PRODUCTION**, after that you run the command:

```
npm run start
```

