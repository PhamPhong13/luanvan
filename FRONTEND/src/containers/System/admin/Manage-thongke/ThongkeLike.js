import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "./manage.scss";
import { withRouter } from "react-router";
import { getpost, getAllconnect, getlikepostcount } from "../../../../services/userService";

import Chartday from "./chartday";
class ThongkeLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listpost: [],
      connect: '',
      selectltc: "Tuần",
      listLike: []
    };
  }

  async componentDidMount() {
    await this.getConnect();
    await this.getpost();
    await this.getlikepost();
  }

  getlikepost = async () => { 
    let res = await getlikepostcount();
    if (res && res.errCode === 0 && res.data && res.data.length > 0) {
      this.setState({
        listLike: res.data
      })
    }
    else this.setState({
      listLike: []
    })
  }
  
  getConnect = async () => {
    let res = await getAllconnect();
    let result = []
    if (res && res.errCode === 0 && res.data.length > 0) {
      if (this.state.selectltc === 'Tuần') {
        res.data.map((item, index) => {
          if (this.getpostbyweek(item.createdAt)) {
            result.push(item);
          }
        })
      }
      else 
        if (this.state.selectltc === 'Tháng') {
        res.data.map((item, index) => {
          if (this.getpostbymonth(item.createdAt)) {
            result.push(item);
          }
        })
        }
      else if (this.state.selectltc === 'Năm') {
        res.data.map((item, index) => {
          if (this.getpostbyyear(item.createdAt)) {
            result.push(item);
          }
        })
      }
      
    }
    this.setState({
      connect: result.length
    })
  }
    
    getpost = async () => {
      let res = await getpost("ALL", 1);
      let result = [];
      res.data.map((item, index) => {
        if (this.getpostbyweek(item.createdAt)) {
        }
        result.push(item);
      })
    let sort = result.sort((a, b) => a.count - b.count) // Thay đổi ở đây
    .reverse().slice(0, 5); // Sau khi sắp xếp tăng dần, đảo ngược để thành sắp xếp giảm dần
    this.setState({
      listpost: sort
  })
}

  

    getpostbyweek = (dateString) => {// Chuỗi thời gian cần kiểm tra
      // Chuyển đổi chuỗi thời gian thành đối tượng thời gian
      var dateObject = new Date(dateString);

      // Xác định thời điểm đầu tiên của tuần vừa qua
      var today = new Date();
      var firstDayOfLastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

      // Kiểm tra xem thời điểm đó có nằm trong tuần vừa qua không
      var isInLastWeek = dateObject >= firstDayOfLastWeek && dateObject <= today;

      return isInLastWeek;
    }

 getpostbymonth = (dateString) => {
  // Chuỗi thời gian cần kiểm tra
  var dateObject = new Date(dateString);

  // Xác định thời điểm đầu tiên của tháng hiện tại
  var today = new Date();
  var firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Xác định thời điểm cuối cùng của tháng hiện tại
  var lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Kiểm tra xem thời điểm đó có nằm trong tháng hiện tại không
  var isInThisMonth = dateObject >= firstDayOfThisMonth && dateObject <= lastDayOfThisMonth;

  // Hiển thị kết quả
  return isInThisMonth;
}


   getpostbyyear = (dateString) => { 
    // Chuỗi thời gian cần kiểm tra
    var dateObject = new Date(dateString);

    // Xác định thời điểm đầu tiên của năm năm nay
    var today = new Date();
    var firstDayOfThisYear = new Date(today.getFullYear(), 0, 1);

    // Kiểm tra xem thời điểm đó có nằm trong khoảng từ đầu năm đến hiện tại không
    var isInThisYear = dateObject >= firstDayOfThisYear && dateObject <= today;

    // Hiển thị kết quả
    return isInThisYear;
}


    getpostbyday = (dateString, day) => {// Chuỗi thời gian cần kiểm tra
    // Chuyển đổi chuỗi thời gian thành đối tượng thời gian
    var dateObject = new Date(dateString);

    // Xác định thời điểm của hôm qua
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - day);
    yesterday.setHours(0, 0, 0, 0); // Đặt giờ về 0 giờ để so sánh với thời điểm của hôm qua

    // Xác định thời điểm của ngày hiện tại
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 0 giờ để so sánh với thời điểm của hôm qua

    // Kiểm tra xem thời điểm đó có nằm trong ngày hôm qua không
    var isInYesterday = dateObject >= yesterday && dateObject < today;

    // Hiển thị kết quả
      return isInYesterday;
  }

  lct = (id) => {
    this.setState({
      selectltc: id
    })
    this.getConnect();
  }

  linkToInforPost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/infor-post/${id}` );
        }
    }

  ltc = async(event) => {
    this.setState({
      selectltc: event.target.value
    })

    await this.getConnect();
  }

  linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }
  
  render() {
    let { selectltc, connect, listpost, listLike } = this.state;
    return (
      <>
        <title>
          <FormattedMessage id="system.thongke" />
        </title>
        <div className="manage">
          <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-thongke")}><span><i class="fas fa-chart-line"></i>Thống kê bài viết</span></li>
                            <li onClick={() => this.linkTouser("/system/manage-thongke-like")}><span><i class="fas fa-thumbs-up"></i>Thống kê lược thích</span>
                            </li>
                        </div>
                    </div>
          <div className="right">
            <div className="thongke">
          <div className="title mt-0 pt-3">Thống kê yêu thích</div>
          <div className="ltc">
            Lược truy cập vào hệ thống
            <select onChange={(event) => this.ltc(event)}> {selectltc}
              <option >Tuần </option>
              <option >Tháng </option>
              <option>Năm </option>
            </select>
          </div>
          <div className="ltc-value">
          {connect}
              </div>
              
          <div className="thongke-content">
          <Chartday />


          <div className="post-value">
          <div className="">
           <b> Bài viết có lược thích nhiều nhất</b>
          </div>
            {listLike && listLike.map((item, index) => {
              return (
                <div className="ltc-value-item" key={index} onClick={() => this.linkToInforPost(item.Post.id)}>
                  <img src={ item.Post.image} />
                  <div className="name">{item.Post.name}</div>
                </div>
              );
            })}
          </div>
              </div>

          


          {/*  */}
          
        </div>
          </div>
        </div>
        
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ThongkeLike)
);