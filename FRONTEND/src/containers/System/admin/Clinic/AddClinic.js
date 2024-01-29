import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../AddUser.scss";
import { createPatient, getAllcode } from "../../../../services/userService";
import {  CommonUtils } from '../../../../utils'; // vi or en
import Select from "react-select";
import DatePicker from "../../../../components/Input/DatePicker";
import { Toast, toast } from "react-toastify";
import { withRouter } from "react-router";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class AddClinic extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            name: "",
            image: "",
            descMarkdown: "",
            descHTML: "",
        }
    }


  linkto = () => {
    if (this.props.history) {
      this.props.history.push(`/system/manage-patient`);
    }
    };
    
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                image: getBase64
            })
        }
    }

    handleOnchangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate
        })
    }

    handleEditorChange = ( { html, text } ) =>
    {
        this.setState( {
            descMarkdown: text,
            descHTML: html,
        } )
    }

    render() {
    return (
      <>
        <title>
          <FormattedMessage id="system.add.add-clinic" />
        </title>

        <div className="container adduser">
          <div className="title">
            <FormattedMessage id="system.add.add-clinic" />
          </div>

          <div className="form">
            <form className="form-adduser">
              {/* name */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.name-clinic" /> :
                </label>
                <input
                  type="text"
                  onChange={(event) => this.handleOnchangeInput(event, "name")}
                />
              </div>
              {/* password */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.image-clinic" />:
                </label>
                            <input type="file"
                                className="form-control-file"
                                id="reviewImg" 
                                               
                                onChange={(event) => this.handleOnchangeImg(event)} />
              </div>
             
            <div className="markdown">
              <label><FormattedMessage id="doctor.infor-detail" /> :</label>
                    <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />  
                        </div>
                        
                         <div className="button-add ">
                <div
                  className="btn btn-primary btn-add"
                  onClick={() => this.handleAddPatient()}
                >
                  <FormattedMessage id="system.btn.add" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddClinic)
);
