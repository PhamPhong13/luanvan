import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import {getAllpost, deletepost } from "../../../../services/userService"

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import avatar from "../../../../assets/340439352_964862588007237_5460541469979575194_n.jpg"
class Commnent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            opensee: false,
            key: "comment"
        }
    }

    async componentDidMount() {
        console.log("Check id comment", this.state)
    }

    openSee = () => {
        this.setState({
        opensee: !this.state.opensee
    })
}

    render ()
    {
        console.log(this.state.opensee)
        return (
            <div className={this.state.opensee === true ? 'post-cs see' : 'post-cs'}>
                <div className=''>Bình luận bài viết: </div>
                <div className={this.state.opensee === false ? 'cmt-p cmt-p-see' : 'cmt-p'}>
                    <div className='post-comment-content'>
                    <div className='comment-main'>
                        <img src={avatar} />
                        <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b><label for="texxt">Trả lời</label></b></span>
                            </div>
                        </div>

                    </div>
                        <div className='comment-rep'>
                        <li>
                        <img src={avatar} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>
                                </li>
                        </div>
                </div>
                <div className='post-comment-content'>
                    <div className='comment-main'>
                        <img src={avatar} />
                        <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>

                    </div>
                        <div className='comment-rep'>
                        <li>
                        <img src={avatar} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>
                                </li>
                        </div>
                </div>
                <div className='post-comment-content'>
                    <div className='comment-main'>
                        <img src={avatar} />
                        <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôfffffffffff eegw gg ừ22fm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>

                    </div>
                        <div className='comment-rep'>
                        <li>
                        <img src={avatar} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôfffffffff 2fffffffffff 2fff3fff f1f1f3 ccccccccccccccc m đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>
                        </li>
                        <li>
                        <img src={avatar} />
                                <div className='comment-main-content'>
                            <div className='comment-main-content-top'>
                                <div className='name'>Trần Như Huỳnh</div>
                            <div className='comment'>Ngày hôm đó tui đã không đi đc, rất buồn feeeeeeeeee</div>
                            </div>
                            <div className='comment-main-content-bottom'>
                                <span>15 tuần </span> <span><b>Thích</b></span> <span><b>Trả lời</b></span>
                            </div>
                        </div>
                        </li>
                        
                        </div>
                </div>
                </div>
                <span className='open-close' onClick={() => this.openSee()}><i>{this.state.opensee === true ? 'Ẩn bớt' : 'Xem thêm'} </i></span>
                <div className='text-comment'>
                    <input type='text' id="texxt"/>
                    <i class="fas fa-share"></i>
                </div>

            </div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Commnent ));
