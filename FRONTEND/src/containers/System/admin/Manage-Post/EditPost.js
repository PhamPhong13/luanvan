import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { getAllcat , updatepost, getpostById} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */ );
class EditPost extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            catId: '',
            image: '',
            descMarkdown: "",
            descHTML: "",
            listCat: [],
            selectedCat: '',
            id: '',
        }
    }

    

    async componentDidMount() {
        await this.getAllCategory();
        await this.getPostById();
        
    }

    getSelectedCat =  (catId) => {
        let { listCat } = this.state;
        let selected = listCat.find( item =>
        {
            return item && item.value === +catId
        } )
        this.setState({
            selectedCat: selected,
            catId: selected 
        })
    }

    getPostById = async () => {
        let res = await getpostById(this.props.match.params.id);
        this.setState({
            name: res.data.name,
            catId: res.data.catId,
            image: res.data.image,
            descHTML: res.data.descHTML,
            descMarkdown: res.data.descMarkdown,
            id: this.props.match.params.id

        })

        this.getSelectedCat(this.state.catId)
        
    }

    getAllCategory = async () => {
        let res = await getAllcat();
        let result = [];
        res.data.forEach(element => {
            result.push( { value: element.id, label: element.name } );
        });

        this.setState({
            listCat: result
        })
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

    handleChangeSelect = (selected) => {
        this.setState({
            selectedCat: selected,
            catId: selected.value
        })
    }

    handleEditorChange = ( { html, text } ) =>
    {
        this.setState( {
            descMarkdown: text,
            descHTML: html,
        } )
    }

    handleSave = async () => {
        console.log(this.state)
        let res = await updatepost({
                name: this.state.name,
                catId: this.state.catId.value,
                descHTML: this.state.descHTML,
                descMarkdown: this.state.descMarkdown,
                image: this.state.image,
                id: this.state.id
            })

            if (res && res.errCode === 0) {
                this.linkToManageAdmin();
                toast.success("Cập nhật bài viết mới thành công!");
                
            }
            else toast.error("Cập nhật bài viết mới không thành công!");
    }

    linkToManageAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/manage-post` );
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

    render ()
    {
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.edit-post"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.edit-post"></FormattedMessage></div>

                </div>

                <div className='container Addpost'>
                    <div className='addpost-content'>
                        <div className='top'>
                            <div className='form-group'>
                                <label><FormattedMessage id="key.name-post"></FormattedMessage>:</label>
                                <input type='text' value={this.state.name}
                                    onChange={(event) => this.handleOnchangeInput(event, "name")}
                                />
                            </div>
                            <div className='form-group'>
                                <label><FormattedMessage id="key.choose-cat"></FormattedMessage>:</label>
                                <Select
                                        value={ this.state.selectedCat }
                                        onChange={ this.handleChangeSelect }
                                        options={ this.state.listCat }
                                        placeholder={ <FormattedMessage id="system.manage.cat" /> }
                                    />
                            </div>
                            <div className='form-group image'>
                                <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                <input type='file' className='form-controll-file' 
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />
                            </div>
                        </div>

                        <div className='down'>
                            <div className=''><FormattedMessage id="key.content-post"></FormattedMessage>: </div>
                            
                            <MdEditor
                            style={ { height: '400px' } }
                            renderHTML={ text => mdParser.render( text ) }
                            onChange={ this.handleEditorChange }
                            value={ this.state.descMarkdown }
                        />
                        </div>

                        <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleSave()}
                            >
                                <FormattedMessage id="key.change"></FormattedMessage></div>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( EditPost ));
