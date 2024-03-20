import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import {getAllpostById,   getcatById, getAllpostBypage} from '../../services/userService';
import Header from './Header';
import Footer from './Footer';
import ReactPaginate from 'react-paginate';

class Cat extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            name: "",
            totalpage: 0,
        }
    }

    async componentDidMount() {
        await this.getcat();
        await this.getpost();
    }

    getcat = async () => { 
        let res = await getcatById(this.props.match.params.id);
        if (res && res.errCode === 0 ) {
            this.setState({
                name: res.data.name,

            })
        }
        else this.setState({
            name: ""
        })

        await this.getpost(1);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            })
            await this.getcat();
        } 
    }

    getpost = async (page) => {
        let res = await getAllpostBypage(this.props.match.params.id, page);
        if (res && res.errCode === 0 ) {
            this.setState({
                listPost: res.data,
                totalpage: res.totalPages
            })
        }
        else this.setState({
            listPost: []
        })
    }
    
    linktopost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${id}` );
        }
    }

    handlePageClick = async (event) => {
        await this.getpost(event.selected + 1);
     }
    
    render ()
    {
        let { listPost, name , totalpage} = this.state;
        return (
            <>
                <title>
                    {name}
                </title>
                <Header /> 
                <div className='container manage_container'id='top'>
                    <div className='manage_container-content' >
                        <div className='title'>chuyên mục { name}</div>
                    </div>

                    <div className='cat_content'>
                        {listPost.map((item, index) => {
                            return (
                            <li onClick={() => this.linktopost(item.id)}  className='cat_content-ietm'>
                            <img src={item.image} />
                            <div className='name'>
                                {item.name}
                            </div>
                        </li>
                        )
                            
                        })}
                    </div>
                    {listPost && listPost.length > 0 && 
                        <div className='ReactPaginate mt-2'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Tiếp >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={totalpage}
                            pageCount={totalpage}
                            previousLabel="< Trước"
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

                <Footer />
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        processLogout_U: () => dispatch( actions.processLogout_U() ),
    };
};  

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Cat ));
