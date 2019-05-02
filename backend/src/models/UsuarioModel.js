const Sequelize = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    permaneceLogado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    ultimoToken: {
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
  const Usuario = sequelize.define('Usuario', attributes, {
    tableName: 'usuarios',
    paranoid: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: (usuario, options) => {
          const salt = bcryptjs.genSaltSync();
          usuario.senha = bcryptjs.hashSync(usuario.senha, salt);
      },
      beforeUpdate: (usuario, options) => {
          // Valida se o campo a ser alterado é o campo senha, evitando que
          // fique trocando a senha do usuário a cada update!
          if (usuario.changed('senha')) {
              const salt = bcryptjs.genSaltSync();
              usuario.senha = bcryptjs.hashSync(usuario.senha, salt);
          }
      },
      afterSync: function (options) {
        sequelize.query('select id from usuarios', { type: Sequelize.QueryTypes.SELECT })
          .then(usuarios => {
            if (usuarios.length <= 0) {
              sequelize.query(`
                INSERT INTO usuarios (nome, email, senha) VALUES ('teste', 'teste@teste.com', '$2a$10$BGwEik2/U2gXAf3pIj8BHOUtw1sK6wwwWK9gOQw4t34IHRjfebQUe');
              `, { type: Sequelize.QueryTypes.INSERT })
            }
          })
      }
    }
  });
  Usuario.associate = (models) => {

  };
  Usuario.prototype.isSenha = function (encodedSenha = '', senha = '') {
    return bcryptjs.compareSync(senha, encodedSenha);
  };
  return Usuario;
};
