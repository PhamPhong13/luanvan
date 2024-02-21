import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import { getAllbg,  getcatById, getpostById} from '../../services/userService';
import Header from './Header';
class Post extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            post: '',
            cat: '',
            catId: "",
            thu: "",
            day: "",
        }
    }

    async componentDidMount() {
        await this.getpost();
    }

    getcat = async() => {
        let res = await getcatById(this.state.catId);
        this.setState({
            cat: res.data
        })
    }

    getpost = async () => {
        let res = await getpostById(this.state.id);
        this.setState({
            post: res.data,
            catId: res.data.catId
        })
        this.getcat();
        this.getday(this.state.post.updatedAt);
    }

    getday = (date) => {
        let dateTime = new Date(date);

        // Mảng chứa các tên của các ngày trong tuần
        let daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

        // Lấy ngày trong tuần (từ 0 đến 6, 0 là Chủ Nhật, 1 là Thứ Hai, và cứ tiếp tục)
        let dayIndex = dateTime.getDay();
        let dayOfWeek = daysOfWeek[dayIndex];
        this.setState({
            thu: dayOfWeek,
            day: dateTime.toLocaleDateString()
        })
    }
    
    render ()
    {
        let {post, cat, thu, day} = this.state;
        return (
            <>
                <Header /> 
                
                <div className='container manage_container'>
                    <div className='manage_container-content'>
                        <div className='homepage'>
                            <div className='left post'>
                                <div className='post-name'>
                                    {post.name}
                                </div>
                                <div className='post-infor'>
                                    <span className='post-id'>Id bài viết: {post.id}</span>
                                    <span className='cat-id'>
                                        {cat.name}
                                        <span className='dot'></span>
                                    </span>
                                </div>
                                <div className='post-date'>
                                    <span className='date'>Ngày đăng: {thu} - {day}</span>
                                    <span className='like'>Thích ❤️ <i className='fas fa-heart'></i></span>
                                </div>

                                <div className='post-image'>
                                    <img src={ post.image} />
                                </div>

                                <div className='post-content'>
                                    <p className='content-p' dangerouslySetInnerHTML={ { __html: post.descHTML } }>
                                    </p>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='tb'>
                                    <div className='thongbao post'>Bài viết liên quan</div>
                                </div>
                                {/* <div className='new'>
                                    {this.state.listPost && this.state.listPost.slice(0, 5).map((item, index) => {
                                    return (
                                        <li onClick={() => this.linktopost(item.id)}>
                                            <p>{ item.name}</p>
                                        </li>
                                    )
                                })}
                                </div> */}
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Post ));
