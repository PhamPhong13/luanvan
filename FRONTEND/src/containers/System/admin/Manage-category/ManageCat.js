import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getAllcat, deletecat, getcat, getAllpostById, deletepost } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { get, isEmpty } from 'lodash';
import ReactPaginate from 'react-paginate';

class ManageCat extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listCat: [],
            totalpage: 0,
        }
    }

    async componentDidMount() {
        await this.getcats();
    }
    
    getcats = async (page) => {
        let res = await getcat(page);
        if (res && res.data.length > 0) {
            this.setState({
                listCat: res.data,
                totalpage: res.totalPages
            })
        }
        else this.setState({
            listCat: []
        })
    }

    getAllCats = async (page, word) => {

        let res = await getAllcat(page, word);
        if (res && res.data.length > 0) {
            this.setState({
                listCat: res.data,
                totalpage: res.totalPages
            })
        }
        else this.setState({
            listCat: []
        })
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
    await deletecat(id);
    let post = await getAllpostById(id);
    if (post && post.errCode === 0) {
        await Promise.all(post.data.map(async (item) => {
            await deletepost(item.id);
        }));
    }
    await this.getcats();
    toast.success("Xóa danh mục thành công!");
}


    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
            this.getAllCats();
        }
        else {
             await this.getAllCats("1", event.target.value);
        }
    }

    handlePageClick = async (event) => {
        await this.getAllCats(event.selected + 1);
     }

linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }
    render ()
    {
        let { listCat, totalpage } = this.state;
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-category"></FormattedMessage>
                </title>
                <div className='manage manage-cat'>

                    <div className='left'>
                        <li onClick={() => this.linkTouser("/system/manage-cat")}><span><i className='fas fa-list'></i><FormattedMessage id="system.manage.manage-category"></FormattedMessage></span></li>
                        <li onClick={() => this.linkTouser("/system/add-cat")}><span><i className='fas fa-plus'></i><FormattedMessage id="system.manage.add-cat"></FormattedMessage></span></li>
                    </div>
                    <div className='right'>
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
                            + Thêm danh mục
                        </div>
                    </div>

                        <div className='list-user'>
                            <div className='cat'>
                        {
                            listCat && isEmpty(listCat) && <span>Danh sách rổng!</span>
                        }
                        {
                            listCat && !isEmpty(listCat) && listCat.map((item, index) => {
                                return (

                                    <div className='cat-content'>
                            <div className='content-left'>
                               {item.name}
                            </div>
                            <div className='content-right'>
                                
                                            <div className='btn btn-warning'
                                                onClick={() => this.linkToEditAdmin(item.id)}
                                            ><FormattedMessage id="key.edit"></FormattedMessage></div>
                                            <div className='btn btn-danger btn-delete'
                                            onClick={() => this.handleDeleteUser(item.id)}
                                            ><FormattedMessage id="key.delete"></FormattedMessage></div>
                            </div>
                        </div>
                                )
                            })
}
                        
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
