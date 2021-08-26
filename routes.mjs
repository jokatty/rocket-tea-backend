import { resolve } from 'path';
import db from './models/index.mjs';

import initItemsController from './controllers/items.mjs';
import initOrdersController from './controllers/orders.mjs';
import initStoresController from './controllers/stores.mjs';

export default function routes(app) {
  const ItemsController = initItemsController(db);
  const OrdersController = initOrdersController(db);
  const StoresController = initStoresController(db);

  // --------- MENU ITEMS

  // get all menu items
  app.get('/api/stores', StoresController.index);
  // get all menu items
  app.get('/api/items', ItemsController.index);
  // get menu item by id
  app.get('/api/item/:id', ItemsController.find);
  // get item image by id
  app.get('/api/items/image/:id', (request, response) => {
    const { id } = request.params;
    response.sendFile(resolve('public', `products/${id}.jpg`));
  });

  // --------- USER ORDERS
  // get on-going orders by userid
  app.get('/api/orders/:id', OrdersController.findUserOrders);
  // get order history by userid
  app.get('/api/orderhistory/:id', OrdersController.findUserOrderHistory);
  // place an order
  app.post('/api/neworder', OrdersController.create);
  // app.get('/orders', OrdersController.index);

  // --------- STORE
  // login
  app.post('/api/store/login', StoresController.storeLogin);

  // get incoming orders
  app.get('/api/store/incomingorders/:id', StoresController.getIncomingOrders);
  // get accepted orders
  app.get('/api/store/acceptedorders/:id', StoresController.getAcceptedOrders);

  // accept order
  app.put('/api/store/acceptorder/:id', StoresController.acceptOrder);
  // complete order
  app.put('/api/store/completeorder/:id', StoresController.completeOrder);

  // --------- MISC
  app.get('/', (request, response) => {
    response.send('Rocket Tea API');
  });
}
