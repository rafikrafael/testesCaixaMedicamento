const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;
if (!db) {
    db = {};
    const operatorsAliases = {
        $in: Sequelize.Op.in,
    };
    config = Object.assign({ operatorsAliases }, config, {
        define: {
            underscored: false,
            // paranoid: true,
            timestamp: true,
            logging: console.log
        },
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast(field, next) {
                // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            }
        },
        timezone: 'America/Sao_Paulo',
    }); //, logging: console.log });
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    fs
        .readdirSync(__dirname)
        .filter((file) => {
        const fileSlice = file.slice(-3);
        return (file.indexOf('Model') > 0 && file.indexOf('.') > 0) && (file !== basename) && (fileSlice === '.js');
    })
        .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model['name']] = model;
    });
    Object.keys(db)
        .forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db.model);
        }
    });
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
}
module.exports = db;
