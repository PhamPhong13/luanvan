'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Post extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
             Post.hasOne(models.Report, { foreignKey: 'postId'})
             Post.hasOne(models.History, { foreignKey: 'postId'})
             Post.hasOne(models.Likepost, { foreignKey: 'postId'})
             Post.belongsTo(models.Admin, { foreignKey: 'adminId'})
        }
    };
    Post.init( {
        adminId: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        descMarkdown: DataTypes.STRING,
        descHTML: DataTypes.STRING,
        catId: DataTypes.STRING,
        count: DataTypes.INTEGER,
        
    }, {
        sequelize,
        modelName: 'Post',
    } );
    return Post;
};