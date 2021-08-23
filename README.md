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

**Post new order / confirm order**
`/api/neworder`

```
// data that is sent is an object with 2 keys
// 1. orderTableData
// 2. orderItemsTableData

const exampleDataSent = {

  orderTableData: {
    userId: 1,
    storeId: 2,
    pickUpTime: 'test',
    isComplete: false,
  },

  orderItemsTableData: [
    {
    itemId: 2,
    sizeChoice: 'regular',
    tempChoice: 'hot',
    quantity: 2,
    },
    {
      itemId: 4,
      sizeChoice: 'large',
      tempChoice: 'cold',
      quantity: 1,
    },
  ],
};

```
