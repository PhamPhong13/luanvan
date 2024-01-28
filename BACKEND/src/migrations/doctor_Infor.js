'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'doctor_infors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.STRING
            },
            clinicId: {
                type: Sequelize.STRING
            },
            specialtyId: {
                type: Sequelize.STRING
            },
            desc: {
                type: Sequelize.STRING
            },
            descMarkdown: {
                type: Sequelize.STRING
            },
            descHTML: {
                type: Sequelize.STRING
            },
            priceId: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.STRING
            },
            provinceId: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
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
        await queryInterface.dropTable( 'doctor_infors' );
    }
};

