import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../AddUser.scss";
import { createDoctor, getAllcode } from "../../../../services/userService";
import { CommonUtils } from "../../../../utils"; // vi or en
import Select from "react-select";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      image: "",
      previewImg: "",
      position: "",
      roleId: "R2",
      listPositon: [],
      selectedPositon: "",
    };
  }

  async componentDidMount() {
    await this.getPosition();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      await this.getPosition();
    }
  }

  getPosition = async () => {
    let res = await getAllcode("POSITION");
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
      listPositon: result,
    });
  };

  handleChangeGender = (selectPosition) => {
    this.setState({
      selectedPositon: selectPosition,
      position: selectPosition.value,
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
      let res = await createDoctor({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phone: this.state.phone,
        position: this.state.position,
        image: this.state.image,
        roleId: this.state.roleId,
      });

      if (res && res.errCode === 0) {
        toast.success("Create a new doctor successfully!");
        this.linkto();
      } else if (res && res.errCode === 3) {
        toast.error("Email already exists!");
      } else {
        toast.error("Create a new doctor failed!");
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
    } else if (this.state.firstName.length <= 0) {
      alert("Please enter your firstName!");
      isValid = false;
    } else if (this.state.lastName.length <= 0) {
      alert("Please enter your lastName!");
      isValid = false;
    } else if (this.state.phone.length < 10) {
      alert("Incorrect phone number!");
      isValid = false;
    }
    return isValid;
  };

  linkto = () => {
    if (this.props.history) {
      this.props.history.push(`/system/manage-doctor`);
    }
  };

  handleOnchangeImg = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let getBase64 = await CommonUtils.getBase64(file);
      this.setState({
        image: getBase64,
      });
    }
  };

  render() {
    let { listPositon, selectedPositon, birthday, image } = this.state;
    console.log(this.state);
    return (
      <>
        <title>
          <FormattedMessage id="system.add.add-doctor" />
        </title>

        <div className="container adduser">
          <div className="title">
            <FormattedMessage id="system.add.add-doctor" />
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
              {/* firstname */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.firstname" />
                </label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "firstName")
                  }
                />
              </div>

              {/* lastname */}
              <div className="form-group">
                <label>
                  <FormattedMessage id="key.lastname" />
                </label>
                <input
                  type="text"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "lastName")
                  }
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

              {/* phone */}
              <div className="form-group adddoctor">
                <label>
                  <FormattedMessage id="key.phone" />
                </label>
                <input
                  type="text"
                  onChange={(event) => this.handleOnchangeInput(event, "phone")}
                />
              </div>

              {/* position */}
              <div className="form-group adddoctor">
                <label>
                  <FormattedMessage id="key.position" />
                </label>
                <Select
                  options={listPositon}
                  value={this.state.selectedPositon}
                  onChange={this.handleChangeGender}
                  placeholder={<FormattedMessage id="key.position" />}
                  name="selectPosition"
                />
              </div>

              {/* gender */}
              <div className="form-group adddoctor">
                <label>
                  <FormattedMessage id="key.image" />
                </label>
                <input
                  type="file"
                  className="form-controll-file"
                  onChange={(event) => this.handleOnchangeImg(event)}
                />
                {image && image !== "" && <img src={image} />}
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
  connect(mapStateToProps, mapDispatchToProps)(AddDoctor)
);
