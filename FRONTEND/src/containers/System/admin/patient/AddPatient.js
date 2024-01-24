import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../AddUser.scss";
import { createPatient, getAllcode } from "../../../../services/userService";

import Select from "react-select";
import DatePicker from "../../../../components/Input/DatePicker";
import { Toast, toast } from "react-toastify";
import { withRouter } from "react-router";
class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      address: "",
      birthday: "",
      phone: "",
      gender: "",
      roleId: "R3",
      listGender: [],
      selectedGender: "",
    };
  }

  async componentDidMount() {
    await this.getGender();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      await this.getGender();
    }
  }

  getGender = async () => {
    let res = await getAllcode("GENDER");
    let result = [];
    if (res.data && res.data.length > 0) {
      res.data.map((item, index) => {
        let object = {};
        let labelEn = `${item.valueEn}`;
        let labelVi = `${item.valueVi}`;
        object.label = this.props.language === "vi" ? labelVi : labelEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    this.setState({
      listGender: result,
    });
  };

  handleChangeGender = (selectGender) => {
    this.setState({
      selectedGender: selectGender,
      gender: selectGender.value,
    });
  };

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleAddPatient = async () => {
    let checkState = this.checkState();
    if (checkState === true) {
      let res = await createPatient({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        address: this.state.address,
        birthday: this.state.birthday,
        phone: this.state.phone,
        gender: this.state.gender,
        roleId: this.state.roleId,
      });

      if (res && res.errCode === 0) {
        toast.success("Create a new patient successfully!");
        this.linkto();
      } else if (res && res.errCode === 3) {
        toast.error("Email already exists!");
      } else {
        toast.error("Create a new patient failed!");
      }
    }
  };

  checkState = () => {
    let isValid = true;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.state.email)) {
      alert("Email does not match!");
      isValid = false;
    } else if (this.state.password.length <= 7) {
      alert("Password must be at least 8 characters!");
      isValid = false;
    } else if (this.state.fullName.length <= 0) {
      alert("Please enter your fullName!");
      isValid = false;
    } else if (this.state.birthday.length <= 0) {
      alert("Please enter your date of birth!");
      isValid = false;
    } else if (this.state.phone.length < 10) {
      alert("Incorrect phone number!");
      isValid = false;
    } else if (!this.state.gender) {
      alert("Please select gender!");
      isValid = false;
    }
    return isValid;
  };

  linkto = () => {
    if (this.props.history) {
      this.props.history.push(`/system/manage-patient`);
    }
  };
  render() {
    let { listGender, selectedGender, birthday } = this.state;
    return (
      <>
        <title>
          <FormattedMessage id="system.add.add-patient" />
        </title>

        <div className="container adduser">
          <div className="title">
            <FormattedMessage id="system.add.add-patient" />
          </div>

          <div className="form">
            <form className="form-adduser">
              {/* email */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.email" />
                </label>
                <input
                  type="text"
                  onChange={(event) => this.handleOnchangeInput(event, "email")}
                />
              </div>
              {/* password */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.password" />
                </label>
                <input
                  type="password"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "password")
                  }
                />
              </div>
              {/* fullname */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.fullname" />
                </label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "fullName")
                  }
                />
              </div>

              {/* birthday */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.birthday" />
                </label>
                <DatePicker
                  className="form-control date"
                  onChange={this.handleOnchangeDatePicker}
                  /* value={this.state.birthday} */
                  selected={this.state.birthday}
                  /* minDate={
                    new Date(new Date().setDate(new Date().getDate() - 1))
                  } */
                />
              </div>
              {/* phone */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.phone" />
                </label>
                <input
                  type="text"
                  onChange={(event) => this.handleOnchangeInput(event, "phone")}
                />
              </div>
              {/* gender */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.gender" />
                </label>
                <Select
                  options={listGender}
                  value={this.state.selectedGender}
                  onChange={this.handleChangeGender}
                  placeholder={<FormattedMessage id="key.gender" />}
                  name="selectGender"
                />
              </div>
              {/* address */}
              <div className="form-group address">
                <label>
                  <FormattedMessage id="key.address" />
                </label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                />
              </div>

              {/* button add */}
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
  connect(mapStateToProps, mapDispatchToProps)(AddPatient)
);
