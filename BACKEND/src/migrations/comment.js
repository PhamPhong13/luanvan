'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            postId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            comment: {
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
        await queryInterface.dropTable( 'comments' );
    }
};