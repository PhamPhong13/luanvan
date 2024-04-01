import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createbieumau, getbieumau, deletebieumau, updatebieumau} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';

import logo from '../../../../assets/logo.jpg';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { isEmpty } from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */ );
class Bieumau extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: '',
            openform: false, 
            action: "create",
            listBieumau: [],
            id: ''
        }
    }

    

    async componentDidMount() {
        await this.getbieumaus();
    }

    getbieumaus = async () => {
        let res = await getbieumau();
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                listBieumau: res.data
            })
        }
        else this.setState({
            listBieumau: []
        })
    }

    handleSave = async () => {
        if (this.state.action === "create") {
            let res = await createbieumau({
            name: this.state.name,
            image: this.state.image,
            });
            if (res && res.errCode === 0) {
                toast.success("Thêm biểu mẫu thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })
                await this.getbieumaus();
            }
        else
            {
                toast.error("Thêm biểu mẫu không thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })

            }
         }
        else {
            let res = await updatebieumau({
            name: this.state.name,
                image: this.state.image,
            id: this.state.id
            });
            if (res && res.errCode === 0) {
                toast.success("Thêm biểu mẫu thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })
                await this.getbieumaus();
            }
        else
            {
                toast.error("Thêm biểu mẫu không thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })

            }
        }
    }

    handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    handleopenform = () => {
        this.setState({
            openform: !this.state.openform,
        })
    }


    handleDeleteBieumau = async (id) => {
        await deletebieumau(id);
        await this.getbieumaus();
    }

    handleEdit = (item) => {
        this.setState({
            name: item.name,
            image: item.image,
            id: item.id,
            action: "edit",
            openform: true
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
        let { openform, listBieumau , name} = this.state;
        return (
            <>
                <title>
                    Biểu mẫu
                </title>
                <div className='manage'>
                    <div className='left' style={{position: 'fixed', top: '112px', left: '0'}}>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/bieumau")}><span><i class="fas fa-align-right"></i>Quản lý biểu mẫu</span></li>
                        </div>
                    </div>
                    <div className='right' style={{marginLeft: '222px', padding: '33px 30px'}}>
                        <div className=' bieumau'>
                    <div className='addbieumau' onClick={() => this.handleopenform()}>Thêm</div>
                            <div className='title py-3 mt-0'  style={{background: 'white'}}>Quản lý biểu mẫu</div>
                    {listBieumau && isEmpty(listBieumau) && "Không có biểu mẫu nào!"}
                    {listBieumau && !isEmpty(listBieumau) && listBieumau.map((item) => {
                        return (
                            <div className='bieumau_content'>
                                 <a href={item.image} download>- {item.name}</a>
                                
                                <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleEdit(item)}
                            >
                                    <FormattedMessage id="key.change"></FormattedMessage></div>
                                <div className='btn btn-danger mx-2'
                            onClick={() => this.handleDeleteBieumau(item.id)}
                            >
                                <FormattedMessage id="key.delete"></FormattedMessage></div>
                        </div>
                            </div>
                        )
                    })}
                    {openform === true &&
                    <div className='openform'>
                        <div className='openformContent'>
                            <div className='title'>Thêm biểu mẫu</div>
                            <div className='form-group'>
                                <label>Tên biểu mẫu</label>
                                    <input type="text" value={name}
                                    onChange={(event) => this.handleOnchangeInput(event, "name")}
                                    />
                            </div>
                            <div className='form-group image'>
                                <label className='label_upload-img' htmlFor='reviewImg'>Link biểu mẫu </label>
                                <input type='text' className='form-controll-file' 
                                    onChange={(event) => this.handleOnchangeInput(event, 'image')}
                                />
                            </div>
                            <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleSave()}
                            >
                                    <FormattedMessage id="key.save"></FormattedMessage></div>
                                <div className='btn btn-secondary '
                            onClick={() => this.handleopenform()}
                            >
                                <FormattedMessage id="key.cancel"></FormattedMessage></div>
                                </div>
                                
                        </div>
                    </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Bieumau ));
