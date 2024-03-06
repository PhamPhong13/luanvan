import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getpost, deletepost, getAllpost, gethistoryById } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import ReactPaginate from 'react-paginate';
class ManagePost extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            totalpage: 0,
            userPost: false,
            search: false
        }
    }

    async componentDidMount() {
        await this.getposts("1");
    }
    
    
    getposts = async (page) => {
        let id = this.props.userInfo.id;
        console.log(id)

        if (id === 1) {
            this.setState({
                userPost: true,
            })
        }
        else {
            this.setState({
                userPost: false,
            })
        }
        let res = await getpost(page, this.props.userInfo.id);
        console.log(res)
        if (res && res.data.length > 0) {
            this.setState({
                listPost: res.data,
                totalpage: res.totalPages,
                search: false
            })
        }
        else this.setState({
            listPost: [],
                search: false

        })
    }

    getAllposts = async (page, word) => {
        let id = this.props.userInfo.id;
        if (id === 1) {
            this.setState({
                userPost: true,
            })
        }
        else {
            this.setState({
                userPost: false,
            })
        }
        let res = await getAllpost(page, word, this.props.userInfo.id);
        if (res && res.data.length > 0) {
            this.setState({
                listPost: res.data,
                totalpage: res.totalPages
            })
        }
        else this.setState({
            listPost: []
        })
    }

    linkToAddAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/add-post` );
        }
    }

    linkToEditAdmin = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/edit-post/${id}` );
        }
    }

    linkToInforPost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/infor-post/${id}` );
        }
    }

    handleDeleteUser = async (id) => {
        let res = await deletepost(id);
        if (res && res.errCode === 0) {
            await this.getposts("1");
                toast.success("Xóa bài viết thành công!");
                
            }
            else toast.error("Xóa bài viết không thành công!");
    }


    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
           await this.getposts();
        }
        else {
            this.setState({
                search: true
            })

            await this.getAllposts("1", event.target.value);
        }
        console.log(this.state.search)
    }

    handlePageClick = async (event) => {
        console.log()
        if (this.state.search === true) {
            await this.getAllposts(event.selected + 1, '');
        }
        else  await this.getposts(event.selected + 1);
    }
    

    render ()
    {
        let { listPost, totalpage, userPost } = this.state;
        console.log(this.state);
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.manage-post"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.manage-post"></FormattedMessage></div>

                    <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm bài viết" : "Type to find the post"}
                                onChange={(event) => this.handleOchangeToSearch(event)}
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='btn-add'>
                        <div className='btn btn-primary'
                            onClick={() => this.linkToAddAdmin()}
                        >
                            + Thêm bài viết
                        </div>
                    </div>

                    <div className='cat'>
                        {
                            listPost && isEmpty(listPost) && <span>Danh sách rổng!</span>
                        }
                        {
                            listPost && !isEmpty(listPost) && listPost.map((item, index) => {
                                return (

                                    <div className='cat-content'>
                                        {userPost === true ? 
                                        <div className='content-left cat-post-item' >
                                            <div className='top'>
                                                 <p>{item.name}</p>
                                            </div>
                                            <div className='bottom'>Bài viết của <b>{item.Admin.fullName}</b></div>
                                            </div> : 
                                            <div className='content-left' >
                                                 {item.name}
                                        </div>
                                        }
                            
                            <div className='content-right'>
                                
                                            <div className='btn btn-primary'
                                                onClick={() => this.linkToInforPost(item.id)}
                                            ><FormattedMessage id="key.see"></FormattedMessage></div>
                                            <div className='btn btn-warning btn-edit'
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
                        


                        
                    </div>

                    {listPost && !isEmpty(listPost) && 
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( ManagePost ));
