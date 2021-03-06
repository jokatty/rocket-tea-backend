module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('stores', [
    {
      login: 'CAPITALTOWER',
      password: '1234',
      store_name: 'Capital Tower',
      location: '168 Robinson Road,#01-09,Capital Tower,Singapore 068912',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'CHANGICITYPOINT',
      store_name: 'Changi City Point',
      password: '1234',
      location: '5 Changi Business Park Central 1 #B1-37,Changi City Point,Singapore 486038',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'CITYLINKMALL',
      store_name: 'Citylink Mall',
      password: '1234',
      location: '1 Raffles Link #B1-10, Citylink Mall,Singapore 039393',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'CHINASQUARE',
      store_name: 'Cross Street (China Square)',
      password: '1234',
      location: '18 Cross Street #01-K110,Cross Street Exchange,Singapore 048423',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'JURONGPOINT',
      store_name: 'Jurong Point',
      password: '1234',
      location: '1 Jurong West Central 2 #01-K3,Jurong Point,Singapore 648886',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'KATONG',
      store_name: 'Katong',
      password: '1234',
      location: '228 Tanjong Katong Road,#01-01,Singapore 437016',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'MARINABAYLINKMALL',
      store_name: 'Marina Bay Link Mall',
      password: '1234',
      location: '8A Marina Boulevard #B2-37,Marina Bay Link Mall,Singapore 018984',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'NUS',
      store_name: 'NUS',
      password: '1234',
      location: '31 Lower Kent Ridge Road #01-04,Yusof Ishak House,Singapore 119078',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'ONEGEORGESTREET',
      store_name: 'One George Street',
      password: '1234',
      location: '1 George Street #01-01,Singapore 049145',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'ONERAFFLESPLACE',
      store_name: 'One Raffles Place',
      password: '1234',
      location: '1 Raffles Place #B1-34,One Raffles Place,Singapore 048616',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'OXLEYTOWER',
      store_name: 'Oxley Tower',
      password: '1234',
      location: '138 Robinson Road #01-07,Oxley Tower,Singapore 068906',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'PLUS',
      store_name: 'PLUS',
      password: '1234',
      location: '20 Cecil Street #01-02,PLUS,Singapore 049705',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'REPUBLICPLAZA',
      store_name: 'Republic Plaza',
      password: '1234',
      location: '9 Raffles Place #01-04/05,Republic Plaza,Singapore 048619',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'TOAPAYOH',
      store_name: 'Toa Payoh',
      password: '1234',
      location: '450 Toa Payoh Lorong 6 #01-09,ERA APAC Centre,Singapore 319394',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      login: 'WOODLANDSIX',
      store_name: 'Woodlands Industrial Xchange',
      password: '1234',
      location: '71 Woodlands Avenue 10,Woodlands Industrial Xchange,Singapore 737743',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ], {}),

  down: async (queryInterface) => {
    console.log('deleting seed data from stores ==============>');
    await queryInterface.bulkDelete('items', null, {});
  },
};
