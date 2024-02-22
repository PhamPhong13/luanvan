import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import { withRouter } from 'react-router';
import {getAllpostById,   getcatById, getpostById} from '../../services/userService';
import Header from './Header';
import Comment from './Comment';
class lienhe extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            name: ""
        }
    }

    async componentDidMount() {
        await this.getcat();
        await this.getpost();
    }

    getcat = async () => { 
        let res = await getcatById(this.props.match.params.id);
        if (res && res.errCode === 0 ) {
            this.setState({
                name: res.data.name,
            })
        }
        else this.setState({
            name: ""
        })
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            })
            await this.getpost();
        } 
    }

    getpost = async () => {
        let res = await getAllpostById(this.props.match.params.id);
        if (res && res.errCode === 0 ) {
            let reverse = res.data.reverse();
            this.setState({
                listPost: reverse
            })
        }
        else this.setState({
            listPost: []
        })
    }
    
    linktopost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${id}` );
        }
    }
    
    render ()
    {
        let { listPost, name } = this.state;
        return (
            <>
                <title>
                Liên hệ
                </title>
                <Header /> 
                <div className='container manage_container'id='top'>
                    <div className='manage_container-content' >
                        <div className='lienhe'>
                            <div className='left'>
                                <p>CHSV Bình Tân - Nơi Tự nguyện được đặt lên hàng đầu và Nguồn sống là tình</p>
                                <p>Cảm ơn bạn đã đến thăm website của Chi hội Sinh viên Bình Tân</p>
                                <div className='top'>Bạn có vấn đề hoặc có những ý kiến cho Chi hội Sinh viên Bình Tân vui lòng điền vào form bên dưới!</div>

                                <div className='form-group'>
                                    <label>Email:</label>
                                    
                                    <input type='text' className='form-control' placeholder='Email' />
                                </div>
                                <div className='form-group'>
                                    <label>Nội dung:</label>
                                    <textarea></textarea>
                                </div>
                                <div className='btn-submit'>
                                    <div className='btn btn-primary'>Gửi</div>
                                </div>
                            </div>
                            <div className='right'>
                                <img src={logo } />
                            </div>
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
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        processLogout_U: () => dispatch( actions.processLogout_U() ),
    };
};  

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( lienhe ));
