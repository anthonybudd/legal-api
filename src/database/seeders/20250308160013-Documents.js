const day = require('dayjs');

const insert = [{
    id: '58412529-855f-4f7f-b98c-7571ee2834ce',
    name: 'Seeded Document',
    createdAt: day().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: day().format('YYYY-MM-DD HH:mm:ss'),
}];

module.exports = {
    up: (queryInterface,) => queryInterface.bulkInsert('Documents', insert),
    down: () => { }
};
