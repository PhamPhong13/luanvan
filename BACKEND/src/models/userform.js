'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Userform extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
            Userform.belongsTo(models.Admin, { foreignKey: 'adminId' });
            Userform.belongsTo(models.Form, { foreignKey: 'formId' });
        }
    };
    Userform.init( {
        formId: DataTypes.STRING,
        adminId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Userform',
    } );
    return Userform;
};