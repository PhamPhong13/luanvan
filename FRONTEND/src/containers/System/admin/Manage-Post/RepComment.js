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

    render ()
    {
        let { listRepComments } = this.state;
        return (
            <div className='comment-rep'>
                {listRepComments && !isEmpty(listRepComments) && 
                    listRepComments.map((item, index) => {
                        return (
                            <li>
                        <img src={item.User.image} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                        <div className='name'>{ item.User.fullName}</div>
                                        <div className='comment'>{ item.repcomment}</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                        <span>{ this.timecreated(item.updatedAt)}</span> <span><b>Thích</b></span> <label for="texxt"><span onClick={() => this.handleOnchangeKey()}><b>Trả lời</b></span></label>
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
