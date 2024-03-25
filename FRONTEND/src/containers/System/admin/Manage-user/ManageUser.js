import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getAllUser, deleteUser,getUser } from "../../../../services/userService"

import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
class ManageUser extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listAdmin: [],
            totalpage: 0,
        }
    }

    async componentDidMount() {
        await this.getuser();
        /* await this.getAllUsers(); */
    }

    getuser = async (page) => {
        let res = await getUser(page);
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

        let res = await getAllUser(page, word);
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
            this.props.history.push( `/system/add-user` );
        }
    }

    linkToEditAdmin = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/edit-user/${id}` );
        }
    }

    handleDeleteUser = async (id) => {
        let res = await deleteUser(id);
        if (res && res.errCode === 0) {
            toast.success("Xóa nười dùng mới thành công!");
            await this.getAllUsers();
        }
        else toast.error("Xóa người dùng mới không thành công!");
    }

    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
            this.getuser();
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
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-user"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.manage-user"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Tên người dùng" : "User Name"}
                                onChange={(event) => this.handleOchangeToSearch(event)}
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
                        <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col"><FormattedMessage id="key.email"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.fullname"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.phone"></FormattedMessage></th>
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
                                        <td className='action'>
                                            <div className='btn btn-warning btn-edit'
                                            onClick={() => this.linkToEditAdmin(item.id)}
                                            ><FormattedMessage id="key.edit"></FormattedMessage></div>
                                            <div className='btn btn-danger btn-delete'
                                            onClick={() => this.handleDeleteUser(item.id)}
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ManageUser ));
