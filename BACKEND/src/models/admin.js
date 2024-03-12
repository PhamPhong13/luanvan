'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Admin extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
            Admin.belongsTo(models.Allcode, { foreignKey: 'position' , targetKey: 'keyMap', as: 'positionAdmin' });
             Admin.hasOne(models.Post, { foreignKey: 'adminId'})
             Admin.hasOne(models.Userform, { foreignKey: 'adminId'})
            
        }
    };
    Admin.init( {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        fullName: DataTypes.STRING,
        phone: DataTypes.STRING,
        position: DataTypes.STRING,
        image: DataTypes.STRING,
        desc: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Admin',
    } );
    return Admin;
};