const {DataTypes} = require('sequelize')
const sequelize = require('../database/sequelize')

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'Usuarios',
    timestamps: true,
    underscored: false,
});

module.exports = Usuario;