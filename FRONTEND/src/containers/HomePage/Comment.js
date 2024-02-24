import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/user.jpg"
import top from "../../assets/top.png"
import { withRouter } from 'react-router';
import { getcommentById, createcomment, createrepcomment } from '../../services/userService';
import RepComment from './RepComment';
class Comment extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.id,
            comment: [],
            fullComment: false,
            commentkey: "comment",
            comment_input: "",
            userId: "",
            commentId: "",
            update: false
        }
    }


    async componentDidMount() {
        await this.getcomment();
    }

    getcomment = async () => {
        let res = await getcommentById(this.props.match.params.id);
        let reverse = res.data.reverse();
        this.setState({
            comment: reverse
        })
        this.getUser();
    }

    getUser = () => {
        if (this.props.userInfo) {
            this.setState({
                    userId: this.props.userInfo.id
                });
            
        }else {
                this.setState({
                    userId: '4'
                });
            }
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
    
    fullComment = () => {
        this.setState({
            fullComment: !this.state.fullComment
        })
    }


    handleComment = async () => {
        if (this.checkInputComment(this.state.comment_input) === true) {
            if (this.state.commentkey === 'comment') { 
                let res = await createcomment({
                    postId: this.state.postId,
                    userId: this.state.userId,
                    comment: this.state.comment_input,
                })
               if (res && res.errCode === 0) {
                    this.setState({
                        comment_input: '',
                    commentkey: 'comment'})
                    await this.getcomment();
                }
            }
            else {
                
                let res = await createrepcomment({
                    commentId: this.state.commentId,
                    userId: this.state.userId,
                    repcomment: this.state.comment_input,
                })
                if (res && res.errCode === 0) {
                    this.setState({
                        comment_input: '',
                        update: !this.state.update,
                    commentkey: 'comment'})
                }

            }
        }
    }

    handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    handleChangeKey = (id) => { 
        this.setState({
            commentkey: "repcomment",
            commentId: id
        })
    }

    checkInputComment = (comment) => {
        if (comment.lenght <= 0) {
            return false;
        }
        return true;
    }

    handleOnkeyDown = async (e) => {
        if (e.keyCode === 13 || e.keyCode === "Enter") {
            await this.handleComment();
        }
    }

    
    
    render ()
    {
        let { comment, fullComment } = this.state;
        console.log(this.props)

        return (
            <>
                <div>Bình luận bài viết: </div>
                <div className={fullComment === true ? 'cmt':'cmt cmt_s'}>
                    {comment && comment.length > 0 && comment.map((item, index) => {
                    return (
                        <div className='post-comment-content'>
                    <div className='comment-main'>
                        <img src={item.User.image}/>
                        <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                        <div className='name'>{ item.User.fullName}</div>
                                        <div className='comment'>{item.comment }</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>{ this.timecreated(item.updatedAt)} </span> <span><b>Thích</b></span> <span onClick={() => this.handleChangeKey(item.id)}><b><label for="texxt">Trả lời</label></b></span>
        
                        </div>
                        </div>
                    </div>

                            <RepComment commentId={item.id}
                                handleChangeKey={this.handleChangeKey}
                                update={this.state.update}
                            />

                </div>
                    )
                })}
                   {comment && comment.length <= 0 && "Hãy bình luận cho bài viết!"} 
                </div>
                
                
                {fullComment === false ? <div className='see_close'><span onClick={() => this.fullComment()}>Xem thêm</span></div> :
                <div className='see_close'><span onClick={() => this.fullComment()}>Ẩn bớt</span></div>}
                <div className='text-comment'>
                    <input type='text' id="texxt" value={this.state.comment_input}
                        onKeyDown={(event) => this.handleOnkeyDown(event)}
                        onChange={(event) => this.handleOnchangeInput(event, "comment_input")}
                    />
                    <i onClick={() => this.handleComment()} class="fas fa-share"></i>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Comment ));
