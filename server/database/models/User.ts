import {  DataTypes, EnumDataType, Model } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    token: string;
    rol: 'Client' | 'Admin' | 'Shipper';
    address: string;
    longitud: number;
    latitud: number;
    createdAt: Date;
    updatedAt: Date;
}

export default class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    token!: string;
    rol!: 'Client' | 'Admin' | 'Shipper';
    address!: string;
    longitud!: number;
    latitud!: number;
    createdAt!: Date;
    updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rol: {
        type: DataTypes.ENUM('Client', 'Admin', 'Shipper'),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    latitud: {
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
})