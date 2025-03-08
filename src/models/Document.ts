import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../providers/db';
import * as Sequelize from 'sequelize';
import { UpdatedAt } from 'sequelize-typescript';

interface DocumentModel extends Model<InferAttributes<DocumentModel>, InferCreationAttributes<DocumentModel>> {
    id: CreationOptional<string>,
    name: string,
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


    name: {
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
                // Excluded properties
            ]
        }
    },
});

export default Document;

export {
    DocumentModel,
    Document,
};
