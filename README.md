# Rocket Tea Backend

## DB Setup 🤖

**If you have not created the DB on your local**
Step 1: Change username in config/config.js
Step 2: Create DB
`npx sequelize db:create`

**If DB is already created on local**

Setup DB:
`npm run setup`

Reset DB:
`npm run reset`

## Start Server 🤖

Start Server:
`npm run watch`

## Routes 🔗

**Get all items in menu**
`/api/items`

**Get item in menu by id**
`/api/item/:id`

**Get item image by imageid**
\*Image id is from 001 to 011
`/api/items/image/:id`

**Get user's on-going orders by userid**
`/api/orders/:userid`

**Get user's completed orders by userid**
`/api/orderhistory/:userid`

**Post new order / confirm order**
`/api/neworder`

```
// data that is sent is an object with 2 keys
// 1. orderTableData
// 2. orderItemsTableData

const exampleDataSent = {

  orderTableData: {
    userId: 1,
    storeId: 1,
    pickUpTime: 'test',
    orderStatus: 'sent',
    totalAmount: 13
  },
​
  orderItemsTableData: [
    {
      itemId: 1,
      sizeChoice: 'regular',
      tempChoice: 'hot',
      quantity: 2,
      itemTotal: 8
    },
    {
      itemId: 2,
      sizeChoice: 'large',
      tempChoice: 'cold',
      quantity: 1,
      itemTotal: 5
    },
  ],
};

```
