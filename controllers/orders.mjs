export default function initOrdersController(db) {
  const index = async (request, response) => {
    try {
      const orders = await db.Order.findAll();
      response.send({ orders });
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (request, response) => {
    // information that comes in the request is an object with 2 keys
    // 1. orderTableData
    // 2. orderItemsTableData

    const { orderTableData: mainOrder, orderItemsTableData: allDrinkOrders } = request.body;

    // Test data
    const TEST_CASE = false;
    if (TEST_CASE) {
      mainOrder = {
        userId: 1,
        storeId: 1,
        pickUpTime: 'test',
        isComplete: false,
      };

      allDrinkOrders = [
        {
          itemId: 4,
          sizeChoice: 'regular',
          tempChoice: 'hot',
          quantity: 2,
        },
        {
          itemId: 5,
          sizeChoice: 'large',
          tempChoice: 'cold',
          quantity: 1,
        },
      ];
    }

    // destructure info needed to create order
    const { userId, storeId, pickUpTime } = mainOrder;

    try {
      // Create an order
      const newOrderInOrdersTable = await db.Order.create({
        userId,
        storeId,
        pickUpTime,
        isComplete: false,
      },
      { returning: true });

      console.log('NEW ROW IN ORDERS TABLE ================>');
      console.log(newOrderInOrdersTable);

      const handeleAllDrinkOrders = await Promise.all(
        allDrinkOrders.map((drink) => db.OrderItem.create(drink), { returning: true }),
      );

      const newOrdersInOrderItemsTable = await newOrderInOrdersTable
        .addOrder_items(handeleAllDrinkOrders, { returning: true });

      // Older code here that creates an order
      // insert orderId into allDrinkOrders
      // for (let i = 0; i < allDrinkOrders.length; i += 1) {
      //   allDrinkOrders[i].orderId = newOrderInOrdersTable.id;
      // }

      // const newOrdersInOrderItemsTable = await db
      //  .OrderItem.bulkCreate(allDrinkOrders, { returning: true });

      console.log('NEW ROW IN ORDER_ITEMS TABLE ================>');
      console.log(newOrdersInOrderItemsTable);

      // send back order id data
      response.send(newOrderInOrdersTable);
      console.log('close connection');
    }
    catch (error) {
      console.log('ERROR ==================== !');
      console.log(error);
      response.end();
    }
  };

  return {
    create,
    index,
  };
}
