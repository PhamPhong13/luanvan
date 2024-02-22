import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getpostById, getcatById } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import Comment from './Comment';
class InforPost extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            cat: '',
            thu: "",
            day: "",
        }
    }

    async componentDidMount() {
        await this.getPostByIds();
    }

    

    getPostByIds = async () => {
        let res = await getpostById(this.props.match.params.id);
        this.setState({
            post: res.data
        })
        await this.getcat(this.state.post.catId)
        this.getday(this.state.post.updatedAt)
    }

    getcat = async (catId) => {
        let res = await getcatById(catId);
        this.setState({
            cat: res.data
        })
    }
   

    linkToAddAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/add-post` );
        }
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
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-post"></FormattedMessage>
                </title>

                <div className='container postinfor'>
                    <div className='postinfor-content'>
                        <div className='postinfor-title'>
                            <p className='name'>
                                {this.state.post.name}
                            </p>
                            <div className='cat'>
                                <i>Id bài viết: { this.state.post.id}</i>
                                <span>
                                    {this.state.cat.name}
                                </span>
                            </div>
                            <span className='date'> <i>Ngày đăng: {this.state.thu} - { this.state.day}</i></span>
                            <span className='like'>Lược thích: 500 ❤️</span>
                            {this.state.post.image && this.state.post.image !== null &&
                            <p className='img'>
                                <img src={this.state.post.image} />
                            </p>
                            }
                            <p className='content-p' dangerouslySetInnerHTML={ { __html: this.state.post.descHTML } }>
                            </p>

                            <p className='see'>
                                <b>Lược xem: 5000</b>
                            </p>
                        </div>

                        <div className="post-comment">
                            <Comment id={this.state.post.id} />
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( InforPost ));
