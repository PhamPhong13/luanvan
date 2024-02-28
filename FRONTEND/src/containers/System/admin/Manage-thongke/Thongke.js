import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "./manage.scss";
import { withRouter } from "react-router";
import { getpost, getAllconnect } from "../../../../services/userService";
class Thongke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listpost: [],
      connect: '',
      selectltc: "Tuần"
    };
  }

  async componentDidMount() {
    await this.getConnect();
    await this.getpost();
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
  let res = await getpost("ALL");
  let result = [];
  res.data.map((item, index) => {
    if (this.getpostbyweek(item.createdAt)) {
      result.push(item);
    }
  })
  let sort = result.sort((a, b) => a.count - b.count) // Thay đổi ở đây
  .reverse().slice(0, 5); // Sau khi sắp xếp tăng dần, đảo ngược để thành sắp xếp giảm dần
  console.log(sort);
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

    getpostbymonth = (dateString) => {// Chuỗi thời gian cần kiểm tra
      // Chuyển đổi chuỗi thời gian thành đối tượng thời gian
      var dateObject = new Date(dateString);

      // Xác định thời điểm đầu tiên của tháng trước
      var today = new Date();
      var firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      // Xác định thời điểm cuối cùng của tháng trước
      var lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

      // Kiểm tra xem thời điểm đó có nằm trong tháng trước không
      var isInLastMonth = dateObject >= firstDayOfLastMonth && dateObject <= lastDayOfLastMonth;

      // Hiển thị kết quả
      return isInLastMonth;
    }

    getpostbyyear = (dateString) => { // Chuỗi thời gian cần kiểm tra
    // Chuyển đổi chuỗi thời gian thành đối tượng thời gian
    var dateObject = new Date(dateString);

    // Xác định thời điểm đầu tiên của năm trước
    var today = new Date();
    var firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1);

    // Xác định thời điểm cuối cùng của năm trước
    var lastDayOfLastYear = new Date(today.getFullYear() - 1, 11, 31);

    // Kiểm tra xem thời điểm đó có nằm trong năm trước không
    var isInLastYear = dateObject >= firstDayOfLastYear && dateObject <= lastDayOfLastYear;

    // Hiển thị kết quả
      return isInLastYear;
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


  render() {
    let { selectltc, connect, listpost } = this.state;
    return (
      <>
        <title>
          <FormattedMessage id="system.thongke" />
        </title>
        <div className="container thongke">
          <div className="title"><FormattedMessage id="system.thongke" /></div>
          <div className="line"> ----------------------------- . -----------------------------</div>
          <div className="ltc">
            Lược truy cập vào hệ thống<select > {selectltc}
              <option onClick={() => this.ltc("Tuần")}>Tuần </option>
              <option onClick={() => this.ltc("Tháng")}>Tháng </option>
              <option onClick={() => this.ltc("Năm")}>Năm </option>
            </select>
          </div>
          <div className="ltc-value">
          {connect}
          </div>


          <div className="ltc">
            Top bài viết có lược truy cập nhiều nhất
          </div>

          <div className="post-value">
            {listpost && listpost.slice(0, 5).map((item, index) => {
              return (
                <div className="ltc-value-item" key={index} onClick={() => this.linkToInforPost(item.id)}>
                  <img src={ item.image} />
                  <div className="name">{item.name}</div>
                </div>
              );
            })}
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
  connect(mapStateToProps, mapDispatchToProps)(Thongke)
);
