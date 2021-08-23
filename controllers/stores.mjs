export default function initOrdersController(db) {
  const index = async (request, response) => {
    try {
      const stores = await db.Store.findAll();
      response.send({ stores });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
  };
}
