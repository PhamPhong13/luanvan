import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import {
    getAllpostById, getcatById, getpostById,
    getlikepostById, createlikepost, deletelikepost,
    updatepost, createhistory, createreport, getformbyid

} from '../../services/userService';
import Header from './Header';
import Comment from './Comment';
import Footer from './Footer';
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
            form: ""
        }
    }

    async componentDidMount() {
        await this.getpost();
        await this.setCount();    
        await this.getform(this.props.match.params.id)
    }

    getform = async (id) => {
        let res = await getformbyid(id);
        if (res && res.errCode === 0) {
            this.setState({
                form: res.data
            })
        }
        else this.setState({
            form: ""
        })
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
        console.log(this.state.post)
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

    render ()
    {
        let { post,form, cat, thu, day, postbycat, id, likepost, openReport , senReport, imageReport } = this.state;
        return (
            <>
                <title>
                     {post.name}
                </title>
                <Header /> 
                
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

                {form !== '' && 
                <div className='formgooglepost'>
                    link đăng ký
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
