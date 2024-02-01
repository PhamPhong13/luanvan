import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getAllAdmin, deleteAdmin } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
class ManageAdmin extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listAdmin: []
        }
    }

    async componentDidMount() {
        await this.getAllAdmins();
    }

    getAllAdmins = async () => {
        let res = await getAllAdmin();
        if (res && res.data.length > 0) {
            this.setState({
                listAdmin: res.data
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

    handleDeleteUser = async (id) => {
        let res = await deleteAdmin(id);
        if (res && res.errCode === 0) {
            await this.getAllAdmins();
                toast.success("Xóa nười dùng mới thành công!");
                
            }
            else toast.error("Xóa người dùng mới không thành công!");
    }

    render ()
    {

        let { listAdmin } = this.state;
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-admin"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.manage-admin"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text" placeholder={this.props.language === 'vi' ? "Tên người dùng": "User Name"} />
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
                        <th scope="col">STT</th>
                        <th scope="col"><FormattedMessage id="key.email"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.fullname"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.phone"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.position"></FormattedMessage></th>
                        <th scope="col"><FormattedMessage id="key.action"></FormattedMessage></th>
                        </tr>
                    </thead>
                        <tbody>
                            {listAdmin && listAdmin.length > 0 && listAdmin.reverse().map((item, index) => {
                                return (
                                        <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{ item.email}</td>
                                        <td>{ item.fullName}</td>
                                        <td>{ item.phone}</td>
                                        <td>{ this.props.language === 'vi' ? item.positionAdmin.valueVi: item.positionAdmin.valueEn}</td>
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
