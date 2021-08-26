import Sequelize from 'sequelize';
import randomNumGenerator from '../utils/randomNumGenerator.mjs';

const op = Sequelize.Op;

export default function initOrdersController(db) {
  const index = async (request, response) => {
    try {
      const orders = await db.Order.findAll();
      response.send({ orders });
    } catch (error) {
      console.log(error);
    }
  };

  const findUserOrders = async (request, response) => {
    const { id } = request.params;

    try {
      // get all of user's order from order table
      const userOrders = await db.Order.findAll({
        where: {
          userId: id,
          orderStatus: {
            [op.not]: 'complete',
          },
        },
        raw: true,
      });

      // get item orders
      const itemsPerOrderArray = [];
      await Promise.all(
        userOrders.map((order) => {
          const itemsPerOrder = db.OrderItem.findAll({
            where: {
              orderId: order.id,
            },
            raw: true,
          });
          itemsPerOrderArray.push(itemsPerOrder);
        }),
      );

      const listOfItemsPerOrder = await Promise.all(itemsPerOrderArray).then((result) => result);

      // massage data
      const dataToSendBack = [];
      for (let i = 0; i < userOrders.length; i += 1) {
        const dataObj = {
          orderTableData: userOrders[i],
          orderItemsTableData: listOfItemsPerOrder[i],
        };
        dataToSendBack.push(dataObj);
      }
      // send back
      response.send(dataToSendBack);
    } catch (error) {
      console.log('ERROR IN findUserOrders', error);
    }
  };

  const findUserOrderHistory = async (request, response) => {
    const { id } = request.params;

    try {
      // get all of user's order from order table
      const userOrders = await db.Order.findAll({
        where: {
          userId: id,
          orderStatus: 'complete',
        },
        raw: true,
      });

      // get item orders
      const itemsPerOrderArray = [];
      await Promise.all(
        userOrders.map((order) => {
          const itemsPerOrder = db.OrderItem.findAll({
            where: {
              orderId: order.id,
            },
            raw: true,
          });
          itemsPerOrderArray.push(itemsPerOrder);
        }),
      );

      const listOfItemsPerOrder = await Promise.all(itemsPerOrderArray).then((result) => result);

      // massage data
      const dataToSendBack = [];
      for (let i = 0; i < userOrders.length; i += 1) {
        const dataObj = {
          orderTableData: userOrders[i],
          orderItemsTableData: listOfItemsPerOrder[i],
        };
        dataToSendBack.push(dataObj);
      }
      // send back
      response.send(dataToSendBack);
    } catch (error) {
      console.log('ERROR IN findUserOrders', error);
    }
  };

  const create = async (request, response) => {
    // information that comes in the request is an object with 2 keys
    // 1. orderTableData
    // 2. orderItemsTableData

    const { orderTableData: mainOrder, orderItemsTableData: allDrinkOrders } = request.body;

    // destructure info needed to create order
    const {
      userId, storeId, pickUpTime, orderStatus, totalAmount,
    } = mainOrder;

    try {
      // Create an order
      const newOrderInOrdersTable = await db.Order.create({
        userId,
        storeId,
        pickUpTime,
        orderStatus,
        totalAmount,
        receiptNum: randomNumGenerator(),
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
    findUserOrders,
    findUserOrderHistory,
  };
}
