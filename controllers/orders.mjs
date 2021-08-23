export default function initOrdersController(db) {
  const index = async (request, response) => {
    try {
      const orders = await db.Order.findAll();
      response.send({ orders });
    } catch (error) {
      console.log(error);
    }
  };

  const test = async (request, response) => {
    response.send('Yupp post works');
  };

  const create = async (request, response) => {
    // information that comes in the request is an object with 2 keys
    // 1. orderTableData
    // 2. orderItemsTableData

    const exampleInfo = {
    // orderTableData
      orderTableData: {
        userId: 1,
        storeId: 2,
        pickUpTime: 'test',
        isComplete: false,
      },

      // orderItemsTableData
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

    const { orderTableData: mainOrder, orderItemsTableData: allDrinkOrders } = exampleInfo;

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

      // order.addOrderItem
      console.log('NEW ROW IN ORDERS TABLE ================>');
      console.log(newOrderInOrdersTable);

      // insert orderId into allDrinkOrders
      for (let i = 0; i < allDrinkOrders.length; i += 1) {
        allDrinkOrders[i].orderId = newOrderInOrdersTable.id;
      }

      console.log('updated drinkOrders');
      console.log(allDrinkOrders);

      const newOrdersInOrderItemsTable = await db.OrderItem.bulkCreate(allDrinkOrders, { returning: true });

      console.log('NEW ROW IN ORDER_ITEMS TABLE ================>');
      console.log(newOrdersInOrderItemsTable);

      response.end();
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
    test,
  };
}
