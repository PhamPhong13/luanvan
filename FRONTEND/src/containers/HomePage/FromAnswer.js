import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions'
import {getkeyform,getformbyid, createformusersubmit, getformusersubmit, updateformusersubmit} from '../../services/userService';
import QuestionKey from './QuestionKey';
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
            remove: 'no',
            postId: "",
            formId: "",
            success: false,
            update: false,
        }
    }

    getformusersubmitsuccess = async () => {
        let res = await getformusersubmit(this.state.formId, this.props.userInfo.id)
        console.log(res)
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                success: true,
                update: true
            })
        }
        else this.setState({
            success: false,
            update:false
        })
    }

    getquestion = async (id) => {
        let res = await getkeyform(id);
        this.setState({
            listquestion: res.data
        })
    }


    getform = async () => {
        let res = await getformbyid(this.props.match.params.id);
        if (res && res.errCode === 0) {
            this.setState({
                name: res.data.name,
                desc: res.data.desc,
                email: this.props.userInfo.email,
                postId: res.data.postId,
                formId: res.data.id
            })
        }
        else this.setState({
            name: "",
            desc: "",
        })
        await this.getquestion(res.data.id);
        await this.getformusersubmitsuccess();
    }

    async componentDidMount() {
        await this.getform();
        this.adjustTextareaHeight();

    }

    linktoform = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${this.state.postId}` );
        }
    }

    linktopost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${id}` );
        }
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

    handleremove = () => {
        this.setState({
            remove: 'update'
        })

        this.setState({
            remove: 'update'
        })
    }
    
    handleremoveNo = () => {
        this.setState({
            remove: 'no'
        })
    }

    handleremovedelete = () => {
        this.setState({
            remove: 'delete'
        });
        this.setState({
            remove: 'delete'
        });
    }


    handlesaveForm = async () => {
        if (this.state.update === true) {
            let res = await updateformusersubmit({
            formId: this.state.formId,
            userId: this.props.userInfo.id
        })
            if (res && res.errCode === 0) {
            await this.getformusersubmitsuccess();
        }
        }
        else {
            let res = await createformusersubmit({
            formId: this.state.formId,
            userId: this.props.userInfo.id
        })
            if (res && res.errCode === 0) {
            await this.getformusersubmitsuccess();
        }
        }
        
        
    }

    handleChangeSuccess = () => {
        this.setState({
            success: !this.state.success
        })
    }

    render ()
    {
        let { name, desc, email, listquestion, remove, success, postId } = this.state;
        return (
            <>
                <title>Biểu mẩu đăng ký </title>
                {success === false &&
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
                                        <QuestionKey item={item}
                                            removes={remove}
                                            handleremoveNo={this.handleremoveNo}
                                            linktoform={this.linktoform} />
                                
                                    </div>
                                )
                            })}

                            <div className='sendform'>
                                <div className='left'>
                                    <div className='btn btn-primary'
                                    onClick={() => this.handlesaveForm()}
                                    >Gửi</div>
                                    <div className='btn btn-secondary btn-cancel'
                                   onClick={() => this.handleremovedelete()}
                                    >Hủy</div>
                                </div>
                                <div className='right'>
                                    <div className='btn btn-secondary'
                                         onClick={() => this.handleremove()}
                                    >Xóa câu trả lời</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                }


                {success === true && 
                <div className='formSuccess'>
                    <div className='formSuccess-content'>
                        <p>Bạn vừa đăng ký thành công!</p>
                        <p>Chúc bạn có một ngày tốt lành!</p>
                        <div className='btn btn-warning' onClick={() => this.handleChangeSuccess()}>Sửa biểu mẫu</div>
                        <div className='btn btn-primary mx-2' onClick={() => this.linktopost(postId)}>Trở về</div>
                    </div>
                </div>
                }
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
