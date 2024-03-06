import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/user.jpg"
import top from "../../assets/top.png"
import { withRouter } from 'react-router';
import { getAllcat , getcat} from '../../services/userService';

class Header extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listCat: [],
            openInput: false
        }
    
    }

    async componentDidMount() {
        await this.getAllCats();
    }

    getAllCats = async () => { 
        let res = await getcat("ALL");
        console.log(res)
        this.setState({
            listCat: res.data
        })
    }
    linktoLogin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/login-user` );
        }
    }

    linktoCat = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/cat/${id}` );
        }
    }

    linktoProfile = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/profile` );
        }
    }

    linktoHome = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/home` );
        }
    }

    linktoTunure = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/tunure` );
        }
    }

    linktolh = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/lienhe` );
        }
    }


    
    render ()
    {
        let { processLogout_U } = this.props;
        let {listCat} = this.state;
        return (
            <>
                <div className=' container header' >
                    <div className='header_container'>
                        <div className='header_container-top'>
                            <div className='left'>
                                <img src={logo} />
                            </div>
                            <div className='right'>
                                <div className='top'>CHI HỘI SINH VIÊN BÌNH TÂN</div>
                                <div className='down'>ĐẠI HỌC CẦN THƠ</div>
                            </div>
                        </div>
                        <div className='header_container-bottom'>
                            <div className='left'>
                                <li className='li-home'
                                onClick={() => this.linktoHome()}>
                                    <i className='fas fa-home'></i>
                                </li>
                                <li>
                                    Chuyên mục  <i class="fas fa-chevron-down"></i>
                                    <ul>
                                        {listCat && listCat.map((item, index) => {
                                            return (
                                                
                                                <li key={index} onClick={() => this.linktoCat(item.id)}>
                                                    <span>{item.name}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li onClick={() => this.linktolh()}>
                                    Liên hệ
                                </li>
                                <li onClick={() => this.linktoTunure()}>
                                    Thông tin
                                </li>
                                <li className='iconserach' >
                                    <input type='text' placeholder='Nhập để tìm kiếm ...'/>
                                    <i className='fas fa-search'                                    ></i>
                                </li>
                            </div>
                            <div className='right'>
                                <li>
                                    
                                    {this.props.userInfo && 
                                    <img src={this.props.userInfo.image} />
                                    }
                                    {this.props.userInfo === null &&
                                    <img src={avatar} />
                                    }
                                    <ul>
                                        {this.props.userInfo && 
                                            <li onClick={() => this.linktoProfile()}>       Tài khoản                   </li>}
                                        {this.props.userInfo === null && 
                                        <li onClick={() => this.linktoLogin()}>       Tài khoản                   </li>}
                                        <li>
                                            {this.props.userInfo && <span onClick={processLogout_U}>Đăng xuất</span>}
                                            {this.props.userInfo === null && <span onClick={() => this.linktoLogin()}>Đăng nhâp</span>}

                                            </li>
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>

                    <a href='#top'><img className='top_image' src={ top} /></a>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Header ));
