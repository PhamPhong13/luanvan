'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Form extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
             Form.hasOne(models.Userform, { foreignKey: 'formId'})
        }
    };
    Form.init( {
        postId: DataTypes.STRING,
        adminId: DataTypes.STRING,
        name: DataTypes.STRING,
        desc: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Form',
    } );
    return Form;
};