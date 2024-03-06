import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getkeyformbyid } from "../../../../services/userService"

import { withRouter } from 'react-router';

import { isEmpty } from 'lodash';
class ResultFormItem extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            listAnswer: [],
            listKey: []
        }
    }

    async componentDidMount() {
        await this.getkey();
        await this.getkeybyid();
    }

    getkeybyid = async () => {
        let res = await getkeyformbyid(this.props.keyform.id);
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
            listKey: res.data
        })
        }
    }

    getkey = async () => {
        this.setState({
            id: this.props.keyform.id,
            name: this.props.keyform.key
        })
    }

    render ()
    {
        let { name, listKey} = this.state;
        return (
            <>
                <div className='item'>
                    <div className='top'>{name}</div>
                    
                    {listKey && !isEmpty(listKey) && listKey.map((item) => {
                        return (

                            <div className='bottom'>{item.answerForm.answer }</div>
                        )
                    })}

                </div>
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ResultFormItem ));
