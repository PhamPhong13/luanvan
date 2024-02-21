import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { getAllpost, getAllcat } from '../../services/userService';
import Header from './Header';
import Slider from './Slider';
import PostOnCat from './PostOnCat';
class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            listCat: [],
        }
    }

    async componentDidMount() {
        await this.getAllposts();
        await this.getCat();
    }

    getAllposts = async () => {
        let res = await getAllpost();
        if (res && res.errCode === 0 && res.data.length > 0) { 
            let reverse  = res.data.reverse();
            this.setState({
                listPost: reverse
            })
        }
        else this.setState({
            listPost: []
        })
        console.log(this.state.listPost)
    }

    getCat = async () => {
        let res = await getAllcat();
        this.setState({
            listCat: res.data
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

        let { listCat } = this.state;
        return (
            <>
                <title>
                    <FormattedMessage id="system.homepage"></FormattedMessage>
                </title>
                <Header /> 
                
                <div className='container manage_container'id='top'>
                    <div className='manage_container-content' >
                        <div className='homepage' >
                            <div className='left'>
                                <Slider />
                            </div>
                            <div className='right'>
                                <div className='tb'>
                                    <div className='thongbao'>Tin mới nhất</div>
                                </div>
                                <div className='new'>
                                    {this.state.listPost && this.state.listPost.slice(0, 5).map((item, index) => {
                                    return (
                                        <li onClick={() => this.linktopost(item.id)}>
                                            <p>{ item.name}</p>
                                        </li>
                                    )
                                })}
                                </div>
                                <div className='see'>
                                    <span>-- Xem thêm -- </span>
                                </div>
                            </div>

                            {/*  */}

                        </div>
                        <div className='homepage-content'>
                            
                            {listCat && listCat.map((item, index) => {
                                return (
                                    <PostOnCat catId={item.id } />
                                )
                            })}
                            
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

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );
