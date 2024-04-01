import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createcat } from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class AddCat extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    

    async componentDidMount() {
        
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


    handleSave = async () => {
        if (this.checkstate() === true) {
            let res = await createcat({
                name: this.state.name,
            })

            if (res && res.errCode === 0) {
                this.linkToManageAdmin();
                toast.success("Tạo danh mục mới thành công!");
                
            }
            else toast.error("Tạo danh mục mới không thành công!");
        }
    }

    checkstate = () => { 
        let result = true;
        if (this.state.name === null) { 
            alert("Vui lòng nhập tên danh mục!");
            result = false;
        }
        return result;
    }

    linkToManageAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/manage-cat` );
        }
    }

    handleOnkeyDown = (e) => {
        if (e.keyCode === 13 || e.keyCode === "Enter") {
            this.handleSave();
        }
    }

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }

    render ()
    {
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.add-cat"></FormattedMessage>
                </title>
                <div className=' manage'>
                     <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-cat")}><span><i className='fas fa-list'></i><FormattedMessage id="system.manage.manage-category"></FormattedMessage></span></li>
                        <li onClick={() => this.linkTouser("/system/add-cat")}><span><i className='fas fa-plus'></i><FormattedMessage id="system.manage.add-cat"></FormattedMessage></span></li>
                        </div>
                    </div>
                    <div className='right'>
                    <div className='title'><FormattedMessage id="system.manage.add-cat"></FormattedMessage></div>

                    <div className=' form-add-cat'>
                    <form>
                        <div className='form-group'>
                            <label><FormattedMessage id="system.manage.cat"></FormattedMessage>:</label>
                            <input type='text'
                                onChange={(event) => this.handleOnchangeInput(event, "name")}
                                onKeyDown={(event) => this.handleOnkeyDown(event)}
                            />
                        </div>

                        <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleSave()}
                            >
                                <FormattedMessage id="key.add"></FormattedMessage></div>
                        </div>
                    </form>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( AddCat ));
