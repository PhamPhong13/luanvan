import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import {getrepcommentById, deleterepcomment, deletecomment, createrepcomment } from "../../../../services/userService"

import { withRouter } from 'react-router';

import avatar from "../../../../assets/340439352_964862588007237_5460541469979575194_n.jpg"
import { isEmpty } from 'lodash';
class RepComment extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            commentId: this.props.commentId,
            listRepComments: [],
            update: this.props.update
        }
    }

    async componentDidMount() {
        await this.getRepcomment();
        
    }

    getRepcomment = async () => {
        let res = await getrepcommentById(this.props.commentId)
        this.setState({
            listRepComments: res.data
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
        if (prev.update !== this.props.update) { 
            await this.getRepcomment();
        }
    }
    
    
    
    removeComment = async (id) => { 
        alert("Bạn có chắc rằng muốn xóa bình luận này không!");
        let res = await deleterepcomment(id);
        if (res && res.errCode === 0) {
            await this.getRepcomment();
        }
        
    }

    handleOnchangeKey = () => {
        this.props.handleChangeKey(this.props.commentId);
    }
    
    render ()
    {
        let { listRepComments } = this.state;
        return (
            <div className='comment-rep'>
                {listRepComments && !isEmpty(listRepComments) && 
                    listRepComments.map((item, index) => {
                        return (
                            <li>
                        <img src={avatar} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                        <div className='name'>{ item.User.fullName}</div>
                                        <div className='comment'>{ item.repcomment}</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <label for="texxt"><span onClick={() => this.handleOnchangeKey()}><b>Trả lời</b></span></label>
                            </div >
                                </div>
                                <div className='removecomment'><span onClick={() => this.removeComment(item.id)}>x</span></div>
                                </li>
                        )
                    })
}

                        
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( RepComment ));
