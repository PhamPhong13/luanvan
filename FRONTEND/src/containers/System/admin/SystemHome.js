import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import "./HomeSystem.scss";
import { FormattedMessage } from 'react-intl';
import { createbg, getAllbg } from '../../../services/userService';
import Footer from '../footer';
import { CommonUtils } from '../../../utils'; // vi or en

class SystemHome extends Component
{
    constructor(props) { 
        super(props);
        this.state = {
            image: "",
            openform: false
        }
    }

   async componentDidMount() {
       await this.getAllBackground();
    }

    getAllBackground = async () => {
        let res = await getAllbg();
        console.log(res)
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
            image: res.data[res.data.length - 1].image
            })
        }
        else this.setState({
            image: ""
        })
        
    }

    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                image: getBase64
            })
        }
    }

    handleOpenFrom = () => {
        this.setState({
            openform: !this.state.openform,
        })
    }

    handleSaveBg = async () => {
        let res = await createbg({
            image: this.state.image
        })
        this.setState({
            openform: false
        })
        await this.getAllBackground();
    }

    render ()
    {

        return (
            <>
                <title> <FormattedMessage id="system.homepage" /></title>
                <div className='homesystem' >
                    <div className='homesystem-ctt' style={{
                    backgroundImage: `url(${this.state.image})`}}>
                        <div className=' welcome'>
                        <FormattedMessage id="system.home" />
                    </div>
                    <div onClick={() => this.handleOpenFrom()} className='changebg'><span>Thay đổi ảnh nền</span></div>
                        {this.state.openform && this.state.openform === true &&
                    <div className='formOnChange'>
                        <div className='formOnChnge-content'>
                            <div className='title'> Thay đổi ảnh nền</div>
                            <div className='form-group'>
                                <input type='file' className='form-controll-file' 
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                            </div>
                            <div className='button-sumit'>
                                        <div className='btn btn-primary'
                                        onClick={() => this.handleSaveBg()}
                                        >
                                    Thay đổi
                                </div>
                                <div onClick={() => this.handleOpenFrom()} className='btn btn-secondary btn-cancel'>
                                    Hủy
                                </div>
                            </div>
                        </div>
                    </div>
                    }
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

export default connect( mapStateToProps, mapDispatchToProps )( SystemHome );
