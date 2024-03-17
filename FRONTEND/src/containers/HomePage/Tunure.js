import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import { getAllbg, getAllnhiemky, getmenberById, getadmintunure } from '../../services/userService';
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
        await this.getnhiemky();
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
        let res = await getadmintunure(this.state.nhiemky.name, 'P1');
        let res1 = await getadmintunure(this.state.nhiemky.name, 'P2');
        let res2 = await getadmintunure(this.state.nhiemky.name, 'P3');
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
        let { nhiemky, menber, menber1, menber2} = this.state;
        
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

                            {menber && !isEmpty(menber) && menber.map((item) => {
                                return (
                                <div className='menber'>
                            <div className='title'>Chi hội trưởng</div>
                                <img src={item.image} />
                                <div className='name'>Họ tên: { item.fullName}</div>
                                <div className='name'>Email: { item.email}</div>
                                <div className='name'>Ngày vào đoàn:{ item.inunion}</div>
                                <div className='name'>Điện thoại: { item.phone}</div>
                        </div>
                            )
                        })
                        
                        }

                            {menber1 && !isEmpty(menber1) && menber1.map((item) => {
                                return (
                                <div className='menber'>
                            <div className='title'>Chi hội phó</div>
                                <img src={item.image} />
                                <div className='name'>Họ tên: { item.fullName}</div>
                                <div className='name'>Email: { item.email}</div>
                                <div className='name'>Ngày vào đoàn:{ item.inunion}</div>
                                <div className='name'>Điện thoại: { item.phone}</div>
                        </div>
                            )
                        })
                        
                        }

                            {menber2 && !isEmpty(menber2) && menber2.map((item) => {
                                return (
                                <div className='menber'>
                            <div className='title'>ủy viên ban chấp hành</div>
                                <img src={item.image} />
                                <div className='name'>Họ tên: { item.fullName}</div>
                                <div className='name'>Email: { item.email}</div>
                                <div className='name'>Ngày vào đoàn:{ item.inunion}</div>
                                <div className='name'>Điện thoại: { item.phone}</div>
                        </div>
                            )
                        })
                        
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
