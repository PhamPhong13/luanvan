'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Report extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
            Report.belongsTo(models.User, { foreignKey: "userId" })

        }
    };
    Report.init( {
        type: DataTypes.STRING,
        userId: DataTypes.STRING,
        postId: DataTypes.STRING,
        userrportId: DataTypes.STRING,
        content: DataTypes.STRING,
        comment: DataTypes.STRING,
        image: DataTypes.STRING,
        status: DataTypes.STRING,
        
    }, {
        sequelize,
        modelName: 'Report',
    } );
    return Report;
};