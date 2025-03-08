module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Documents', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        groupID: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'Groups',
                key: 'id'
            }
        },


        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        filePath: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        size: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        mimeType: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Documents'),
};
