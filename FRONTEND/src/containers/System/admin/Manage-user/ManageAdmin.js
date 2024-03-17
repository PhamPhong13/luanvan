import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getAllAdmin, deleteAdmin, getAdmin } from "../../../../services/userService"

import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
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
        console.log(res)
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

    render ()
    {

        let { listAdmin, totalpage } = this.state;
        console.log(listAdmin)
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-admin"></FormattedMessage>
                </title>
                <div className='container manage'>

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

                    <div className='table-list'>
                        <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col"><FormattedMessage id="key.email"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.fullname"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.phone"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.position"></FormattedMessage></th>
                        <th scope="col">Nhiệm kỳ</th>
                        <th scope="col"><FormattedMessage id="key.action"></FormattedMessage></th>
                        </tr>
                    </thead>
                        <tbody>
                            {listAdmin && listAdmin.length > 0 && listAdmin.map((item, index) => {
                                return (
                                        <tr>
                                        <td>{ item.email}</td>
                                        <td>{ item.fullName}</td>
                                        <td>{ item.phone}</td>
                                        <td>{ this.props.language === "vi" ? item.positionAdmin.valueVi : item.positionAdmin.valueEn}</td>
                                        <td>{ item.tunure}</td>
                                        <td className='action'>
                                            <div className='btn btn-warning btn-edit'
                                            onClick={() => this.linkToEditAdmin(item.id)}
                                            ><FormattedMessage id="key.edit"></FormattedMessage></div>
                                            <div className='btn btn-danger btn-delete'
                                            onClick={() => this.handledeleteAdmin(item.id)}
                                            ><FormattedMessage id="key.delete"></FormattedMessage></div>
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
