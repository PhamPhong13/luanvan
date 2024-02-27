import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import { getAllbg, getAllnhiemky, getmenberById } from '../../services/userService';
import Header from './Header';
import Footer from './Footer';
class Tunure extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            nhiemky: "",
            menber: "",
            menber1: "",
            menber2: "",
            bg: ""
        }
    }

    async componentDidMount() {
        await this.getbgs();
        await this.getnhiemky();
    }

    getbgs = async () => {
        let res = await getAllbg();
        this.setState({
            bg: res.data[res.data.length - 1].image
        })
    }

   
    getnhiemky = async () => {
        let res = await getAllnhiemky();
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                nhiemky: res.data[res.data.length - 1]
            })

            await this.getmenber();
        }
        else this.setState({
            nhiemky: ""
        })


    }

    getmenber = async () => {
        let res = await getmenberById(this.state.nhiemky.id, '0');
        let res1 = await getmenberById(this.state.nhiemky.id, '1');
        let res2 = await getmenberById(this.state.nhiemky.id, '2');
        if (res && res.errCode === 0) {
            this.setState({
                menber: res.data
            })
        }

        if (res1 && res1.errCode === 0) {
            this.setState({
                menber1: res1.data
            })
        }

        if (res2 && res2.errCode === 0) {
            this.setState({
                menber2: res2.data
            })
        }
    }

      


    render ()
    {
        let { nhiemky, menber, menber1, menber2, bg } = this.state;
        
        return (
            <>
                <title>
                    Thông tin nhiệm kỳ {nhiemky && nhiemky.name}
            </title>
                <Header />

                <div className='container manage_container'id='top'>
                    <div className='manage_container-content' >
                        <div className='nhiemky' >
                            <div className='text-center title pt-5'> Chi hội sinh viên bình tân</div>
                        <div className='text-center'>Nhiệm kỳ 2020-2021</div>
                        <div className='text-center'>-------------------- * --------------------</div>

                        {menber && 
                        <div className='menber'>
                            <div className='title'>Chi hội trưởng</div>
                                <img src={menber.image} />
                                <div className='name'>Họ tên: { menber.fullName}</div>
                                <div className='name'>Email: { menber.email}</div>
                                <div className='name'>Ngày vào đoàn:{ menber.inunion}</div>
                                <div className='name'>Điện thoại: { menber.phone}</div>
                        </div>
                        }

                        {menber1 && 
                        <div className='menber'>
                            <div className='title'>Chi hội phó</div>
                                <img src={menber1.image} />
                                <div className='name'>Họ tên: { menber1.fullName}</div>
                                <div className='name'>Email: { menber1.email}</div>
                                <div className='name'>Ngày vào đoàn:{ menber1.inunion}</div>
                                <div className='name'>Điện thoại: { menber1.phone}</div>
                        </div>
                        }

                        {menber2 && 
                        <div className='menber'>
                            <div className='title'>ủy viên ban chấp hành</div>
                                <img src={menber2.image} />
                                <div className='name'>Họ tên: { menber2.fullName}</div>
                                <div className='name'>Email: { menber2.email}</div>
                                <div className='name'>Ngày vào đoàn:{ menber2.inunion}</div>
                                <div className='name'>Điện thoại: { menber2.phone}</div>
                        </div>
                        }
                        </div>
                    </div>
                </div>

                <Footer />
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Tunure ));
