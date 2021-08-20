import { resolve } from 'path';
import db from './models/index.mjs';

import initItemsController from './controllers/items.mjs';
import initOrdersController from './controllers/orders.mjs';

export default function routes(app) {
  const ItemsController = initItemsController(db);
  const OrdersController = initOrdersController(db);

  app.post('/orders', OrdersController.create);
  app.get('/orders', OrdersController.index);

  // get all menu items
  app.get('/api/items', ItemsController.index);
  // get menu item by id
  app.get('/api/item/:id', ItemsController.find);

  // get item image by id
  app.get('/api/items/image/:id', (request, response) => {
    const { id } = request.params;
    response.sendFile(resolve('public', `products/${id}.jpg`));
  });

  app.get('/', (request, response) => {
    response.send('Rocket Tea API');
  });
}
