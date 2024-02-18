import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getAllAdmin, deleteAdmin } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
class ManageCat extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

   

    linkToAddAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/add-cat` );
        }
    }

    linkToEditAdmin = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/edit-cat/${id}` );
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

    // bỏ dấu trong chuổi
    removedau = (word) => {
        var dauMap = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'đ': 'd',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
        'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
        'Đ': 'D',
        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
        'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
        'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
        'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
        'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
    };

    return word.replace(/[^A-Za-z0-9]/g, function(x) { return dauMap[x] || x; });
    } 

    formatKeySearch = (key) => {
        return this.removedau(key).toLowerCase().replace(/\s+/g, ' ').trim()
    }



    handleOchangeToSearch = async(event) => {

        if (event.target.value.length <= 0) {
            this.getAllAdmins();
        }
        else {
            let key = this.removedau(event.target.value).toLowerCase();
            let res =  await getAllAdmin();
            let result = [];
            res.data.map((item, index) => {
                let fullName = item.fullName.toLowerCase()
                let name = this.removedau(fullName);
                if (name.includes(key) === true) {
                    result.push(item);
                }
            })

            if (result.length > 0) {
                this.setState({
                    listAdmin: result
                })
            
            }
            else {

                res.data.map((item, index) => {
                let name = this.removedau(item.phone);
                    if (name.includes(key) === true) {
                        result.push(item);
                    }
                })
                if (result.length > 0) {
                    this.setState({
                        listAdmin: result
                    })            
                }
                else {

                    res.data.map((item, index) => {
                        let email = item.email.toLowerCase()
                        let name = this.removedau(email);
                        if (name.includes(key) === true) {
                            result.push(item);
                        }
                    })

                    if (result.length > 0) {
                        this.setState({
                            listAdmin: result
                        })
            
                    }  
                    else {
                        this.setState({
                            listAdmin: []
                        })
                    }

                }
                
            }

        }
    }

    render ()
    {

        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-category"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.manage-category"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm tên danh mục" : "Type to find the category name"}
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

                    <div className='cat'>
                        <div className='cat-content'>
                            <div className='content-left'>
                                Hội nhập quốc tế
                            </div>
                            <div className='content-right'>
                                
                                <div className='btn btn-primary'><FormattedMessage id="key.edit"></FormattedMessage></div>
                                <div className='btn btn-danger btn-delete'><FormattedMessage id="key.delete"></FormattedMessage></div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ManageCat ));
