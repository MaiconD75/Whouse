<h1 align="center">Whouse</h1>
<p align="center">A responsive warehouse manager application</p>

<p align="center">
 <a href="#about">About</a> •
 <a href="#status">Status</a> •
 <a href="#entities">Entities</a> • 
 <a href="#-tools">Tools</a>
</p>

# About
<p align="left">This application can help you to manage your warehouses or stocks from your home and enterprise.</p><br/>
<p align="left">You can create a warehouse and define many different stocks with a loot of products and your amount.</p>


# Status
<h4 align="left"> 
  ⚠ Development
</h4>

# Entities
* ## Warehouses
  * id: uuid
  * name: varchar
  * description: varchar
* ## Stocks
  * id: uuid
  * warehouse_id: uuid
  * name: varchar
* ## Products
  * id: uuid
  * stock_id: uuid
  * name: varchar
  * specification: varchar
  * amount: integer
  * product_image: varchar

# 🛠 Tools

The following tools were used in the construction of the project:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgresSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
