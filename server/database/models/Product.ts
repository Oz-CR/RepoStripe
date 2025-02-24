import { DataTypes, DecimalDataType, Model } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
    id: number;
    product_name: string;
    product_description: string;
    product_price: DecimalDataType;
    address: string;
    latitud: number;
    longitud: number;
    createdAt: Date;
    updatedAt: Date;
}

export default class Product extends Model<ProductAttributes> implements ProductAttributes {
    id!: number;
    product_name!: string;
    product_description!: string;
    product_price!: DecimalDataType;
    address: string;
    latitud: number;
    longitud: number;
    createdAt!: Date;
    updatedAt!: Date;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, 
{
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
})