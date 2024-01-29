import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManagePatient from "../containers/System/admin/patient/ManagePatient";
import SystemHome from "../containers/System/admin/SystemHome";
import Header from "../containers/Header/Header";
import AddPatient from "../containers/System/admin/patient/AddPatient";
import EditPatient from "../containers/System/admin/patient/EditPatient";

import ManageAdmin from "../containers/System/admin/ManageAdmin";

import ManageDoctor from "../containers/System/admin/doctor/ManageDoctor";
import AddDoctor from "../containers/System/admin/doctor/AddDoctor";
import EditDoctor from "../containers/System/admin/doctor/EditDoctor";
import InforDoctor from "../containers/System/admin/doctor/InforDoctor";

import ManageClinic from "../containers/System/admin/Clinic/ManageClinic";
import AddClinic from "../containers/System/admin/Clinic/AddClinic";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              {/* patient */}
              <Route path="/system/manage-patient" component={ManagePatient} />
              <Route path="/system/add-patient" component={AddPatient} />
              <Route path="/system/edit-patient/:id" component={EditPatient} />

              {/* admin */}
              <Route path="/system/manage-admin" component={ManageAdmin} />

               {/* clinic */}
              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route path="/system/add-clinic" component={AddClinic} />

              {/* doctor */}
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route path="/system/add-doctor" component={AddDoctor} />
              <Route path="/system/edit-doctor/:id" component={EditDoctor} />
              <Route path="/system/info-doctor/:id" component={InforDoctor} />
              
              <Route path="/system/home" component={SystemHome} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
