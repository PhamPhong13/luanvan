import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { getpost, getcat, createconnect, getpostslide, getAllconnect, getpostnew} from '../../services/userService';
import Header from './Header';
import Slider from './Slider';
import PostOnCat from './PostOnCat';
import Footer from './Footer';
import chatimage from "../../assets/chat.png"

class HomePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
             chat: false,
            iconchat_title: false,
            listPost: [],
            listCat: [],
            totalconnect: 0,
            newPost: '',
            iconnewpost: false
        }
    }

    async componentDidMount() {
        /* this.setTilechat(); */
        await this.getnewpost();
        await this.getAllposts();
        await this.getCat();
        await this.createconnection();
        await this.getconnect();
    }
    
    
    getnewpost = async () => {
        let res = await getpostnew();
        if (res && res.errCode === 0) {
            this.setState({
                newPost: res.data
            })
        }
        else this.setState({
            newPost: ''
        })
    }

    getconnect = async () => {
        let res = await getAllconnect();
        if (res && res.errCode === 0) {
            this.setState({
                totalconnect: res.total
            })
            this.setState({
            iconnewpost: true
        });
        
        }
        else this.setState({
            totalconnect: 0
        })
    }

    closeiconnewpost = () => {
        this.setState({
            iconnewpost: false
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

     setTilechat = () => {
        this.setState({
            iconchat_title: true
        });
    }

    closesetTilechat = () => {
        this.setState({
            iconchat_title: false
        });
    }
    handleChat = () => {
        this.setState({
            chat:!this.state.chat
        })
    }

    formatnumber = (num) => {
        let formattedNumber = parseInt(num).toLocaleString('en-US').replace(/,/g, ' ');
        return formattedNumber; // Kết quả sẽ là "100 000"
    }

    render ()
    {

        let { listCat, totalconnect, chat, iconchat_title, newPost, iconnewpost } = this.state;
        console.log(newPost);
        return (
            <>
                <title>
                    <FormattedMessage id="system.homepage"></FormattedMessage>
                </title>
                <Header /> 
                {/* {chat === true &&
                <div className='chatbox'>
                    <iframe
                            allow="microphone;"
                            intent="WELCOME"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/7888c03c-760c-420a-ac59-b7fa42fd99f3">
                </iframe>

                        <span onClick={() => this.handleChat()}>x</span>
                </div>
                }
                {chat === false && 
                    <div className='iconchat' >
                        <img src={chatimage} onClick={() => this.handleChat()}/>
                        {iconchat_title === true && <div className='iconchat_title'>
                            <p className='iconchat_title-name'><span>Chat cùng bot Chi hội Sinh viên Bình Tân.</span></p>
                            <p onClick={() => this.closesetTilechat()} className='closeiconchat'>x</p>
                        </div>}
                    </div>
                } */}
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

                <div className='title my-5'>Số lược truy cập: {this.formatnumber(totalconnect)}</div>
                
                {newPost && !isEmpty(newPost) && 
                    <div className='newpost'  >
                        <div onClick={() => this.linktopost(newPost.id)}>New</div> 
                            {iconnewpost === true &&
                        <div className='name'>
                                <p className='nameitem'><span>{newPost.name}</span></p>
                                <p onClick={() => this.closeiconnewpost()} className='close-newpost'>x</p>
                                </div>
                        }
                        
                        
                </div>
                }

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
