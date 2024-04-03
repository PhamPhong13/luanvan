import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import formicon from "../../assets/form.jpg"
import { withRouter } from 'react-router';
import {
    getAllpostById, getcatById, getpostById,
    getlikepostById, createlikepost, deletelikepost,
    updatepost, createhistory, createreport, getformbyid

} from '../../services/userService';
import Header from './Header';
import Comment from './Comment';
import Footer from './Footer';
import FormAnswer from './FromAnswer';
import { CommonUtils } from '../../utils'; // vi or en
import { toast } from 'react-toastify';

class Post extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            post: '',
            cat: '',
            catId: "",
            thu: "",
            day: "",
            postbycat: [],
            userId: "",
            likepost: false,
            openReport: false,
            senReport: false,
            imageReport: "",
            content: "",
            userReport: [],
            form: "",
            checkUserform: false,
            openCloseform: false,
            dayuntil: "",
            openTitleForm: false
        }
    }

    async componentDidMount() {
        await this.getpost();
        await this.getform()
        await this.setCount();    
    }

    

    getform = async () => {
        let res = await getformbyid(this.props.match.params.id);
        if (res && res.errCode === 0) {
            this.setState({
                form: res.data
            })
            let dayuntil = this.daysUntil(res.data.date);
            if (dayuntil > 0) {
                this.setState({
                    dayuntil: `Đăng ký form tại đây. Link sẽ đóng sau ${dayuntil} ngày!`,
                    openTitleForm: true
                })

                setTimeout(() => {
                    this.setState({
                        openTitleForm: false
                    });
                }, 3000);

            }
            else {
                this.setState({
                    dayuntil: `Link đăng ký đã đóng!`,
                    openTitleForm: true
                })

                setTimeout(() => {
                    this.setState({
                        openTitleForm: false
                    });
                }, 3000);
            }
        }
        else this.setState({
            form: ""
        })
    }

    daysUntil = (dateString) => {
    // Chuyển đổi chuỗi ngày đầu vào thành đối tượng Date
    const targetDate = new Date(dateString);
    
    // Tính thời gian hiện tại
    const currentDate = new Date();
    
    // Tính số mili giây còn lại giữa thời điểm hiện tại và thời điểm đích
    const differenceMs = targetDate - currentDate;
    
    // Chuyển đổi số mili giây thành số ngày (1 ngày = 24 giờ * 60 phút * 60 giây * 1000 mili giây)
    const daysLeft = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    
        return daysLeft;
}


    setCount = async () => {
        let count = this.state.post.count + 1;
        let res = await updatepost({
            name: this.state.post.name,
            image: this.state.post.image,
            descHTML: this.state.post.descHTML,
            descMarkdown: this.state.post.descMarkdown,
            id: this.state.post.id,
            catId: this.state.post.catId,
            count: count,
        })
        if (res && res.errCode === 0) {
            await this.getpost();
        }
        if (this.props.userInfo) {
            await createhistory({
                postId: this.props.match.params.id,
                userId: this.props.userInfo.id,
            })
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            })
            await this.getpost();
            await this.getform()
            await this.setCount();
        } 
    }

    getlikepost = async () => {
        if (this.props.userInfo) {
            let likepost = await getlikepostById(this.props.userInfo.id, this.props.match.params.id); 
        if (likepost && likepost.errCode === 0) {
            this.setState({
                likepost: true
            })
        }
        else this.setState({
            likepost: false
        })
        }
        else this.setState({
            likepost: false
        })
        
    }

    getcat = async() => {
        let res = await getcatById(this.state.post.catId);
        this.setState({
            cat: res.data
        })
    }

    getpost = async () => {
        
        let res = await getpostById(this.props.match.params.id);
        this.setState({
            post: res.data,
            catId: res.data.catId
        })
        this.getcat();
        this.getday(this.state.post.updatedAt);
        await this.getpostbycat();
        this.setState({
            id: this.props.match.params.id
        })

       await this.getlikepost(); 
    }

    getpostbycat = async () => {
        let res = await getAllpostById(this.state.catId);
        if (res && res.errCode === 0 && res.data.length > 0) {
            let reverse = res.data.reverse();
            this.setState({
            postbycat: reverse
        })
        }
        else this.setState({
            postbycat: []
        })

    }

    getday = (date) => {
        let dateTime = new Date(date);

        // Mảng chứa các tên của các ngày trong tuần
        let daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

        // Lấy ngày trong tuần (từ 0 đến 6, 0 là Chủ Nhật, 1 là Thứ Hai, và cứ tiếp tục)
        let dayIndex = dateTime.getDay();
        let dayOfWeek = daysOfWeek[dayIndex];
        this.setState({
            thu: dayOfWeek,
            day: dateTime.toLocaleDateString()
        })
    }
    linktopost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${id}` );
        }
    }

    linktoform = (id) => {
        if (this.state.form.status === 'close') {
            this.setState({
                openCloseform: true
            })
        }
        else
        if (this.props.userInfo === null) {
            this.setState({ checkUserform: true })
        }
        else {
            if ( this.props.history )
        {
            this.props.history.push( `/formanswer/${id}` );
        } 
        }
    }

    linktocat = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/cat/${id}` );
        }
    }

    userlike = async () => {
        if (this.props.userInfo) {
            
            let res = await createlikepost({
                userId: this.props.userInfo.id,
                postId: this.props.match.params.id
            });
            if (res && res.errCode === 0) {
                await this.getlikepost();
            }
        }
        else {
            this.setState({
                likepost: true
            })
        }
    }

    userunlike = async () => {
        if (this.props.userInfo) {
            
            await deletelikepost(this.props.userInfo.id, this.props.match.params.id);
            await this.getlikepost();
        }
        else {
            this.setState({
                likepost: false
            })
        }
    }

     handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }
    
    handlereport = async (id) => { 
        this.setState({
            openReport: !this.state.openReport,
            userReport: id,
            imageReport: "",
            content: "",
        })
    }
    
    checkcontentreport = () => {
        if (this.state.content.length <= 0) {
            alert("Vui lòng nhập nội dung báo cáo!");
            return false;
        }
        return true;
    }

    handleOnsaveReport = async () => {
        if (this.checkcontentreport()) {
            let res = await createreport({
                type: "postcomment",
                userId: this.props.userInfo.id,
                userrportId: this.state.userReport.adminId,
                postId: this.state.userReport.id,
                content: this.state.content,
                image: this.state.imageReport,
                comment: "",
                status: "S1"
            })
            if (res && res.errCode === 0) { 
                this.setState({
                    openReport: false,
                    senReport: false,
                    content: '',
                    imageReport: ''
                })
                toast.success("Báo cáo của bạn sẽ được xử lý sớm!");
            }
            else {
                
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        }
    }
    handleSenReport = () => {
        this.setState({
            senReport:!this.state.senReport
        })
    }

    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                imageReport: getBase64
            })
        }

    }

    closeLogin = () => {
        this.setState({
            checkUserform:!this.state.checkUserform
        })
    }

    linktologin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/login-user` );
        }
    }

    closeFormopen = () => {
        this.setState({
            openCloseform:false
        })
    }

    render ()
    {
        let { post, form, cat, thu, day, postbycat, openCloseform, dayuntil,  openTitleForm, 
            id, likepost, openReport, senReport, imageReport, checkUserform } = this.state;
        console.log(dayuntil)
        return (
            <>
                <title>
                     {post.name}
                </title>
                <Header />

                {openCloseform === true &&
                    <div className='checkstatususer'>
                        <div className='checkstatususer-content'>
                            <div className='my-2'>Biểu mẫu đăng ký đã đóng!</div>
                            <div className='btn-submit'>
                                <div className='btn btn-primary mx-2'
                                    onClick={() => this.closeFormopen()} 
                                    
                                >Ok</div>
                            </div>
                        </div>

                        
                </div>
                }
                
                {checkUserform === true &&
                    <div className='checkstatususer'>
                        <div className='checkstatususer-content'>
                            <div className='my-2'>Bạn cần phải đăng nhập để có thể điền biểu mẫu đăng ký!</div>
                            <div className='btn-submit'>
                                <div className='btn btn-primary mx-2'
                                    onClick={() => this.linktologin()} 
                                    
                                >Đăng nhập</div>
                                <div className='btn btn-secondary'
                                    onClick={() => this.closeLogin()} 
                                    
                             >Hủy</div>
                            </div>
                        </div>

                        
                </div>
                }
                
                <div className='container manage_container' id='top'>
                    <div className='manage_container-content' >
                        <div className='homepage' >
                            <div className='left post'>
                                <div className='post-name'>
                                    {post.name}
                                </div>
                                <div className='post-infor'>
                                    <span className='post-id'>Id bài viết: {post.id}</span>
                                    <span className='cat-id' onClick={() => this.linktocat(cat.id)}>
                                        {cat.name}
                                        <span className='dot'></span>
                                    </span>
                                </div>
                                <div className='post-date'>
                                    <span className='date'>Ngày đăng: {thu} - {day}</span>
                                    {likepost === true ? <span className='like' onClick={() => this.userunlike()}>Thích ❤️ </span> :
                                        <span className='like' onClick={() => this.userlike()}
                                        >Thích <i className='fas fa-heart'></i></span>}
                                    <span className='like'>Lược xem: {post.count} 😍</span>
                                </div>

                                <div className='post-image'>
                                    <img src={ post.image} />
                                </div>

                                <div className='post-content'>
                                    <p className='content-p' dangerouslySetInnerHTML={ { __html: post.descHTML } }>
                                    </p>
                                </div>
                                {form && <div ><b>Form đăng ký <span style={{ color: 'blue', cursor: 'pointer'}} onClick={() => this.linktoform(form.postId)}>Tại đây!</span></b></div>}
                                <div>-------------------------------------------------------</div>
                                <div className='btn btn-primary'
                                onClick={() => this.handlereport(post)}>
                                Id bài viết: {post.id}   Báo cáo 
                                </div>
                                <Comment postId = {id} />

                            </div>
                            <div className='right'>
                                <div className='tb'>
                                    <div className='thongbao post'>Bài viết liên quan</div>
                                </div>
                                <div className='new'>
                                    {postbycat && postbycat.slice(0, 5).map((item, index) => {
                                    return (
                                        <li onClick={() => this.linktopost(item.id)}>
                                            <p>{ item.name}</p>
                                        </li>
                                    )
                                })}
                                </div>
                                <div onClick={() => this.linktocat(this.state.catId)} className='see'>
                                    <span>-- Xem thêm -- </span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    {openReport === true && <div className='form-report'>
                    <div className='form-report-content'>
                        <div className='name text-center'>Báo cáo</div>
                        <div className='form-group'>
                            <label>Nội dung báo cáo: </label>
                            <textarea onChange={(event) => this.handleOnchangeInput(event, "content")}></textarea>
                        </div>
                        <div className='form-group image' >
                            <label className='label_upload-img' htmlFor='reviewImg'>Ảnh  <i className='fas fa-upload'></i></label>
                                <input hidden type='file' className='form-controll-file' id="reviewImg"
                                    onChange={(event) => this.handleOnchangeImg(event)}
                            />
                            <img src={ imageReport} alt='Ảnh'/>
                        </div>
                        <p><input onClick={() => this.handleSenReport()} type='checkbox'/> Bạn có chắc chắn rằng nội dung báo cáo của bạn là hoàn toàn chính xác và đáng tin cậy?</p>
                        <div className='btn-submit'>
                            {senReport === true ? <div className='btn btn-primary'
                            onClick={() => this.handleOnsaveReport()}
                            >Gửi</div> : <div className='btn btn-secondary'>Gửi</div>}
                            <div className='btn btn-secondary btn-cancel' onClick={() => this.handlereport()}>Hủy</div>
                        </div>
                       </div>
                </div>}
                </div>

                {form  && 
                    <div className='formgooglepost'
                                onClick={() => this.linktoform(form.postId)}
                        title='Đăng ký form tại đây!'>
                        <img src={formicon} />
                        {openTitleForm === true && dayuntil && <div className='formgooglepost_title'>{ dayuntil}</div>}
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Post ));
