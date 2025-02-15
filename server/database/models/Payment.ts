import { DataTypes, DecimalDataType, Model } from 'sequelize';
import sequelize from '../config/database';

interface PaymentAttributes {
    id: number;
    order_id: number;
    payment_date: Date;
    total_payment: DecimalDataType;
    createdAt: Date;
    updatedAt: Date;
}

export default class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
    id!: number;
    order_id!: number;
    payment_date!: Date;
    total_payment!: DecimalDataType;
    createdAt!: Date;
    updatedAt!: Date;
}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_payment: {
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
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
})      