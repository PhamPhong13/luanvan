'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Doctor_Infor extends Model
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
    Doctor_Infor.init( {
        doctorId: DataTypes.STRING,
        clinicId: DataTypes.STRING,
        specialtyId: DataTypes.STRING,
        desc: DataTypes.STRING,
        descMarkdown: DataTypes.STRING  ,
        descHTML: DataTypes.STRING,
        priceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
    } );
    return Doctor_Infor;
};