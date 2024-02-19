import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SystemHome from "../containers/System/admin/SystemHome";
import Header from "../containers/Header/Header";

import ManageAdmin from "../containers/System/admin/Manage-user/ManageAdmin";
import AddAdmin from "../containers/System/admin/Manage-user/AddAdmin";
import EditAdmin from "../containers/System/admin/Manage-user/EditAdmin";

import ManageUser from "../containers/System/admin/Manage-user/ManageUser";
import AddUser from "../containers/System/admin/Manage-user/AddUser";
import EditUser from "../containers/System/admin/Manage-user/EditUser";

import ManageCat from "../containers/System/admin/Manage-category/ManageCat";
import AddCat from "../containers/System/admin/Manage-category/AddCat";
import EditCat from "../containers/System/admin/Manage-category/EditCat";

import ManagePost from "../containers/System/admin/Manage-Post/ManagePost";
import AddPost from "../containers/System/admin/Manage-Post/AddPost";
import EditPost from "../containers/System/admin/Manage-Post/EditPost";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              
              {/* admin */}
              <Route path="/system/manage-admin" component={ManageAdmin} />
              <Route path="/system/add-admin" component={AddAdmin} />
              <Route path="/system/edit-admin/:id" component={EditAdmin} />

              {/* admin */}
              <Route path="/system/manage-user" component={ManageUser} />
              <Route path="/system/add-user" component={AddUser} />      
              <Route path="/system/edit-user/:id" component={EditUser} />

              <Route path="/system/manage-cat" component={ManageCat} />
              <Route path="/system/add-cat" component={AddCat} />      
              <Route path="/system/edit-cat/:id" component={EditCat} />

              <Route path="/system/manage-post" component={ManagePost} />
              <Route path="/system/add-post" component={AddPost} />      
              <Route path="/system/edit-post/:id" component={EditPost} />

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
