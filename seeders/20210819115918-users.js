module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('users', [
    {
      user_name: 'guest',
      email: 'guest@gmail.com',
      password: '1234',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface) => {
    console.log('settling users seed drop ================================>');
    // delete seed data
    await queryInterface.bulkDelete('users', null, {});
  },
};
