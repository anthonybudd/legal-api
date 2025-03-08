const day = require('dayjs');

const insert = [{
    id: '58412529-855f-4f7f-b98c-7571ee2834ce',
    groupID: 'fdab7a99-2c38-444b-bcb3-f7cef61c275b',
    name: 'SeededDocument.pdf',
    filePath: 's3://legal-api-s3-private/885ed618-977c-43dd-9c9d-e854e598e2e8.pdf',
    size: '100',
    mimeType: 'application/pdf',
    createdAt: day().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: day().format('YYYY-MM-DD HH:mm:ss'),
}];

module.exports = {
    up: (queryInterface,) => queryInterface.bulkInsert('Documents', insert),
    down: () => { }
};
