import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { createnhiemky } from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class AddTunure extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: ""
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


    handleSave = async () => {
        if (this.checkstate() === true) {
            let res = await createnhiemky({
                name: this.state.name,
            })

            if (res && res.errCode === 0) {
                this.linkToManageAdmin();
                toast.success("Tạo nhiệm kỳ mới thành công!");
                
            }
            else toast.error("Tạo nhiệm kỳ mới không thành công!");
        }
    }

    checkstate = () => { 
        let result = true;
        if (this.state.name === null) { 
            alert("Vui lòng nhập tên nhiệm kỳ!");
            result = false;
        }
        return result;
    }

    linkToManageAdmin = () => {
        if ( this.props.history )
        {
            this.props.history.push( `/system/manage-nhiemky` );
        }
    }

    handleOnkeyDown = (e) => {
        if (e.keyCode === 13 || e.keyCode === "Enter") {
            this.createnhiemky();
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
                    Thêm nhiệm kỳ
                </title>
                <div className='manage'>

                    <div className='left'>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-nhiemky")}><span><i className='fas fa-user-tie'></i>Quản lý nhiệm kỳ</span></li>
                            <li onClick={() => this.linkTouser("/system/add-tunure")}><span><i className='fas fa-plus'></i>Thêm nhiệm kỳ</span>
                            </li>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='title'>Thêm nhiệm kỳ</div>
                    <div className='container form-add-cat'>
                    <form>
                        <div className='form-group'>
                            <label>Nhiệm kỳ: <i>(nhập nhiệm kỳ theo dạng 20xx-20xx)</i></label>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( AddTunure ));
