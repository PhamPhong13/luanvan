import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {createcomment, getcommentById, deletecomment, createrepcomment, deleterepcommentbycomment } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { isEmpty, result } from 'lodash';
import RepComment from './RepComment';
import avatar from "../../../../assets/340439352_964862588007237_5460541469979575194_n.jpg"
class Commnent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            opensee: false,
            key: "comment",
            postId: "",
            user: "",
            comment_input: "",
            listComment: [],
            commentId: "",
            update: false,
            date: ''
        }
    }

    async componentDidMount() {

        this.setState({
            postId: this.props.match.params.id,
            user: this.props.user,
            key: "comment",
            commentId: "",
            update: false


        })

        await this.getAllcomments();
    }

    getAllcomments = async () => {
        let res = await getcommentById(this.props.match.params.id)
        if (res && res.data !== null) {
            let reverse = res.data.reverse()
            this.setState({
                listComment: reverse,
                commentId: "",
                update: false
            
            })
        } else {
            
        }
    }

    openSee = () => {
        this.setState({
        opensee: !this.state.opensee
    })
    }
    
    handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.listComment!== this.props.listComment) {
            await this.getAllcomments();
            this.setState({
                key: "comment",
            commentId: ""
            })
        }
    }

    handleComment = async () => {
        if (this.checkInputComment(this.state.comment_input) === true) {
            if (this.state.key === 'comment') { 
                let res = await createcomment({
                    postId: this.state.postId,
                    userId: this.state.user.id,
                    comment: this.state.comment_input,
                })
               if (res && res.errCode === 0) {
                    this.setState({
                        comment_input: '',
                    key: 'comment'})
                    await this.getAllcomments();
                }
            }
            else {
                
                let res = await createrepcomment({
                    commentId: this.state.commentId,
                    userId: this.state.user.id,
                    repcomment: this.state.comment_input,
                })
                if (res && res.errCode === 0) {
                    this.setState({
                        comment_input: '',
                        update: !this.state.update,
                    key: 'comment'})
                }


                
            }
        }
    }


    removeComment = async (id) => { 
        alert("Bạn có chắc rằng muốn xóa bình luận này không!");
        let res = await deletecomment(id);
        let res2 = await deleterepcommentbycomment(id);
        if (res && res.errCode === 0) {
            this.setState({
                        comment_input: '',
                        update: !this.state.update,
                    key: 'comment'})
                    await this.getAllcomments();
                }
    }
    
    handleChangeKey = (id) => { 
        this.setState({
            key: "repcomment",
            commentId: id
        })
    }

    checkInputComment = (comment) => {
        if (comment.lenght <= 0) {
            return false;
        }
        return true;
    }

    timecreated = (data) => {
    // Thời điểm hiện tại
    var now = new Date();

    // Thời điểm muốn so sánh
    var yourDate = new Date(data);

    // Tính toán khoảng thời gian giữa thời điểm hiện tại và thời điểm cụ thể
    var difference = now - yourDate;

    // Chuyển đổi khoảng thời gian thành số mili giây
    difference = Math.abs(difference);

    // Chuyển đổi thành ngày, tháng, năm, giờ, phút và giây
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60) % 24;
    var minutesDifference = Math.floor(difference / 1000 / 60) % 60;
    var secondsDifference = Math.floor(difference / 1000) % 60;
    var monthsDifference = Math.floor(daysDifference / 30);
    var yearsDifference = Math.floor(monthsDifference / 12);

    let timedate = ''
    if (secondsDifference == 0 && minutesDifference == 0 && hoursDifference == 0 && daysDifference == 0 && monthsDifference == 0 && yearsDifference == 0) {
        timedate = `0 giây trước`
    }
    else if (secondsDifference != 0 && minutesDifference == 0 && hoursDifference == 0 && daysDifference == 0 && monthsDifference == 0 && yearsDifference == 0) {
        timedate = `${secondsDifference} giây trước`
    }
    else if (minutesDifference != 0 && hoursDifference == 0 && daysDifference == 0 && monthsDifference == 0 && yearsDifference == 0) {
        timedate = `${minutesDifference} phút trước`
    }
    else if (hoursDifference != 0 && daysDifference == 0 && monthsDifference == 0 && yearsDifference == 0) {
        timedate = `${hoursDifference} giờ trước`
    }
    else if (daysDifference != 0 && monthsDifference == 0 && yearsDifference == 0) {
        timedate = `${daysDifference} ngày trước`
    }
    else if (monthsDifference != 0 && yearsDifference == 0) {
        timedate = `${monthsDifference} tháng trước`
    }
    else if (yearsDifference != 0) {
        timedate = `${yearsDifference} năm trước`
    }

        return timedate;
    }
    
    handleOnkeyDown = async (e) => {
        if (e.keyCode === 13 || e.keyCode === "Enter") {
            await this.handleComment();
        }
    }

    render ()
    {
        let { listComment } = this.state;
        return (
            
            <div className={this.state.opensee === true ? 'post-cs see' : 'post-cs'}>
                <div className=''>Bình luận bài viết: </div>
                
                {listComment && !isEmpty(listComment) && listComment.map((item, index) => {
                    return (
                        <div className={this.state.opensee === false ? 'cmt-p cmt-p-see' : 'cmt-p'}>
                    <div className='post-comment-content'>
                    <div className='comment-main'>
                        <img src={item.User.image} />
                        <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                            <div className='name'>{item.User.fullName }</div>
                                            <div className='comment'>{ item.comment}</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>{this.timecreated(item.updatedAt)} </span> <span><b>Thích</b></span> <span onClick={() => this.handleChangeKey(item.id)}><b><label for="texxt">Trả lời</label></b></span>
                            </div>
                        </div>
                                    <div className='removecomment'><span
                                    onClick={() => this.removeComment(item.id)}
                                    >x</span></div>

                                </div>
                                <RepComment commentId={item.id}
                                    handleChangeKey={this.handleChangeKey}
                                    update={ this.state.update} />
                    </div>
                </div>
                    )
                })}
            {listComment && !isEmpty(listComment) && <span className='open-close' onClick={() => this.openSee()}><i>{ this.state.opensee === true ? 'Ẩn bớt' : 'Xem thêm'} </i></span>}
                
                <div className='text-comment'>
                    <input type='text' id="texxt" value={this.state.comment_input}
                        onKeyDown={(event) => this.handleOnkeyDown(event)}
                        onChange={(event) => this.handleOnchangeInput(event, "comment_input")}
                    />
                    <i onClick={() => this.handleComment()} class="fas fa-share"></i>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Commnent ));
