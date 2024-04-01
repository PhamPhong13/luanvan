import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./manage.scss";
import { FormattedMessage } from 'react-intl';
import {getallreport , getpostById, sendEmailReport, updatereport} from "../../../../services/userService"

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
            listreportold: [],
            reportNew: 0,
            reportOld: 0,
            openModal: false,
            listuserreport: [],
            openloading: false,
            
        }
    }

    async componentDidMount() {
        await this.getallreports();
        await this.getallreportolds();
    }

    getpost = async (id) => {
        let res = await getpostById(id);
        if (res && res.errCode === 0) {
            return res.data
        }
        return null;
    }

    getallreports = async () => {
        let res = await getallreport("repcomment", "S1");
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listreport: res.data,
                reportNew: res.totalPages,
            })
        }
    }

    getallreportolds = async () => {
        let res = await getallreport("repcomment", "S4");
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listreportold: res.data,
                reportOld: res.totalPages,
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

    handleOpenModal = async (item) => {
        this.setState({
            openModal: !this.state.openModal, 
            listuserreport: item
        })
        
    }

    handleCloseModal = async () => {
        this.setState({
            openModal: !this.state.openModal,
            listuserreport:[]
        })
    }

    handleReport = async (item) => {
        let post = await this.getpost(item.postId)
        this.setState({
            openloading: true
        })
        let res = await sendEmailReport({
            emailreport: item.userreport.email,
            userreport: item.userreport.fullName,
            comment: item.comment,
            content: item.content,
            post: item.userreport.fullName,
            time: this.getday(item.createdAt),
            image: item.image,
            post: post.name,
        })

        if (res && res.errCode === 0) {
            this.setState({
                openModal: !this.state.openModal,
                listuserreport: [],
                openloading: false
            })

            let update = await updatereport({
                id: item.id,
            })

            await this.getallreports();
            await this.getallreportolds();

            toast.success("Báo cáo người dùng thành công!");
        }
        else toast.error("Báo cáo người dùng không thành công!");

    }

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render ()
    {
        let { listreport, listreportold, reportNew,
            reportOld, openModal, listuserreport, openloading } = this.state;
        return (
            <>
                <title>
                    Báo cáo người dùng                    
                </title>

                <div className='manege report'>
                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/report-user")}><span><i className='fas fa-list'></i><FormattedMessage id="system.manage.manage-report-user"></FormattedMessage></span></li>
                        <li onClick={() => this.linkTouser("/system/report-post")}><span><i class="fas fa-book"></i><FormattedMessage id="system.manage.manage-report-post"></FormattedMessage></span></li>
                        </div>
                    </div>
                    <div className='right'>
                    <div className='title mt-5'>Danh sách người dùng báo cáo</div>
                    <div className='list-user mt-5'>
                            <div className='table-list'>
                        <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th scope="col" className='stt'>STT</th>
                        <th scope="col"><FormattedMessage id="key.fullname"></FormattedMessage></th>
                        <th scope="col" className='datereport'>Ngày báo cáo</th>
                        <th scope="col" className='phone'>Người báo cáo</th>
                        <th scope="col"><FormattedMessage id="key.action"></FormattedMessage></th>
                        </tr>
                    </thead>
                        <tbody>
                            {listreport && listreport.length > 0 && listreport.map((item, index) => {
                                return (
                                        <tr>
                                        <td className='tdstt'><p>{ index + 1}</p></td>
                                        <td><p>{ item.userreport.fullName}</p></td>
                                        <td className='datereport'><p>{ this.getday(item.createdAt)}</p></td>
                                        <td><p>{ item.user.fullName}</p></td>
                                        <td className='action'>
                                            <p>
                                                <div className='btn btn-primary'
                                        onClick={() => this.handleOpenModal(item)}
                                        >Xem</div>
                                            </p>
                                        </td>
                                        </tr>
                                )
                            })}

                        
                    </tbody>
                    </table>
                            {listreport && listreport.length <= 0 &&
                                <div className='null'>
                                    Danh sách rổng!
                            </div>
                            }
                    </div>

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




                    
                        {openModal === true &&
                <div className='modal-report'>
                    <div className='content-rpt'>
                            <div className='title'>Nội dung báo cáo</div>
                            <div className='content-rpt-row'>
                                {listuserreport && <div className='listuserreport'>
                                            {listuserreport.user && listuserreport.user.fullName && <div className='name'>Người báo cáo: <b>{listuserreport.user.fullName  }</b></div>}
                                            <div className='name'>Ngày báo cáo: <b>{this.getday(listuserreport.createdAt)  }</b></div>
                                            <div className='name'>Nội dung bị báo cáo: <b>{listuserreport.content}</b></div>
                                            <div className='name'>Nội dung bình luận bị báo cáo: <b>{listuserreport.comment}</b></div>
                                            <div className='img'>
                                                <img src={ listuserreport.image} />
                                    </div>
                                    <div className='btn-submit'>
                                    <div className='btn btn-danger' >Xóa báo cáo</div>
                                    <div className='btn btn-primary' onClick={() => this.handleReport(listuserreport)}>Báo cáo</div>
                                    <div className='btn btn-secondary'  onClick={() => this.handleCloseModal()}>Hủy</div>
                                    </div>
                                </div>
                            }
                            </div>
                            
                         </div>   
                            
                </div>
                }

                {openloading === true && 
                <div className='loading'>
                    <div className='loading-content'>Đang xử lý...</div>
                </div>}
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
