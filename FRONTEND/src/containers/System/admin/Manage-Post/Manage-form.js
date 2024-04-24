import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getform, getuserformbyadminid, deleteform , getAllForm} from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import lock from "../../../../assets/lock.png"

import ReactPaginate from 'react-paginate';
class ManageForm extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listForm: [],
            listformshare: [],
            totalPage: 0,
            totalshare: 0,
            
        }
    }

    async componentDidMount() {
        await this.getForms("1");
        await this.getformbyadmins("1");
    }

    getformbyadmins = async (id) => {
        let res = await getuserformbyadminid(this.props.userInfo.id, id)
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listformshare: res.data,
                totalshare: res.totalPages
            })
        }
        else this.setState({
            listformshare: []
        })
    }

    getForms = async (id) => {
        let res = await getform(id, this.props.userInfo.id)
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listForm: res.data,
                totalPage: res.totalPages
            })
        }
        else {
            this.setState({
                listForm: [],
                totalPage: 0
            })
        }
    }


    

    linkToInforForm = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/resultform/${id}` );
        }
    }

    handlePageClick = async (event) => {
        await this.getformbyadmins(event.selected + 1);
    }

    handlePageClickform = async (event) => {
        await this.getForms(event.selected + 1);
    }

     linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }
    

    handleDeleteUser = async (id) => {
        await deleteform(id);
        toast.success("Xóa thành công");
        await this.getForms("1");
    }

    handleOchangeToSearch = async (event) => { 
        if (event.target.value.length <= 0) {
           await this.getForms("1");
        }
        else {
            let res = await getAllForm(1, this.props.userInfo.id, event.target.value);
            if (res && res.errCode === 0 && res.data.length > 0) {
                this.setState({
                    listForm: res.data,
                    totalPage: res.totalPages
                })
            }
            else { 
                this.setState({
                    listForm: [],
                    totalPage: 0

                })
            }
        }
    }

    render ()
    {
        let { listForm, totalPage, listformshare, totalshare } = this.state;
        return (
            <>
                <title>
                    Quản lý biểu mẫu
                </title>

                <div className=' manage'>

                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-post")}><span><i className='fas fa-list'></i><FormattedMessage id="system.manage.manage-post"></FormattedMessage></span></li>
                            <li ><span><i class="fas fa-book"></i><FormattedMessage id="system.manage.manage-form"></FormattedMessage></span>
                                <ul className='ul-link'>
                                    <li onClick={() => this.linkTouser("/system/manage-form")}><i className='fas fa-user'></i><span>Form của bạn</span></li>
                                    <li onClick={() => this.linkTouser("/system/manage-form-share")}><i className='fas fa-share'></i><span>Form được chia sẻ</span></li>
                            </ul>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='title'><FormattedMessage id="system.manage.manage-form"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm biểu mẫu" : "Type to find the form"}
                                onChange={(event) => this.handleOchangeToSearch(event)}
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='cat'>
                        <div><b>Biểu mẫu của bạn:</b></div>

                        {
                            listForm && isEmpty(listForm) && <span>Danh sách rổng!</span>
                        }
                        {
                            listForm && !isEmpty(listForm) && listForm.map((item, index) => {
                                return (

                                    <div className='cat-content' style={{margin: '6px'}}>
                                       <div className='content-left cat-post-item' >
                                            <div className='top'>
                                                 <p>{item.name}</p>
                                            </div>
                                            </div>
                            
                                        <div className='content-right form'>
                                            {item.status === 'close' && <img src={ lock} />}
                                
                                            <div className='btn btn-primary'
                                                onClick={() => this.linkToInforForm(item.id)}
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

                    {listForm && !isEmpty(listForm) && 
                    <div className='ReactPaginate mt-2'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="sau >"
                            onPageChange={this.handlePageClickform}
                            pageRangeDisplayed={totalPage}
                            pageCount={totalPage}
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
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ManageForm ));
