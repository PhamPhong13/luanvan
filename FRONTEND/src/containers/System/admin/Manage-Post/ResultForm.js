import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getformbykey , getkeyform} from "../../../../services/userService"

import { withRouter } from 'react-router';

import { isEmpty } from 'lodash';

import ResulFormItem from './ResulFormItem';
class Resultform extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listkeys: [],
            postId: "",
            formId: "",
        }
    }

    async componentDidMount() {
        await this.getkey()
    }

    getkey = async () => {
        let res = await getkeyform(this.props.match.params.id);
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listkeys: res.data
            })

        }
        else this.setState({
            listkeys: []
        })

        await this.getform(res.data[0].formId);
    }

    getform = async (id) => {
        let res = await getformbykey(id);
        if (res && res.errCode === 0 ) { 
            this.setState({
                postId: res.data.postId
            })
        }
        console.log(this.state)
    }
    
    linkToInforForm =  (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/form/${id}` );
        }
    }


    render ()
    {
        let { listkeys, postId } = this.state;
        console.log(listkeys);
        return (
            <>
                <title>Kết quả biểu mẩu đăng ký</title>
                <div className='container resultform'>
                    <div className='resultform-content'>
                        <div className='title'>Kết quả biểu mẩu đăng ký</div>
                        <div className='updateform'>
                            <div className='btn btn-primary'
                                onClick={() => this.linkToInforForm(postId)}
                            >Sửa biểu mẫu</div>
                        </div>
                       
                        <div className='resultform-content-item'>
                        {listkeys && !isEmpty(listkeys) && listkeys.map((item) => {
                            return (
                                <ResulFormItem keyform = {item} />
                                )
                            })
                            
                            }

                        </div>
                        
                    </div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Resultform ));
