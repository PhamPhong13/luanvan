'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'thanhviens', {
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
            fullName: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            desc: {
                type: Sequelize.STRING
            },
            position: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable( 'thanhviens' );
    }
};