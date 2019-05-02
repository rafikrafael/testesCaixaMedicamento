const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const attributes = {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      identificador: {
          type: DataTypes.STRING(255),
          allowNull: true,
      },
      createdAt: {
          type: DataTypes.DATE,
      },
      updatedAt: {
          type: DataTypes.DATE,
      },
      deletedAt: {
          type: Sequelize.DATE,
      },
  };
  const CaixaMedicamento = sequelize.define('CaixaMedicamento', attributes, {
      tableName: 'caixaMedicamentos',
      paranoid: true,
      freezeTableName: true,
      hooks: {
        beforeCreate: (caixaMedicamento, options) => {
        },
        beforeUpdate: (caixaMedicamento, options) => {
        }
      }
  });
  CaixaMedicamento.associate = (models) => {
  };
  return CaixaMedicamento;
};
