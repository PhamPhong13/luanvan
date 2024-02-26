import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { FormattedMessage } from 'react-intl';
import { updatecat, getcatById } from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import Select from 'react-select';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
class EditCat extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "",
        }
    }

    

    async componentDidMount() {
        let res = await getcatById(this.props.match.params.id);
        this.setState({
            name: res.data.name,
            id: res.data.id,
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


    handleSave = async () => {
        if (this.checkstate() === true) {
            let res = await updatecat({
                name: this.state.name,
                id: this.state.id,
            })

            if (res && res.errCode === 0) {
                this.linkToManageAdmin();
                toast.success("Cập nhật danh mục mới thành công!");
                
            }
            else toast.error("Cập nhật danh mục mới không thành công!");
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

    render ()
    {
        return (
            <>
                <title>
                    <FormattedMessage id="system.manage.edit-cat"></FormattedMessage>
                </title>
                <div className='container manage'>

                    <div className='title'><FormattedMessage id="system.manage.edit-cat"></FormattedMessage></div>

                </div>

                <div className='container form-add-cat'>
                    <form>
                        <div className='form-group'>
                            <label><FormattedMessage id="system.manage.manage-cat"></FormattedMessage>:</label>
                            <input type='text' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")}
                                onKeyDown={(event) => this.handleOnkeyDown(event)}
                            />
                        </div>

                        <div className='button-sumit'>
                            <div className='btn btn-primary btn-submit'
                            onClick={() => this.handleSave()}
                            >
                                <FormattedMessage id="key.change"></FormattedMessage></div>
                        </div>
                    </form>
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( EditCat ));
