import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../manage.scss";
import { withRouter } from "react-router";
import { getAllPatient, deletePatient } from "../../../../services/userService";
import { toast } from "react-toastify";
class ManageClinic extends Component {
  

     // move to link
  handleOnpenAddClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/system/add-clinic`);
    }
  };

    render() {
    
        return (
            <>
                <title>
          <FormattedMessage id="system.header.manage-clinic" />
        </title>

        <div className="container manage">
          <div className="title">
            <FormattedMessage id="system.header.manage-clinic" />
          </div>

          {/* form search */}
          <div className="form-search">
            <div className="form-group">
              <input
                type="text"
                onChange={(event) => this.handleSearch(event)}
                /* placeholder={placeholder} */
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          {/* button add  */}
          <div className="btn-add mt-3">
            <div
              className="btn btn-primary add"
              onClick={() => this.handleOnpenAddClinic()}
            >
              + <FormattedMessage id="system.patient.add-account" />
            </div>
          </div>

          <div className="table-patient">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Email</th>
                  <th scope="col">FullName</th>
                  <th scope="col">Address</th>
                  <th scope="col">Birthday</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
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
  connect(mapStateToProps, mapDispatchToProps)(ManageClinic)
);
