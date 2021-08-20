module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('users', [
    {
      user_name: 'guest',
      email: 'guest@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
