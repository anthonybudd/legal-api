import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';

interface DocumentModel extends Model<InferAttributes<DocumentModel>, InferCreationAttributes<DocumentModel>> {
    id: CreationOptional<string>,
    groupID: string,
    name: string,
    filePath: string,
    size: number,
    mimeType: string,
    createdAt: CreationOptional<string>,
    updatedAt: CreationOptional<string>,
}

const Document = sequelize.define<DocumentModel>('Document', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
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
}, {
    tableName: 'Documents',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: [
                'filePath',
            ]
        }
    },
});

export default Document;

export {
    DocumentModel,
    Document,
};
