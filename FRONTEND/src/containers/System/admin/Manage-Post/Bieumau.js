import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createbieumau, getbieumau, deletebieumau, updatebieumau, getbieumaubyword} from "../../../../services/userService"
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import PDFGenerator from './PDFGenerator ';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { isEmpty } from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */ );
class Bieumau extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: '',
            openform: false, 
            action: "create",
            listBieumau: [],
            id: ''
        }
    }

    

    async componentDidMount() {
        await this.getbieumaus();
    }

    getbieumaus = async () => {
        let res = await getbieumau();
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                listBieumau: res.data
            })
        }
        else this.setState({
            listBieumau: []
        })
    }

    handleSave = async () => {
        if (this.state.action === "create") {
            let res = await createbieumau({
            name: this.state.name,
            image: this.state.image,
            });
            if (res && res.errCode === 0) {
                toast.success("Thêm biểu mẫu thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })
                await this.getbieumaus();
            }
        else
            {
                toast.error("Thêm biểu mẫu không thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })

            }
         }
        else {
            let res = await updatebieumau({
            name: this.state.name,
                image: this.state.image,
            id: this.state.id
            });
            if (res && res.errCode === 0) {
                toast.success("Cập nhật biểu mẫu thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })
                await this.getbieumaus();
            }
        else
            {
                toast.error("Thêm biểu mẫu không thành công!");
                this.setState({
                    action: "create",
                    openform: false,
                    name: "",
                    image: "",
                    id: ''
                })

            }
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

    handleopenform = () => {
        this.setState({
            openform: !this.state.openform,
            name: '',
            image: '',
            id: '',
            action: "create",
        });

    }


    handleDeleteBieumau = async (id) => {
        alert("Bạn có chắc rằng bạn muốn xóa biểu mẫu này không!");
        await deletebieumau(id);
        toast.success("Xóa biểu mẫu thành công!");
        await this.getbieumaus();
    }

    handleEdit = (item) => {
        this.setState({
            name: item.name,
            image: item.image,
            id: item.id,
            action: "edit",
            openform: true
        })
    }

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    handleOchangeToSearch = async (event) => {
        
        if (event.target.value.length <= 0) {
           await this.getbieumaus();
        }
        else {
           let res = await getbieumaubyword(event.target.value);
        if (res && res.errCode === 0 && res.data.length > 0) {
            this.setState({
                listBieumau: res.data
            })
            }
            else this.setState({
            listBieumau: []
        })
        }
    }
    
    render ()
    {
        let { openform, listBieumau , name, image,  action} = this.state;
        return (
            <>
                <title>
                    Biểu mẫu
                </title>
                <div className='manage'>
                    <div className='left' style={{position: 'fixed', top: '112px', left: '0'}}>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/bieumau")}><span><i class="fas fa-align-right"></i>Quản lý biểu mẫu</span></li>
                        </div>
                    </div>
                    <div className='right' style={{ marginLeft: '222px', padding: '33px 30px' }}>
                            <div className='title py-3 mt-0'>Quản lý biểu mẫu</div>

                        <div className='search'>
                        <div className='form-search'>
                            <input type="text"
                                placeholder={this.props.language === 'vi' ? "Nhập để tìm biểu mẫu" : "Type to find the form"}
                                onChange={(event) => this.handleOchangeToSearch(event)}
                            />
                            <i className='fas fa-search'></i>
                        </div>
                    </div>
                        <div className=' bieumau' >
                   
                            {listBieumau && isEmpty(listBieumau) && "Không có biểu mẫu nào!"}
                            <div className="btn-add mt-3">
            <div
              className="btn btn-primary add"
              onClick={() => this.handleopenform()}
            >
              + Thêm biểu mẫu
            </div>
          </div>
                        <div className='list-user' style={{height: 'auto'}}>
                            <div className='table-list'>
                        <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th scope="col" className='stt'>STT</th>
                        <th scope="col">Biểu mẫu</th>
                        <th scope="col"><FormattedMessage id="key.action"></FormattedMessage></th>
                        </tr>
                    </thead>
                        <tbody>
                            {listBieumau && listBieumau.length > 0 && listBieumau.map((item, index) => {
                                return (
                                        <tr>
                                        <td className='tdstt'><p>{ index + 1}</p></td>
                                        <td><p>{ item.name}</p></td>
                                        <td className='action'>
                                            <p>
                                                <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleEdit(item)}
                            >
                                    <FormattedMessage id="key.edit"></FormattedMessage></div>
                                <div className='btn btn-danger mx-2'
                            onClick={() => this.handleDeleteBieumau(item.id)}
                            >
                                <FormattedMessage id="key.delete"></FormattedMessage></div>
                                            </p>
                                        </td>
                                        </tr>
                                )
                            })}

                        
                    </tbody>
                    </table>
                    </div>

                    </div>

                    
                    {openform === true &&
                    <div className='openform'>
                        <div className='openformContent'>
                            <div className='title'>{action === 'create' ? "Thêm" : "Sửa"} biểu mẫu</div>
                            <div className='form-group'>
                                <label>Tên biểu mẫu</label>
                                    <input type="text" value={name}
                                    onChange={(event) => this.handleOnchangeInput(event, "name")}
                                    />
                            </div>
                            <div className='form-group image'>
                                <label className='label_upload-img' htmlFor='reviewImg'>Link biểu mẫu </label>
                                <input type='text' className='form-controll-file'  value={image}
                                    onChange={(event) => this.handleOnchangeInput(event, 'image')}
                                />
                            </div>
                            <div className='button-sumit'>
                            <p>
                                                <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleSave()}
                            >
                                    <FormattedMessage id="key.save"></FormattedMessage></div>
                                <div className='btn btn-secondary mx-2'
                            onClick={() => this.handleopenform()}
                            >
                                <FormattedMessage id="key.cancel"></FormattedMessage></div>
                                            </p>
                                </div>
                                
                        </div>
                    </div>
                    }
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Bieumau ));
