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
