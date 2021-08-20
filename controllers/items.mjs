export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const items = await db.Item.findAll();
      console.log(items);
      response.send({ items });
    } catch (error) {
      console.log(error);
    }
  };

  const find = async (request, response) => {
    const { id } = request.params;
    try {
      const item = await db.Item.findByPk(id);
      console.log(item);
      response.send({ item });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    find,
  };
}
