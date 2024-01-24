import React, { Component } from 'react';
import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import "./AddUser.scss";
import { getAllPatient } from "../../../services/userService"
class AddPatient extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            email: "",
            password: "",
            fullName: "",
            address: "",
            birthday: "",
            phone: "",
            gender: "",
            roleId: "",
        }
    }



    render ()
    {
        return (
            <>
                <title>
                    <FormattedMessage id="system.header.manage-patient" />
                </title>

                <div className='container adduser'>
                    <div className='title'>
                        <FormattedMessage id="system.add.manage-patient" />
                </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AddPatient );
