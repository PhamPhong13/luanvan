import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../manage.scss";
import { withRouter } from "react-router";
import { getAllDoctor, deleteDoctor } from "../../../../services/userService";
import { toast } from "react-toastify";
class InforDoctor extends Component {
 
  render() {
    return (
      <>
        <title>
          <FormattedMessage id="doctor.infor-doctor" />
        </title>

        
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
  connect(mapStateToProps, mapDispatchToProps)(InforDoctor)
);
