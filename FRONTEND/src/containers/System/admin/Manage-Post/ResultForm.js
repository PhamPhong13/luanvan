import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getformbykey , getkeyform, getAdmin, createuserform, getuserform, deleteuserform} from "../../../../services/userService"

import { withRouter } from 'react-router';

import { isEmpty } from 'lodash';
import Select from 'react-select';

import ResulFormItem from './ResulFormItem';
class Resultform extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listkeys: [],
            postId: "",
            formId: "",
            selected: "",
            selectedAdmins: [],
            userform: [],
            openselect: false
        }
    }

    async componentDidMount() {
        await this.getkey()
        await this.getAdmins()
        await this.getuserforms()
    }

    getuserforms = async () => {
        let res = await getuserform(this.props.match.params.id);
        console.log(res);
        let resultformat = [];
        if (res && res.errCode === 0 && res.data.length > 0) { 
            res.data.map((item) => {
                let object = {};
                object.id = item.Admin.id;
                object.name = `${item.Admin.fullName} - ${item.Admin.email}`;
                resultformat.push(object);
            })
        }
        this.setState({
            userform: resultformat
        })
    }

    getAdmins = async () => {
        let res = await getAdmin();
        let resultformat = [];
        if (res && res.errCode === 0 && res.data.length > 0) { 
            res.data.map((item) => {
                if (item.id !== this.props.user.id) {
                    let object = {};
                    object.value = item.id;
                    object.label = `${item.fullName} - ${item.email}`;
                    resultformat.push(object);
                }
            })
        }
        console.log(resultformat)
        this.setState({
            selectedAdmins: resultformat
        })
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
    }
    
    linkToInforForm =  (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/form/${id}` );
        }
    }

    handleChangeSelect = async (selected) => {
        await createuserform({
            formId: this.props.match.params.id,
            adminId: selected.value
        });

        await this.getuserforms();
        
    }

    hadledeleteuserform = async (id) => {
        await deleteuserform(this.props.match.params.id, id);
        await this.getuserforms();
    }

    openselect = () => {
        this.setState({
            openselect:true
        })
    }

    onblurselect = () => {
        this.setState({
            openselect:false
        })
        this.setState({
            openselect:false
        })
    }

    render ()
    {
        let { selectedAdmins } = this.state;
        let { listkeys, postId, userform, openselect } = this.state;
        return (
            <>
                <title>Kết quả biểu mẩu đăng ký</title>
                <div className='container resultform'>
                    <div className='resultform-content'>
                        <div className='title'>Kết quả biểu mẩu đăng ký</div>
                        <div className='updatetop'>
                            <div className='updateform'>
                            <div className='btn btn-primary'
                                onClick={() => this.linkToInforForm(postId)}
                            >Sửa biểu mẫu</div>
                            </div>
                            <div className='btn btn-light share-up' onClick={() => this.openselect()}
                            onBlur={() => this.onblurselect()}> Chia sẻ biểu mẫu
                                {openselect === true &&
                                <div className='selectshare' >
                                    <Select
                                        
                                        onChange={ this.handleChangeSelect }
                                        options={ selectedAdmins } 
                                    />
                                    <div className='namesahre'>
                                        {userform && userform.map((item) => {
                                            return (
                                                <li>{ item.name} <span onClick={() => this.hadledeleteuserform(item.id)}>x</span></li>
                                            )
                                        })
                                        }
                                    </div>
                            </div>}
                                
                            </div>
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
