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

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
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
                <div className=' manage'>

                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-nhiemky")}><span><i className='fas fa-user-tie'></i>Quản lý nhiệm kỳ</span></li>
                            <li onClick={() => this.linkTouser("/system/add-tunure")}><span><i className='fas fa-plus'></i>Thêm nhiệm kỳ</span>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
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
