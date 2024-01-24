'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Patient extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
        }
    };
    Patient.init( {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        birthday: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.STRING,
        roleId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Patient',
    } );
    return Patient;
};