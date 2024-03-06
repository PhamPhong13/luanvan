'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Keyform extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
            Keyform.hasOne(models.Answer, { foreignKey: 'kerformId', as: "answerForm" });
        }
    };
    Keyform.init( {
        formId: DataTypes.STRING,
        key: DataTypes.STRING,
        desc: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Keyform',
    } );
    return Keyform;
};