import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/user.jpg"
import top from "../../assets/top.png"
import { withRouter } from 'react-router';
import { getrepcommentById } from '../../services/userService';
class RepComment extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            commentId: this.props.commentId,
            comment: [],
            update: this.props.update
            
        }
    }


    async componentDidMount() {
        await this.getrepcomment();
    }
        async componentDidUpdate(prev) {
                if (prev.update !== this.props.update) { 
                    await this.getrepcomment();
                }
            }

    getrepcomment = async () => {
        let res = await getrepcommentById(this.props.commentId);
        this.setState({
            comment: res.data
        })
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

    handleOnchangeKey = () => {
        this.props.handleChangeKey(this.props.commentId);
    }
    
    render ()
    {
        let { comment } = this.state;

        return (
            <>
                {comment && comment.map((item, index) => {
                    return (
                        <div className='repcomment'>
                            <img src={item.User.image} />
                            <div className='comment-main-content'>
                                <div className='comment-main-content-top'>
                                    <div className='name'>{ item.User.fullName}</div>
                                    <div className='comment'>{ item.repcomment}</div>
                                </div>
                                <div className='comment-main-content-bottom'>
                                    <span> {this.timecreated(item.updatedAt)} </span> <span><b>Thích</b></span> <span onClick={() => this.handleOnchangeKey()}><b><label for="texxt">Trả lời</label></b></span>
        
                    </div>
                </div>
            </div>
                    )
                })}
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( RepComment ));
