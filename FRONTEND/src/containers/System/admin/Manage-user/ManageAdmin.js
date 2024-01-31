import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getAllAdmin} from "../../../../services/userService"
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
        console.log(this.state);
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
                            <input type="text" placeholder="Nhập tên người dùng" />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='btn-add'>
                        <div className='btn btn-primary'>
                            + Thêm tài khoản
                        </div>
                    </div>

                    <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Email</th>
                        <th scope="col">FullName</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Position</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                        <tbody>
                            {listAdmin && listAdmin.length > 0 && listAdmin.map((item, index) => {
                                return (
                                        <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{ item.email}</td>
                                        <td>{ item.fullName}</td>
                                        <td>{ item.phone}</td>
                                        <td>{ this.props.language === 'vi' ? item.positionAdmin.valueVi: item.positionAdmin.valueEn}</td>
                                        <td className='action'>
                                                <div className='btn btn-warning btn-edit'>Edit</div>
                                                <div className='btn btn-danger btn-delete'>Delete</div>
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

export default connect( mapStateToProps, mapDispatchToProps )( ManageAdmin );
