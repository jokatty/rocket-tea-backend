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

    // console.log('MAIN ORDER');
    // console.log(mainOrder);
    // console.log('ALL DRINKS');
    // console.log(allDrinkOrders);

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
