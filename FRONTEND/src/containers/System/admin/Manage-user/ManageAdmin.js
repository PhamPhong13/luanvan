import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getAllAdmin, deleteAdmin, getAdmin } from "../../../../services/userService"

import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

class ManageAdmin extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listAdmin: [],
            totalpage: 0,
        }
    }

    async componentDidMount() {
        await this.getuser("1");
    }

    getuser = async (page) => {
        let res = await getAdmin(page);
        if (res && res.data.length > 0) {
            this.setState({
                listAdmin: res.data,
                totalpage: res.totalPages
            })
        }
        else this.setState({
            listAdmin: []
        })
    }

    getAllUsers = async (page, word) => {

        let res = await getAllAdmin(page, word);
        if (res && res.data.length > 0) {
            this.setState({
                listAdmin: res.data,
                totalpage: res.totalPages
            })
        }
        else this.setState({
            listAdmin: []
        })
    }

    linkToAddAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/add-admin` );
        }
    }

    linkToEditAdmin = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/edit-admin/${id}` );
        }
    }

    handledeleteAdmin = async (id) => {
        let res = await deleteAdmin(id);
        if (res && res.errCode === 0) {
            toast.success("Xóa nười dùng mới thành công!");
            await this.getAllUsers("1");
        }
        else toast.error("Xóa người dùng mới không thành công!");
    }


    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
            this.getuser("1");
        }
        else {
            await this.getAllUsers("1", event.target.value);
            }

        }

    handlePageClick = async (event) => {
        await this.getAllUsers(event.selected + 1);
     }

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }
    render ()
    {

        let { listAdmin, totalpage } = this.state;
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-admin"></FormattedMessage>
                </title>
                <div className='manage'>

                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-admin")}><span><i className='fas fa-user-tie'></i><FormattedMessage id="system.manage.manage-admin"></FormattedMessage></span></li>
                            <li ><span><i className='fas fa-user'></i><FormattedMessage id="system.manage.manage-user"></FormattedMessage></span>
                                <ul className='ul-link'>
                                    <li onClick={() => this.linkTouser("/system/manage-user")}><span>Quản lý hội viên</span></li>
                                    <li onClick={() => this.linkTouser("/system/examine")}><span>Duyệt hội viên</span></li>
                            </ul>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='title'><FormattedMessage id="system.manage.manage-admin"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                onChange={(event) => this.handleOchangeToSearch(event)}
                                placeholder='Nhập để tìm kiếm'
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='btn-add'>
                        <div className='btn btn-primary'
                            onClick={() => this.linkToAddAdmin()}
                        >
                            + Thêm tài khoản
                        </div>
                    </div>

                        <div className='list-user'>
                            <div className='table-list'>
                        <table className="table table-striped table-bordered">
                    <thead>
                                <tr>
                                    
                        <th scope="col" className='stt'>STT</th>
                        <th scope="col"><FormattedMessage id="key.email"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.fullname"></FormattedMessage></th>
                        <th scope="col" className='phone'><FormattedMessage id="key.phone"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.position"></FormattedMessage></th>
                        <th scope="col">Nhiệm kỳ</th>
                        <th scope="col"><FormattedMessage id="key.action"></FormattedMessage></th>
                        </tr>
                    </thead>
                        <tbody>
                            {listAdmin && listAdmin.length > 0 && listAdmin.map((item, index) => {
                                return (
                                        <tr>
                                        <td className='tdstt'><p>{ index + 1}</p></td>
                                        <td><p>{ item.email}</p></td>
                                        <td><p>{ item.fullName}</p></td>
                                        <td className='tdphone'><p>{ item.phone}</p></td>
                                        <td><p>{ this.props.language === "vi" ? item.positionAdmin.valueVi : item.positionAdmin.valueEn}</p></td>
                                        <td><p>{ item.tunure}</p></td>
                                        <td className='action'>
                                            <p>
                                                <div className='btn btn-warning btn-edit'
                                            onClick={() => this.linkToEditAdmin(item.id)}
                                            ><FormattedMessage id="key.edit"></FormattedMessage></div>
                                            <div className='btn btn-danger btn-delete'
                                            onClick={() => this.handledeleteAdmin(item.id)}
                                            ><FormattedMessage id="key.delete"></FormattedMessage></div>
                                            </p>
                                        </td>
                                        </tr>
                                )
                            })}

                            {listAdmin && listAdmin.length <= 0 &&
                                <div className='null'>
                                    Danh sách rổng!
                            </div>
                            }
                        
                    </tbody>
                    </table>
                    </div>

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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ManageAdmin ));
