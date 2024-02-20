import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {createcomment, getAllcomment, deletecomment } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty, result } from 'lodash';

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
            listComment: []
        }
    }

    async componentDidMount() {

        this.setState({
            postId: this.props.match.params.id,
            user: this.props.user,
            key: "comment"
        })

        await this.getAllcomments()
    }

    getAllcomments = async () => {
        let res = await getAllcomment()
        let reverse = res.data.reverse()
        this.setState({
            listComment: reverse
        })
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

    async componentDidUpdate(prev) {
        if (prev.listComment!== this.props.listComment) {
            await this.getAllcomments();
            this.setState({
            key: "comment"

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
            }
        }
    }

    removeComment = async (id) => { 
        let res = await deletecomment(id);
        if (res && res.errCode === 0) {
                    await this.getAllcomments();
                }
    }
    
    handleChangeKeyComment = () => { 
        this.setState({
            key: "repcomment"
        })
    }
    checkInputComment = (comment) => {
        return comment.length <= 0 ? false : true
    }
    render ()
    {
        console.log(this.state)
        let {listComment} = this.state
        return (
            
            <div className={this.state.opensee === true ? 'post-cs see' : 'post-cs'}>
                <div className=''>Bình luận bài viết: </div>
                
                {listComment && !isEmpty(listComment) && listComment.map((item, index) => {
                    return (
                        <div className={this.state.opensee === false ? 'cmt-p cmt-p-see' : 'cmt-p'}>
                    <div className='post-comment-content'>
                    <div className='comment-main'>
                        <img src={avatar} />
                        <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                            <div className='name'>{item.User.fullName }</div>
                                            <div className='comment'>{ item.comment}</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span onClick={() => this.handleChangeKeyComment()}><b><label for="texxt">Trả lời</label></b></span>
                            </div>
                        </div>
                                    <div className='removecomment'><span
                                    onClick={() => this.removeComment(item.id)}
                                    >x</span></div>

                    </div>
                        <div className='comment-rep'>
                        <li>
                        <img src={avatar} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>
                                </li>
                        </div>
                    </div>
                </div>
                    )
                })}
            {listComment && !isEmpty(listComment) && <span className='open-close' onClick={() => this.openSee()}><i>{ this.state.opensee === true ? 'Ẩn bớt' : 'Xem thêm'} </i></span>}
                
                <div className='text-comment'>
                    <input type='text' id="texxt" value={this.state.comment_input}
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
