import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions'
import {getkeyform,getformbyid} from '../../services/userService';

class FormAnswer extends Component
{

    constructor(props) {
        super(props);
        this.textareaRef = React.createRef();
        this.state = {
            name: "",
            desc: "",
            email: "",
            listquestion: [],
        }
    }

    getquestion = async (id) => {
        let res = await getkeyform(id);
        this.setState({
            listquestion: res.data
        })
    }


    getform = async () => {
        let res = await getformbyid(this.props.match.params.id);
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                name: res.data.name,
                desc: res.data.desc,
                email: this.props.userInfo.email,
            })
        }
        else this.setState({
            name: "",
            desc: "",
        })
        await this.getquestion(res.data.id)
    }

    async componentDidMount() {
        await this.getform();
        this.adjustTextareaHeight();

    }


    componentDidUpdate() {
        this.adjustTextareaHeight();
    }

    adjustTextareaHeight() {
        const textarea = this.textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao thành 'auto' trước khi tính toán lại chiều cao thực tế
            textarea.style.height = `${textarea.scrollHeight + 10}px`; // Đặt chiều cao của textarea thành chiều cao thực tế của nội dung
        }
    }
    render ()
    {
        let { name, desc, email, listquestion } = this.state;
        console.log(listquestion);
        return (
            <>
                <title>Biểu mẩu đăng ký </title>
                <div className='formanswer'>
                    {name &&
                    <div className='formanswer-content'>
                        <div className='formanswer-content-top'>
                            <p className='name' dangerouslySetInnerHTML={ { __html: name } }></p>
                            <textarea
                                ref={this.textareaRef}
                                value={desc}
                                onChange={(e) => this.setState({ desc: e.target.value })}
                            ></textarea>
                                {email && <div className='email'>
                                    Bạn đang sử dụng tài khoản  <b>{email}</b> <a href=''>Chuyển đổi tài khoản</a>
                                </div>
                                }
                            </div>

                            {listquestion && listquestion.length > 0 && listquestion.map((item) => {
                                return (
                                    <div className='formanswer-content-bottom'>
                                <div className='question'>
                                            <div className='name'>{ item.key}</div>
                                            <div className='desc'> { item.desc} *</div>
                                            <input placeholder='Trả lời' className='answer' type='text'/>
                                </div>
                                
                            </div>
                                )
                            })}
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( FormAnswer ));
