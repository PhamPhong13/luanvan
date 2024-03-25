import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getAllnhiemky, deletenhiemky, getuserbystatus } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { isEmpty } from 'lodash';
class Examine extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listCat: [],
            totalpage: 0
        }
    }

    async componentDidMount() {
        await this.getuser(1, '', 0);
    }

    getuser = async (page, word) => {
        let res = await getuserbystatus(page, word, 0);
        if (res && res.errCode === 0) {
            this.setState({
                listCat: res.data,
                totalpage: res.totalPages
        })
        }
        else this.setState({
            listCat: []
        })
    }

   

    
    linkToEditExamUser = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/examimeuser/${id}` );
        }
    }

    handleDeleteUser = async (id) => {
        let res = await deletenhiemky(id);
        if (res && res.errCode === 0) {
            await this.getuser();
                toast.success("Xóa nhiệm kỳ thành công!");
                
            }
            else toast.error("Xóa nhiệm kỳ không thành công!");
    }

    // bỏ dấu trong chuổi


    handleOchangeToSearch = async (event) => {

        if (event.target.value.length <= 0) {
            this.getuser(1, '',0);
        }
        else {
            await this.getuser("1", event.target.value, 0);
        }
        
    }

    handlePageClick = async (event) => {
        await this.getuser(event.selected + 1, '', 0);
     }
    

    render ()
    {
        let { listCat, totalpage } = this.state;
        return (
            <>
                <title>
                    Duyệt yêu cầu người dùng
                </title>
                <div className='container manage'>

                    <div className='title'>Duyệt yêu cầu người dùng</div>

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
                            listCat && !isEmpty(listCat) && listCat.map((item, index) => {
                                return (

                                    <div className='cat-content'>
                            <div className='content-left'>
                               {item.fullName}
                            </div>
                            <div className='content-right'>
                                
                                            <div className='btn btn-primary'
                                                onClick={() => this.linkToEditExamUser(item.id)}
                                            ><FormattedMessage id="key.see"></FormattedMessage></div>
                                           
                            </div>
                        </div>
                                )
                            })
                        }
                        
                        {listCat && !isEmpty(listCat) &&
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Examine ));
