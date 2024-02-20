'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'repcomments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            commentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            repcomment: {
                type: Sequelize.STRING
            },
            like: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        } );
    },
    down: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.dropTable( 'repcomments' );
    }
};