import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createbieumau} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';

import logo from '../../../../assets/logo.jpg';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */ );
class Bieumau extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: '',
            openform: false, 
        }
    }

    

    async componentDidMount() {
        
    }

    handlesave = async () => {
        let res = await createbieumau({
            name: this.state.name,
            image: this.state.image,
        });
        if (res && res.errCode === 0) {
            toast.success("Thêm biểu mẫu thành công!");
        }
        else
            toast.error("Thêm biểu mẫu không thành công!");
    }

    handleopenform = () => {
        this.setState({
            openform: !this.state.openform,
        })
    }

    render ()
    {
        let { openform } = this.state;
        return (
            <>
                <title>
                    Biểu mẫu
                </title>
                <div className='container bieumau'>
                    <div className='addbieumau' onClick={() => this.handleopenform()}>Thêm</div>
                    <div className='bieumau_content'>
                        <div className='name'>lkffifh</div>
                        <img src={ logo} />
                        <div className='title'>hqkfqfhqfqi</div>
                    </div>

                    {openform === true &&
                    <div className='openform'>
                        <div className='openformContent'>
                            <div className='title'>Thêm biểu mẫu</div>
                            <div className='form-group'>
                                <label>Tên biểu mẫu</label>
                                <input type="text" />
                            </div>
                            <div className='form-group image'>
                                <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh </label>
                                <input type='file' className='form-controll-file'
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                            </div>
                            <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            /* onClick={() => this.handleSave()} */
                            >
                                    <FormattedMessage id="key.add"></FormattedMessage></div>
                                <div className='btn btn-secondary '
                            onClick={() => this.handleopenform()}
                            >
                                <FormattedMessage id="key.cancel"></FormattedMessage></div>
                        </div>
                        </div>
                    </div>
                    }
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
