import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getnhiemkyById , getmenberById, createmenber, deletemenber} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import avatar from "../../../../assets/340439352_964862588007237_5460541469979575194_n.jpg"
class EditTunure extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            check0: false,
            check1: false,
            check2: false,
            user:"",
            user1:"",
            user2: "",
            add1: false,
            add2: false,
            add3: false,
            addform1: false,
            addform2: false,
            addform3: false,
            image: '',
            fullName: '',
            email: "",
            phone: "",
            desc: "",
            inunion: "",
        }
    }

    

    async componentDidMount() {
        this.setState({
            name: "",
            check0: false,
            check1: false,
            check2: false,
            user:"",
            user1:"",
            user2: "",
            add1: false,
            add2: false,
            add3: false,
            addform1: false,
            addform2: false,
            addform3: false,
            image: '',
            fullName: '',
            email: "",
            phone: "",
            desc: "",
            inunion: "",
        })
        await this.getnhiemky();
        
    }


    checkMenber = async () => {
        let user = await getmenberById(this.props.match.params.id, '0');
        let user1 = await getmenberById(this.props.match.params.id, '1');
        let user2 = await getmenberById(this.props.match.params.id, '2');
        // cht
        if (user && user.errCode === 0) {
            this.setState({
                user: user.data,
                check0: true
            })
        }
        else {
            this.setState({
                user: "",
                check0: false,
                add1: true
            })
        }

        // chp
        if (user1 && user1.errCode === 0) {
            this.setState({
                user1: user1.data,
                check1: true
            })
        }
        else {
            this.setState({
                user1: "",
                check1: false,
                add2: true

            })
        }

        //uv
        if (user2 && user2.errCode === 0) {
            this.setState({
                user2: user2.data,
                check2: true
            })
        }
        else {
            this.setState({
                user2: "",
                check2: false,
                add3: true
            })
        }


    }

    getnhiemky = async () => {
        let res = await getnhiemkyById(this.props.match.params.id);
        this.setState({
            name: res.data.name
        })

        await this.checkMenber();
    }

    getmenber = async (position) => {
        let res = await getmenberById(this.props.match.params.id, position);
    }

    async componentDidUpdate(prevProps) {
        
    }

    handleOnchangeInput = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }


    add1 = async () => {
        this.setState({
            addform1: !this.state.addform1
        })
    }
    add2 = async () => {
        this.setState({
            addform2: !this.state.addform2
        })
    }

     add3 = async () => {
        this.setState({
            addform3: !this.state.addform3
        })
    }
   
    handleOnkeyDown = (e) => {
        if (e.keyCode === 13 || e.keyCode === "Enter") {
            this.createnhiemky();
        }
    }

    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                image: getBase64
            })
        }

    }

    handleSaveMenber = async (position) => {
        let res = await createmenber({
            email: this.state.email,
            fullName: this.state.fullName,
            phone: this.state.phone,
            position: position,
            image: this.state.image,
            desc: this.state.desc,
            nhiemky: this.props.match.params.id,
            inunion: this.state.inunion
        })
        if (res && res.errCode === 0) {
            await this.checkMenber();
            this.add1();
            this.setState({
                addform1: false,
                addform2: false,
                addform3: false,
                image: '',
                fullName: '',
                email: "",
                phone: "",
                desc: "",
                inunion: "",
            })
            toast.success("Thêm thành viên thành công");
        }
        else {
            toast.error("Thêm thành viên không thành công");
        }
    }

    deleteUser = async (id) =>{
        let res = await deletemenber(id);
        if (res && res.errCode === 0) {
             await this.checkMenber();
            this.setState({
                add1: true,
                add2: true,
                add3: true,
                image: '',
                fullName: '',
                email: "",
                phone: "",
                desc: "",
                inunion: "",
            })
            toast.success("Xóa thành viên thành công");
        }
        else {
            toast.error("Xóa thành viên không thành công");
        }
    }

    render ()
    {
        let { name , user, user2, add3, addform3, add1, add2, user1, addform1,addform2, image, email, fullName, phone, inunion, desc} = this.state;
        return (
            <>
                <title>
                    Nhiệm kỳ { name }
                </title>
                <div className='container manage tunure'>

                    <div className='title'>chi hội sinh viên bình tân</div>
                    <div className='text-center name-nhiemky'>Nhiệm kỳ {name}</div>
                    <div className='text-center name-nhiemky'>-------------- + --------------</div>

                </div>

                <div className='menber'>
                    <div className='nameposition'>
                        Chi hội trưởng
                    </div>
                    {user === '' && add1 === true && 
                        <div className='btn-add'>
                            <div className='btn btn-primary'
                            onClick={() => this.add1()}
                            >
                                Thêm thành viên    
                            </div>
                        </div>

                        
                    }
                    {addform1 === true &&
                    <div className='position-content addM'>
                        <img src={image} />
                        <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                <input hidden type='file' className='form-controll-file' id="reviewImg"
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                        <div className='name'>
                                <div className='label'>Họ tên:</div><input type='text' value={fullName}
                                onChange={(event) => this.handleOnchangeInput(event, "fullName")}
                                />
                        </div>
                         <div className='name'>
                                <div className='label'>Email:</div><input type='text' value={email}
                                onChange={(event) => this.handleOnchangeInput(event, "email")}/>
                            </div>

                         <div className='name'>
                                <div className='label'>Phone:</div><input type='text' value={phone}
                                onChange={(event) => this.handleOnchangeInput(event, "phone")}/>
                            </div>

                         <div className='name'>
                                <div className='label'>Ngày vào đoàn:</div><input type='text' value={inunion}
                                onChange={(event) => this.handleOnchangeInput(event, "inunion")}/>
                            </div>
                            
                        <div className='name label'>
                            <label>Thông tin:</label>
                                <textarea
                                    onChange={(event) => this.handleOnchangeInput(event, "desc")}
                                    value={desc}></textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-primary' onClick={() => this.handleSaveMenber("0")}>Lưu</div>
                            <div className='btn btn-secondary btn-delete' onClick={() => this.add1()}>Hủy</div>
                        </div>
                    </div>
                    }
                    {user && addform1 === false && 
                    <div className='position-content'>
                        <img src={user.image} />
                        
                        <div className='name'>
                            <div className='label'>Họ tên:</div><input type='text' value={user.fullName}/>
                        </div>
                         <div className='name'>
                            <div className='label'>Email:</div><input type='text' value={user.email}/>
                            </div>

                         <div className='name'>
                            <div className='label'>phone:</div><input type='text' value={user.phone}/>
                            </div>

                         <div className='name'>
                            <div className='label'>ngày vào đoàn:</div><input type='text' value={user.inunion}/>
                            </div>
                            
                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea >
                                {user.desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit'>Sửa</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.deleteUser(user.id)}>Xóa</div>
                        </div>
                    </div>
                    }
                </div>

                <div className='menber'>
                    <div className='nameposition'>
                        Chi hội phó
                    </div>
                    {user1 === '' && add2 === true && 
                        <div className='btn-add'>
                            <div className='btn btn-primary'
                            onClick={() => this.add2()}
                            >
                                Thêm thành viên    
                            </div>
                        </div>

                        
                    }
                    {addform2 === true &&
                    <div className='position-content addM'>
                        <img src={image} />
                        <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                <input hidden type='file' className='form-controll-file' id="reviewImg"
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                        <div className='name'>
                                <div className='label'>Họ tên:</div><input type='text' value={fullName}
                                onChange={(event) => this.handleOnchangeInput(event, "fullName")}
                                />
                        </div>
                         <div className='name'>
                                <div className='label'>Email:</div><input type='text' value={email}
                                onChange={(event) => this.handleOnchangeInput(event, "email")}/>
                            </div>

                         <div className='name'>
                                <div className='label'>Phone:</div><input type='text' value={phone}
                                onChange={(event) => this.handleOnchangeInput(event, "phone")}/>
                            </div>

                         <div className='name'>
                                <div className='label'>Ngày vào đoàn:</div><input type='text' value={inunion}
                                onChange={(event) => this.handleOnchangeInput(event, "inunion")}/>
                            </div>
                            
                        <div className='name label'>
                            <label>Thông tin:</label>
                                <textarea
                                    onChange={(event) => this.handleOnchangeInput(event, "desc")}
                                    value={desc}></textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-primary' onClick={() => this.handleSaveMenber("1")}>Lưu</div>
                            <div className='btn btn-secondary btn-delete' onClick={() => this.add2()}>Hủy</div>
                        </div>
                    </div>
                    }
                    {user1 && addform2 === false && 
                    <div className='position-content'>
                        <img src={user1.image} />
                        
                        <div className='name'>
                            <div className='label'>Họ tên:</div><input type='text' value={user1.fullName}/>
                        </div>
                         <div className='name'>
                            <div className='label'>Email:</div><input type='text' value={user1.email}/>
                            </div>

                         <div className='name'>
                            <div className='label'>phone:</div><input type='text' value={user1.phone}/>
                            </div>

                         <div className='name'>
                            <div className='label'>ngày vào đoàn:</div><input type='text' value={user1.inunion}/>
                            </div>
                            
                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea >
                                {user1.desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit'>Sửa</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.deleteUser(user1.id)}>Xóa</div>
                        </div>
                    </div>
                    }
                </div>

                <div className='menber'>
                    <div className='nameposition'>
                        Ủy viên ban chấp hành
                    </div>
                    {user2 === '' && add3 === true && 
                        <div className='btn-add'>
                            <div className='btn btn-primary'
                            onClick={() => this.add3()}
                            >
                                Thêm thành viên    
                            </div>
                        </div>

                        
                    }
                    {addform3 === true &&
                    <div className='position-content addM'>
                        <img src={image} />
                        <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                <input hidden type='file' className='form-controll-file' id="reviewImg"
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                        <div className='name'>
                                <div className='label'>Họ tên:</div><input type='text' value={fullName}
                                onChange={(event) => this.handleOnchangeInput(event, "fullName")}
                                />
                        </div>
                         <div className='name'>
                                <div className='label'>Email:</div><input type='text' value={email}
                                onChange={(event) => this.handleOnchangeInput(event, "email")}/>
                            </div>

                         <div className='name'>
                                <div className='label'>Phone:</div><input type='text' value={phone}
                                onChange={(event) => this.handleOnchangeInput(event, "phone")}/>
                            </div>

                         <div className='name'>
                                <div className='label'>Ngày vào đoàn:</div><input type='text' value={inunion}
                                onChange={(event) => this.handleOnchangeInput(event, "inunion")}/>
                            </div>
                            
                        <div className='name label'>
                            <label>Thông tin:</label>
                                <textarea
                                    onChange={(event) => this.handleOnchangeInput(event, "desc")}
                                    value={desc}></textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-primary' onClick={() => this.handleSaveMenber("2")}>Lưu</div>
                            <div className='btn btn-secondary btn-delete' onClick={() => this.add3()}>Hủy</div>
                        </div>
                    </div>
                    }
                    {user2 && addform3 === false && 
                    <div className='position-content'>
                        <img src={user2.image} />
                        
                        <div className='name'>
                            <div className='label'>Họ tên:</div><input type='text' value={user2.fullName}/>
                        </div>
                         <div className='name'>
                            <div className='label'>Email:</div><input type='text' value={user2.email}/>
                            </div>

                         <div className='name'>
                            <div className='label'>phone:</div><input type='text' value={user2.phone}/>
                            </div>

                         <div className='name'>
                            <div className='label'>ngày vào đoàn:</div><input type='text' value={user2.inunion}/>
                            </div>
                            
                        <div className='name label'>
                            <label>Thông tin:</label>
                            <textarea >
                                {user2.desc}
                            </textarea>
                        </div>
                        <div className='btn-sumit'>
                            <div className='btn btn-warning btn-edit'>Sửa</div>
                            <div className='btn btn-danger btn-delete' onClick={() => this.deleteUser(user2.id)}>Xóa</div>
                        </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( EditTunure ));
