export default function initStoresController(db) {
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
