import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getformbykey , getkeyform, getAdmin, createuserform, getuserform, deleteuserform, getkeyformbyid} from "../../../../services/userService"

import { withRouter } from 'react-router';

import { isEmpty } from 'lodash';
import Select from 'react-select';

import ResulFormItem from './ResulFormItem';
import { FormattedMessage } from 'react-intl';
import PDFGenerator from './PDFGenerator ';

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
            openselect: false,
            listUser: []
        }
    }

    async componentDidMount() {
        await this.getkey()
        await this.getkeybyid()
        await this.getAdmins()
        await this.getuserforms()
    }

    getuserforms = async () => {
        let res = await getuserform(this.props.match.params.id);
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
                if (item.id !== this.props.user.id && item.id !== 5) {
                    let object = {};
                    object.value = item.id;
                    object.label = `${item.fullName} - ${item.email}`;
                    resultformat.push(object);
                }
            })
        }
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

    getkeybyid = async () => {
       let res = await getkeyformbyid(this.state.listkeys[0].id);
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
            listUser: res.data
        })
        } 
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

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render ()
    {
        let { selectedAdmins } = this.state;
        let { listkeys, postId, userform, openselect, listUser } = this.state;
        return (
            <>
                <div className='postinfor'>
                    <div className='left' style={{paddingTop: "30px"}}>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-post")}><span><i className='fas fa-list'></i><FormattedMessage id="system.manage.manage-post"></FormattedMessage></span></li>
                            <li ><span><i class="fas fa-book"></i><FormattedMessage id="system.manage.manage-form"></FormattedMessage></span>
                                <ul className='ul-link'>
                                    <li onClick={() => this.linkTouser("/system/manage-form")}><i className='fas fa-user'></i><span>Form của bạn</span></li>
                                    <li onClick={() => this.linkTouser("/system/manage-form-share")}><i className='fas fa-share'></i><span>Form được chia sẻ</span></li>
                            </ul>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
                        <title>Kết quả biểu mẩu đăng ký</title>
                <div className=' resultform'>
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
                                                <>
                                                    <li>{item.name} <span onClick={() => this.hadledeleteuserform(item.id)}>x</span></li>
                                                </>
                                            )
                                        })
                                        }
                                    </div>
                            </div>}
                                
                            </div>
                        </div>
                       
                        <div className='resultform-content-item'>
                            
                            <div className='stt'>
                                <div className='top'>stt</div>
                                {listUser && !isEmpty(listUser) && listUser.map((item, index) => {
                                return (
                                    <div className='bottom'>{ index + 1}</div>
                                    )
                                 })
                            
                            }
                                
                            </div>
                        {listkeys && !isEmpty(listkeys) && listkeys.map((item, index) => {
                            return (
                                <ResulFormItem keyform = {item} />
                                )
                            })
                            
                            }

                        </div>
                        
                    </div>
                </div>
                    </div>
                </div>
            {listkeys && 
               <div style={{marginLeft: "200px"}}><PDFGenerator /></div> }
                 

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
