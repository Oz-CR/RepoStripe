import { DataTypes, DecimalDataType, EnumDataType, Model } from 'sequelize';
import sequelize from '../config/database';

interface OrderAttributes {
    id: number;
    user_id: number;
    shipper_id: number;
    total_price: DecimalDataType;
    order_state: 'Pendant' | 'In Delivery' | 'Cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export default class Order extends Model<OrderAttributes> implements OrderAttributes {
    id!: number;
    user_id!: number;
    shipper_id!: number;
    total_price!: DecimalDataType;
    order_state!: 'Pendant' | 'In Delivery' | 'Cancelled';
    createdAt!: Date;
    updatedAt!: Date;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shipper_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    order_state: {
        type: DataTypes.ENUM('Pendant', 'In Delivery', 'Cancelled'),
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
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
})