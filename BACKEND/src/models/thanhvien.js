'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Thanhvien extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            
        }
    };
    Thanhvien.init( {
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: DataTypes.STRING,
        desc: DataTypes.STRING,
        position: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Thanhvien',
    } );
    return Thanhvien;
};