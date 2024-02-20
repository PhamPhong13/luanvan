'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Repcomment extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
            Repcomment.belongsTo(models.User, { foreignKey: "userId" })

        }
    };
    Repcomment.init( {
        commentId: DataTypes.STRING,
        userId: DataTypes.STRING,
        repcomment: DataTypes.STRING,
        like: DataTypes.INTEGER,
        
    }, {
        sequelize,
        modelName: 'Repcomment',
    } );
    return Repcomment;
};