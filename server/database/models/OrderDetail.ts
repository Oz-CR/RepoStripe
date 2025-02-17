import { DataTypes, DecimalDataType, Model } from 'sequelize';
import sequelize from '../config/database';

interface OrderDetailAttributes {
    id: number;
    order_id: number;
    product_id: number;
    product_quantity: number;
    subtotal_price: DecimalDataType;
    createdAt: Date;
    updatedAt: Date;
}

export default class OrderDetail extends Model<OrderDetailAttributes> implements OrderDetailAttributes {
    id!: number;
    order_id!: number;
    product_id!: number;
    product_quantity!: number;
    subtotal_price!: DecimalDataType;
    createdAt!: Date;
    updatedAt!: Date;
}

OrderDetail.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal_price: {
        type: DataTypes.DECIMAL(10, 2),
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
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: true,
})