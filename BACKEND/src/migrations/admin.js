'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'admins', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            fullName: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            position: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            desc: {
                type: Sequelize.STRING
            },
            tunure: {
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
        await queryInterface.dropTable( 'admins' );
    }
};