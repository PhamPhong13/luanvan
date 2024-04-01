import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getAllnhiemky, deletenhiemky, getuserbystatus } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { isEmpty } from 'lodash';
class Examine extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listCat: [],
            totalpage: 0
        }
    }

    async componentDidMount() {
        await this.getuser(1, '', 0);
    }

    getuser = async (page, word) => {
        let res = await getuserbystatus(page, word, 0);
        if (res && res.errCode === 0) {
            this.setState({
                listCat: res.data,
                totalpage: res.totalPages
        })
        }
        else this.setState({
            listCat: []
        })
    }

   

    
    linkToEditExamUser = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/examimeuser/${id}` );
        }
    }

    handleDeleteUser = async (id) => {
        let res = await deletenhiemky(id);
        if (res && res.errCode === 0) {
            await this.getuser();
                toast.success("Xóa nhiệm kỳ thành công!");
                
            }
            else toast.error("Xóa nhiệm kỳ không thành công!");
    }

    // bỏ dấu trong chuổi


    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
            this.getuser(1, '',0);
        }
        else {
            await this.getuser("1", event.target.value, 0);
        }
        
    }

    handlePageClick = async (event) => {
        await this.getuser(event.selected + 1, '', 0);
     }
    
    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render ()
    {
        let { listCat, totalpage } = this.state;
        return (
            <>
                <title>
                    Duyệt yêu cầu người dùng
                </title>
                <div className=' manage'>
                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-admin")}><span><i className='fas fa-user-tie'></i><FormattedMessage id="system.manage.manage-admin"></FormattedMessage></span></li>
                            <li ><span><i className='fas fa-user'></i><FormattedMessage id="system.manage.manage-user"></FormattedMessage></span>
                                <ul className='ul-link'>
                                    <li onClick={() => this.linkTouser("/system/manage-user")}><i className='fas fa-user'></i><span>Quản lý hội viên</span></li>
                                    <li onClick={() => this.linkTouser("/system/examine")}><i className='fas fa-check'></i><span>Duyệt hội viên</span></li>
                            </ul>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
<div className='title'>Duyệt yêu cầu người dùng</div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm kiếm" : "Type to search"}
                                 onChange={(event) => this.handleOchangeToSearch(event)} 
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                        <div className='list-user'>
                             <div className='table-list'>
                        <table className="table table-striped table-bordered">
                    <thead>
                                <tr>
                                    
                        <th scope="col" className='stt'>STT</th>
                        <th scope="col">Email </th>
                        <th scope="col">Họ tên </th>
                        <th scope="col"><FormattedMessage id="key.action"></FormattedMessage></th>
                        </tr>
                    </thead>
                        <tbody>
                            {listCat && listCat.length > 0 && listCat.map((item, index) => {
                                return (
                                        <tr>
                                        <td className='tdstt'><p>{ index + 1}</p></td>
                                        <td><p>{item.email}</p></td>
                                        <td><p>{item.fullName}</p></td>
                                        <td className='action examine'>
                                            <p>
                                                <div className='btn btn-primary'
                                                onClick={() => this.linkToEditExamUser(item.id)}
                                            ><FormattedMessage id="key.see"></FormattedMessage></div>
                                            </p>
                                        </td>
                                        </tr>
                                )
                            })}

                            {listCat && listCat.length <= 0 &&
                                <div className='null'>
                                    Danh sách rổng!
                            </div>
                            }
                        
                    </tbody>
                    </table>
                    </div>
                   </div>
                    </div>

                    
{/* 
                    <div className='cat'>
                        {
                            listCat && isEmpty(listCat) && <span>Danh sách rổng!</span>
                        }
                        {
                            listCat && !isEmpty(listCat) && listCat.map((item, index) => {
                                return (

                                    <div className='cat-content'>
                            <div className='content-left'>
                               {item.fullName}
                            </div>
                            <div className='content-right'>
                                
                                            <div className='btn btn-primary'
                                                onClick={() => this.linkToEditExamUser(item.id)}
                                            ><FormattedMessage id="key.see"></FormattedMessage></div>
                                           
                            </div>
                        </div>
                                )
                            })
                        }
                        
                        {listCat && !isEmpty(listCat) &&
                        <div className='ReactPaginate mt-2'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="sau >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={totalpage}
                            pageCount={totalpage}
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
                        }
                        


                        
                    </div> */}

                    
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Examine ));
