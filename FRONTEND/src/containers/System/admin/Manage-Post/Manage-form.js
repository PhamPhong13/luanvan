import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getform } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import ReactPaginate from 'react-paginate';
class ManageForm extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listForm: [],
            totalPage: 0,
        }
    }

    async componentDidMount() {
        await this.getForms();
    }

    getForms = async () => {
        let res = await getform("1", this.props.userInfo.id)
        console.log(res)
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
    

    render ()
    {
        let { listForm, totalPage } = this.state;
        console.log(this.state);
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
                            
                            <div className='content-right'>
                                
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
                            /* onPageChange={this.handlePageClick} */
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
