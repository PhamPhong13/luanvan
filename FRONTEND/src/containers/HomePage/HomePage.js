import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { getpost, getcat, createconnect, getpostslide, getAllconnect} from '../../services/userService';
import Header from './Header';
import Slider from './Slider';
import PostOnCat from './PostOnCat';
import Footer from './Footer';
class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            listCat: [],
            totalconnect: 0,
        }
    }

    async componentDidMount() {
        await this.getAllposts();
        await this.getCat();
        await this.createconnection();
        await this.getconnect();
    }

    getconnect = async () => {
        let res = await getAllconnect();
        if (res && res.errCode === 0) {
            this.setState({
                totalconnect: res.total
            })
        }
        else this.setState({
            totalconnect: 0
        })
    }

    createconnection = async () => { 
        if (this.props.userInfo) {
            await createconnect({
                userId: this.props.userInfo.id
            })
        }
        else await createconnect({
                userId: 4
            })
    }

    getAllposts = async () => {
        let res = await getpostslide();
        if (res && res.errCode === 0 && res.data.length > 0) { 
            this.setState({
                listPost: res.data
            })
        }
        else this.setState({
            listPost: []
        })
    }

    getCat = async () => {
        let res = await getcat("ALL");
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

    formatnumber = (num) => {
        let formattedNumber = parseInt(num).toLocaleString('en-US').replace(/,/g, ' ');
        return formattedNumber; // Kết quả sẽ là "100 000"
    }

    render ()
    {

        let { listCat , totalconnect} = this.state;
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
                                    {this.state.listPost && this.state.listPost.map((item, index) => {
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

                <div className='title'>Số lược truy cập: { this.formatnumber(totalconnect)}</div>

                <Footer />

            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( HomePage );
