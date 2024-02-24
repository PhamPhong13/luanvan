import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "./manage.scss";
import { withRouter } from "react-router";
import { getAllpost } from "../../../../services/userService";
class Thongke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listpost: [],
    };
  }

  async componentDidMount() {
    await this.getpost();
    }
    
    getpost = async () => {
        let res = await getAllpost();
      let result = [];
      res.data.map((item, index) => {
        if (this.getpostbyday(item.createdAt, 3)) {
          result.push(item);
        }
      })
      console.log(result)
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


  render() {
    return (
      <>
        <title>
          <FormattedMessage id="system.thongke" />
        </title>
        <div className="container thongke">
          <div className="title"><FormattedMessage id="system.thongke" /></div>
        </div>
        
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Thongke)
);
