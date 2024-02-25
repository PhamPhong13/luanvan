'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'reports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            userrportId: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
            },
            comment: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            status: {
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
        await queryInterface.dropTable( 'reports' );
    }
};