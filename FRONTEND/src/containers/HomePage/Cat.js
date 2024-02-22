import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import {getAllpostById,   getcatById, getpostById} from '../../services/userService';
import Header from './Header';
import Footer from './Footer';
class Cat extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            name: ""
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
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            })
            await this.getpost();
        } 
    }

    getpost = async () => {
        let res = await getAllpostById(this.props.match.params.id);
        if (res && res.errCode === 0 ) {
            let reverse = res.data.reverse();
            this.setState({
                listPost: reverse
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
    
    render ()
    {
        let { listPost, name } = this.state;
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
                        {listPost && listPost.map((item, index) => {
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
