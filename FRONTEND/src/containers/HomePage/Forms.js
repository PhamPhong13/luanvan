import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import { withRouter } from 'react-router';
import { getbieumau, getpostslide} from '../../services/userService';
import Header from './Header';

class Forms extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            listbieumau: [],
            listPost: [],
        }
    }

    async componentDidMount() {
        await this.getbieumaus();
        await this.getAllposts();
    }

    getbieumaus = async () => {
        let res = await getbieumau();
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                listbieumau: res.data
            })
        }
        else {
            this.setState({
                listbieumau: []
            })
        }
    }

    getAllposts = async () => {
        let res = await getpostslide();
        console.log(res)
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listPost: res.data
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
        let { listbieumau } = this.state;
        return (
            <>
                <title>Biểu mẩu</title>
                <Header />
                 <div className='container manage_container'id='top'>
                    <div className='manage_container-content' >
                        <div className='homepage'>
                            <div className='left'>
                                <div className='slider' >
                                    <div>Sinh viên có thể sử dụng các mẫu đơn từ theo mẫu của nhà Trường như sau:</div>
                                {listbieumau && !isEmpty(listbieumau) && listbieumau.map((item) => {
                                    return (
                                        <div className='my-2'>
                                            <a href={item.image} target='_blank' rel='noopener noreferrer'>- {item.name}</a>
                                         </div>
                                    )
                                })}
                                </div>
                            </div>
                            <div className='right'>
                                <div className='tb'>
                                    <div className='thongbao'>Tin mới nhất</div>
                                </div>
                                <div className='new'>
                                    {this.state.listPost && this.state.listPost.map((item, index) => {
                                    return (
                                        <li onClick={() => this.linktopost(item.id)}>
                                            <p>{ item.name}</p>
                                        </li>
                                    )
                                })}
                                </div>
                                <div className='see'>
                                    <span>-- Xem thêm -- </span>
                                </div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Forms ));
