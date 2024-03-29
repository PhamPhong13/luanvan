import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getAllnhiemky, deletenhiemky } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
class Tunure extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listCat: []
        }
    }

    async componentDidMount() {
        await this.getAllnhiemkys();
    }

    getAllnhiemkys = async () => {
        let res = await getAllnhiemky();
        this.setState({
            listCat: res.data
        })
    }

   

    linkToAddAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/add-tunure` );
        }
    }

    linkToEditAdmin = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/infor-tunure/${id}` );
        }
    }

    handleDeleteUser = async (id) => {
        let res = await deletenhiemky(id);
        if (res && res.errCode === 0) {
            await this.getAllnhiemkys();
                toast.success("Xóa nhiệm kỳ thành công!");
                
            }
            else toast.error("Xóa nhiệm kỳ không thành công!");
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



    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
            this.getAllnhiemkys();
        }
        else {
            let key = this.removedau(event.target.value).toLowerCase();
            let res =  await getAllnhiemky();
            let result = [];
            res.data.map((item, index) => {
                let fullName = item.name.toLowerCase()
                let name = this.removedau(fullName);
                if (name.includes(key) === true) {
                    result.push(item);
                }
            })

            if (result.length > 0) {
                this.setState({
                    listCat: result
                })
            
            }
            else {

                this.setState({
                            listCat: []
                        })
                }
                

        }
    }

    render ()
    {
        let { listCat } = this.state;
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage-nhiemky"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage-nhiemky"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm tên nhiệm kỳ" : "Type to find the category name"}
                                onChange={(event) => this.handleOchangeToSearch(event)}
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='btn-add'>
                        <div className='btn btn-primary'
                            onClick={() => this.linkToAddAdmin()}
                        >
                            + Thêm nhiệm kỳ
                        </div>
                    </div>

                    <div className='cat'>
                        {
                            listCat && isEmpty(listCat) && <span>Danh sách rổng!</span>
                        }
                        {
                            listCat && !isEmpty(listCat) && listCat.reverse().map((item, index) => {
                                return (

                                    <div className='cat-content'>
                            <div className='content-left'>
                               {item.name}
                            </div>
                            <div className='content-right'>
                                
                                            <div className='btn btn-primary'
                                                onClick={() => this.linkToEditAdmin(item.id)}
                                            ><FormattedMessage id="key.see"></FormattedMessage></div>
                                            <div className='btn btn-danger btn-delete'
                                            onClick={() => this.handleDeleteUser(item.id)}
                                            ><FormattedMessage id="key.delete"></FormattedMessage></div>
                            </div>
                        </div>
                                )
                            })
}
                        


                        
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Tunure ));
