import Sequelize from 'sequelize';

const op = Sequelize.Op;

export default function initStoresController(db) {
  const index = async (request, response) => {
    try {
      const stores = await db.Store.findAll();
      response.send({ stores });
    } catch (error) {
      console.log(error);
    }
  };

  const storeLogin = async (request, response) => {
    const { login, password } = request.body;
    try {
      const store = await db.Store.findAll({
        where: {
          login,
          password,
        },
        raw: true,
      });
      // massage data to send back
      const dataToSendBack = {
        id: store[0].id,
        storeName: store[0].storeName,
      };
      response.send(dataToSendBack);
    } catch (error) {
      response.send(false);
      console.log(error);
    }
  };

  const getOrders = async (request, response) => {
    const { id } = request.params;
    try {
      // get all of store's order from order table
      const storeOrders = await db.Order.findAll({
        where: {
          storeId: id,
          orderStatus: {
            [op.not]: 'complete',
          },
        },
        raw: true,
      });

      // get item orders
      const itemsPerOrderArray = [];
      await Promise.all(
        storeOrders.map((order) => {
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
      for (let i = 0; i < storeOrders.length; i += 1) {
        const dataObj = {
          orderTableData: storeOrders[i],
          orderItemsTableData: listOfItemsPerOrder[i],
        };
        dataToSendBack.push(dataObj);
      }
      // send back
      response.send(dataToSendBack);
    } catch (error) {
      console.log('ERROR IN getOrders', error);
    }
  };

  const acceptOrder = async (request, response) => {
    const { id: orderId } = request.params;
    try {
      const updatedOrder = await db.Order.update({
        orderStatus: 'accepted',
      },
      {
        where: {
          id: orderId,
        },
        returning: true,
        raw: true,
      });

      // send back
      response.send(updatedOrder);
    } catch (error) {
      console.log('ERROR IN acceptOrder', error);
    }
  };

  const completeOrder = async (request, response) => {
    const { id: orderId } = request.params;
    try {
      const updatedOrder = await db.Order.update({
        orderStatus: 'complete',
      },
      {
        where: {
          id: orderId,
        },
        returning: true,
        raw: true,
      });

      // send back
      response.send(updatedOrder);
    } catch (error) {
      console.log('ERROR IN completeOrder', error);
    }
  };

  return {
    index,
    storeLogin,
    getOrders,
    acceptOrder,
    completeOrder,
  };
}
