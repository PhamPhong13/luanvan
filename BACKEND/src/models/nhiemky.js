'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Nhiemky extends Model
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
    Nhiemky.init( {
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Nhiemky',
    } );
    return Nhiemky;
};