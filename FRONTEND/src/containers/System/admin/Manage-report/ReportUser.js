import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./manage.scss";
import { FormattedMessage } from 'react-intl';
import {getallreport } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { get, isEmpty } from 'lodash';
import ReactPaginate from 'react-paginate';

class ReportUser extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listreport: [],
            reportNew: 0,
            reportOld: 0,
        }
    }

    async componentDidMount() {
        await this.getallreports();
    }

    getallreports = async () => {
        let res = await getallreport("repcomment", "S1");
        console.log(res);
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listreport: res.data,
                reportNew: res.totalPages,
            })
        }
    }

    

getday = (date) => {
    let dateTime = new Date(date);

    // Mảng chứa các tên của các ngày trong tuần
    let daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // Lấy ngày trong tuần (từ 0 đến 6, 0 là Chủ Nhật, 1 là Thứ Hai, và cứ tiếp tục)
    let dayIndex = dateTime.getDay();
    let dayOfWeek = daysOfWeek[dayIndex];

    // Lấy giờ, phút, giây
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds();

    // Chuỗi kết quả
    let day = `${dayOfWeek} - ${dateTime.toLocaleDateString()} ${hours}:${minutes}:${seconds}`;
    return day;
}

    render ()
    {
        let { listreport, reportNew } = this.state;
        return (
            <>
                <title>
                    Báo cáo người dùng                    
                </title>

                <div className='container report'>
                    <div className='title'>Danh sách người dùng báo cáo</div>

                    <div className='report-content'>
                        <div className='listreportnew'>Danh sách vừa báo cáo: </div>
                        {listreport && listreport.map((item) => {
                            return (
                                <div className='item'>
                                    <div className='name'>{item.userreport && item.userreport.fullName}
                                        <span>thời gian lúc: {this.getday(item.createdAt)} báo cáo bởi</span>
                                        {item.user && item.user.fullName}
                                    </div>
                                    <div className='action'>
                                        <div className='btn btn-primary'>Xem</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='ReactPaginate mt-2'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="sau >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={reportNew}
                            pageCount={reportNew}
                            previousLabel="< trước"
                            renderOnZeroPageCount={null}
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            containerClassName='pagination'
                            activeClassName='active'
                            marginPagesDisplayed={10}
                        />
                    </div>
                    </div>
                    <div className='report-content'>
                        <div className='listreportnew'>Danh sách tài khoản bị khóa: </div>
                        {listreport && listreport.map((item) => {
                            return (
                                <div className='item'>
                                    <div className='name'>{item.userreport && item.userreport.fullName}
                                        <span>thời gian lúc: {this.getday(item.createdAt)} báo cáo bởi</span>
                                        {item.user && item.user.fullName}
                                    </div>
                                    <div className='action'>
                                        <div className='btn btn-primary'>Xem</div>
                                    </div>
                                </div>
                            )
                        })}
                        
                        <div className='ReactPaginate mt-2'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="sau >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={5}
                            previousLabel="< trước"
                            renderOnZeroPageCount={null}
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            containerClassName='pagination'
                            activeClassName='active'
                            marginPagesDisplayed={10}
                        />
                    </div>
                    </div>
                </div>
                
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ReportUser ));
