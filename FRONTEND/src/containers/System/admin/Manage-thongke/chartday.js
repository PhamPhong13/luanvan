import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "./manage.scss";
import { withRouter } from "react-router";
import {  getAllconnect, getconnecttochart} from "../../../../services/userService";
class ChartDay extends Component {
  constructor(props) {
    super(props);
      this.state = {
          listDay: [],
          listChart: [],
          listCount: [],
          chart: [],
          maxcount: 0
    };
  }

    async componentDidMount() {
        await this.getconnect();
        await this.getseventochart();
        this.getSeventDay();
        this.buidChart();
        
    }
    

    getseventochart = async () => {
      let res = await getconnecttochart();
      if (res && res.errCode === 0) {
        this.setState({
          listChart: res.data,
        });
        }
        let maxCount = this.state.listChart[0].count;
        
        for (let i = 1; i < this.state.listChart.length; i++) {
        if (this.state.listChart[i].count > maxCount) {
            maxCount = this.state.listChart[i].count; // Cập nhật giá trị lớn nhất nếu tìm thấy giá trị lớn hơn
        }
    }
        const roundedNumber = Math.ceil(maxCount / 10) * 10;
        const numberOfSegments = 10;
        this.setState({
            maxcount: roundedNumber
        })
        const step = roundedNumber / numberOfSegments;
        let current = 0;

        let listcount = [];
        for (let i = 0; i < numberOfSegments; i++) {
            const end = current + step;
            listcount.push(end);
            current = end;
        }

        let listC = listcount.reverse();
        this.setState({
            listCount: listC
        })
  }
   getSeventDay = () => {
    const today = new Date(); // Lấy ngày hiện tại
    const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000); // Lấy ngày 7 ngày trước

    const formattedDates = [];

    const options = {
        weekday: 'long', // Hiển thị ngày trong tuần dưới dạng "Thứ..."
        year: 'numeric', // Hiển thị năm dưới dạng bốn chữ số
        month: 'numeric', // Hiển thị tháng dưới dạng số
        day: 'numeric' // Hiển thị ngày dưới dạng số
    };

    const locale = 'vi-VN'; // Đặt ngôn ngữ thành tiếng Việt

    for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
        const formattedDate = date.toLocaleString(locale, options); // Sử dụng ngôn ngữ và tùy chọn định dạng
        formattedDates.push(formattedDate);
    }
    this.setState({
        listDay: formattedDates
    })
    console.log(this.state);
}


    
    getconnect = async () => {
        let res = await getAllconnect();
        console.log(res);
    }

    buidChart = () => {
        console.log(this.state);
        const today = new Date(); // Lấy ngày hiện tại
        const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000); // Lấy ngày 7 ngày trước

        const formattedDates = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
            const formattedDate = date.toLocaleDateString('en-US'); // Lấy ngày/tháng/năm
            let day = this.fixDay(formattedDate); 
            formattedDates.push(`${day}`);
            }
        let chart = [];

        formattedDates.forEach((item) => {
            let lag = false;
            let count = 0;
            for (let i = 0; i < this.state.listChart.length; i++) {
                if (item === this.state.listChart[i].date) {
                    lag = true;
                    count = this.state.listChart[i].count;
                    break;
                }
            }
            if (lag === true) {
                chart.push(count); // Thêm giá trị count nếu ngày tồn tại trong listChart
            }
            else chart.push(0); // Thêm giá trị 0 nếu ngày không tồn tại trong listChart
            
        });

        this.setState({
            chart: chart
        })
    }

    fixDay = (date) => {
       const [month, day, year] = date.split('/');

        // Tạo chuỗi ngày mới
        const newDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return newDateString;
    }

  
  render() {
   let { listDay , listCount, chart, maxcount} = this.state;
    return (
        <>
            <div className="chart">
                <div className="chart-content">
                    <div className="m-3"><b>Biểu đồ thể hiện lược truy cập trong 1 tuần qua</b></div>
                    <div className="top">
                        <div className="chart-content-left">
                            {listCount && listCount.map((item) => {
                                return (
                                    <li>{item } </li>
                                    )
                                })}
                                <li>0 </li>
                        </div>
                        <div className="chart-content-center">
                            {chart && chart.map((item, index) => (
                                <li key={index}>
                                    <div className="chart-item" style={{ height: `calc(100% * ${item} / ${maxcount})` }}><span>{ item}</span></div>
                                </li>
                            ))}
                        </div>

                   </div>
                    <div className="bottom">
                        {listDay && listDay.map((item) => {
                            return (
                                <li>{item }</li>
                            )
                        })}
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
  connect(mapStateToProps, mapDispatchToProps)(ChartDay)
);
