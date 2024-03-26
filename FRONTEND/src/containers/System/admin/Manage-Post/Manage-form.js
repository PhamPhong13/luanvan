import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getform, getuserformbyadminid } from "../../../../services/userService"

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
    

    render ()
    {
        let { listForm, totalPage, listformshare, totalshare } = this.state;
        return (
            <>
                <title>
                    Quản lý biểu mẫu
                </title>

                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.manage-form"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm biểu mẫu" : "Type to find the form"}
                                /* onChange={(event) => this.handleOchangeToSearch(event)} */
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

                                    <div className='cat-content'>
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

                    <div className='cat'>
                        <div><b>Biểu mẫu được chia sẻ:</b></div>
                        {
                            listformshare && isEmpty(listformshare) && <span>Danh sách rổng!</span>
                        }
                        {
                            listformshare && !isEmpty(listformshare) && listformshare.map((item, index) => {
                                return (

                                    <div className='cat-content'>
                                       <div className='content-left cat-post-item' >
                                            <div className='top'>
                                                 <p>{item.Form.name}</p>
                                            </div>
                                            </div>
                            
                            <div className='content-right'>
                                            {item.Form.status === 'close' && <img src={ lock} />}
                                
                                            <div className='btn btn-primary'
                                                onClick={() => this.linkToInforForm(item.Form.id)}
                                            ><FormattedMessage id="key.see"></FormattedMessage></div>
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
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={totalshare}
                            pageCount={totalshare}
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
