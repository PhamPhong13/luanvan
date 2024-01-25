import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../manage.scss";
import { withRouter } from "react-router";
import { getAllDoctor, deleteDoctor } from "../../../../services/userService";
import { toast } from "react-toastify";
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      position: "",
      phone: "",
      image: "",
      roleId: "",
      listPatient: [],
      listPatientSearch: false,
    };
  }

  async componentDidMount() {
    this.getAllDoctors();
  }

  getAllDoctors = async () => {
    let res = await getAllDoctor();
    this.setState({
      listPatient: res.data,
      listPatientSearch: false,
    });
  };

  // move to link
  handleOnpenAddPatient = () => {
    if (this.props.history) {
      this.props.history.push(`/system/add-doctor`);
    }
  };

  linktoEdit = (id) => {
    if (this.props.history) {
      this.props.history.push(`/system/edit-doctor/${id}`);
    }
  };

  linktoInfor = (id) => {
    if (this.props.history) {
      this.props.history.push(`/system/info-doctor/${id}`);
    }
  };

  handleDeleteDoctor = async(id) => {
    alert("Bạn có chắc rằng muốn xóa tài khoản này không!");
    let res = await deleteDoctor(id);
    if(res && res.errCode === 0){
      this.getAllDoctors();
      toast.success("Doctor deleted successfully!");
    }
    else{
      toast.error("Doctor deleted fail!");
    }
  }

  builFullname = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  }

  removeSpace = (name) => {

    // Loại bỏ khoảng trắng dư thừa
    var chuoiDaLoaiBo = name.replace(/\s+/g, ' ');

    return chuoiDaLoaiBo; // In ra "PHAM THANH PHONG"

  }


  handleSearch = async (event) => {
    let keyword = this.removeAccents(event.target.value.toUpperCase());
    if (keyword.length > 0) {
      let result = [];
      let res = await getAllDoctor();
      res.data.map((item, index) => {
      let fullName = this.builFullname(item.firstName, item.lastName);
      let name = this.removeSpace(this.removeAccents(fullName.toUpperCase()));
      if (name.includes(keyword) === true) {
        result.push(item);
      }
      });

      if (result && result.length > 0) {
        this.setState({
          listPatient: result,
          listPatientSearch: false,
        });
      } else if (result && result.length == 0) {
        this.setState({
          listPatient: [],
          listPatientSearch: true,
        });
      }
    } else {
      this.getAllDoctors();
    }
  };


  removeAccents = (str) => {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  };

  render() {
    let { listPatient , listPatientSearch} = this.state;
    let placeholder =
      this.props.language === "vi" ? "Nhập để tìm kiếm" : "Type to search";
    return (
      <>
        <title>
          <FormattedMessage id="system.header.manage-doctor" />
        </title>

        <div className="container manage">
          <div className="title">
            <FormattedMessage id="system.header.manage-doctor" />
          </div>

          {/* form search */}
          <div className="form-search">
            <div className="form-group">
              <input type="text" placeholder={placeholder} 
              onChange={(event) => this.handleSearch(event)}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          {/* button add  */}
          <div className="btn-add mt-3">
            <div
              className="btn btn-primary add"
              onClick={() => this.handleOnpenAddPatient()}
            >
              + <FormattedMessage id="system.patient.add-account" />
            </div>
          </div>

          {/* Table patient */}
          <div className="table-patient">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Email</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Address</th>
                  <th scope="col">Position</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {listPatient &&
                  isEmpty(listPatient) &&
                  listPatientSearch === false && (
                    <div className="listnull">
                      <i>Danh sách rổng!</i>
                    </div>
                  )}
                {listPatient &&
                  isEmpty(listPatient) &&
                  listPatientSearch === true && (
                    <div className="listnull">
                      <i>Không tìm thấy bệnh nhân!</i>
                    </div>
                  )}

                {listPatient &&
                  !isEmpty(listPatient) &&
                  listPatient.reverse().map((item, index) => {
                    return (
                      <tr>
                        <td className="stt" scope="row">
                          {index + 1}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>
                          <div className="desc">
                          {item.address}
                          </div>
                        </td>
                        <td>{item.position}</td>
                        <td>{item.phone}</td>
                        <td className="action">
                          <button className="btn btn-primary btn-edit"
                          onClick={() => this.linktoInfor(item.id)}
                          >
                            <FormattedMessage id="system.btn.infor" />
                          </button>
                          <button className="btn btn-warning btn-edit"
                           onClick={() => this.linktoEdit(item.id)}>
                            <FormattedMessage id="system.btn.edit" />
                          </button>
                          <button className="btn btn-danger btn-delete"
                          onClick={() =>this.handleDeleteDoctor(item.id)}
                          >
                            <FormattedMessage id="system.btn.delete" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
  connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
);
