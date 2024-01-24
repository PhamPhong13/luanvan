import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../manage.scss";
import { withRouter } from "react-router";
import { getAllPatient, deletePatient } from "../../../../services/userService";
import { toast } from "react-toastify";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPatient: [],
      listPatientSearch: false,
    };
  }

  async componentDidMount() {
    this.getAllPatients();
  }

  getAllPatients = async () => {
    let res = await getAllPatient();
    this.setState({
      listPatient: res.data,
      listPatientSearch: false,
    });
  };

  // move to link
  handleOnpenAddPatient = () => {
    if (this.props.history) {
      this.props.history.push(`/system/add-patient`);
    }
  };

  linktoEdit = (id) => {
    if (this.props.history) {
      this.props.history.push(`/system/edit-patient/${id}`);
    }
  };

  getngay = (ngay) => {
    // Chuyển đổi ngày thành đối tượng Date
    var ngayObj = new Date(ngay);

    // Lấy các thành phần của ngày
    var nam = ngayObj.getFullYear();
    var thang = ngayObj.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    var ngayTrongThang = ngayObj.getDate();

    // Định dạng lại ngày theo dạng ngược lại
    var ngayNgocLai = ngayTrongThang + "/" + thang + "/" + nam;
    return ngayNgocLai;
  };

  handleDeletePatient = async (id) => {
    alert("Bạn có chắc rằng muốn xóa tài khoản này không!");
    let res = await deletePatient(id);
    if (res && res.errCode === 0) {
      toast.success("Delete patientt successfully!");
      this.getAllPatients();
    } else toast.error("Delete patientt faild!");
  };

  handleSearch = async (event) => {
    let keyword = this.removeAccents(event.target.value.toUpperCase());
    if (keyword.length > 0) {
      let { listPatient } = this.state;
      let result = [];
      let res = await getAllPatient();
      res.data.map((item, index) => {
        let fullName = this.removeAccents(item.fullName.toUpperCase());
        if (fullName.includes(keyword) === true) {
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
      this.getAllPatients();
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
    let { listPatient, listPatientSearch } = this.state;
    let placeholder =
      this.props.language === "vi" ? "Nhập để tìm kiếm" : "Type to search";
    return (
      <>
        <title>
          <FormattedMessage id="system.header.manage-patient" />
        </title>

        <div className="container manage">
          <div className="title">
            <FormattedMessage id="system.header.manage-patient" />
          </div>

          {/* form search */}
          <div className="form-search">
            <div className="form-group">
              <input
                type="text"
                onChange={(event) => this.handleSearch(event)}
                placeholder={placeholder}
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
                  <th scope="col">FullName</th>
                  <th scope="col">Address</th>
                  <th scope="col">Birthday</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Gender</th>
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
                        <td>{item.fullName}</td>
                        <td>{item.address}</td>
                        <td>{this.getngay(item.birthday)}</td>
                        <td>{item.phone}</td>
                        <td>
                          {this.props.language === "vi" &&
                            item.gender === "M" &&
                            "Nam"}
                          {this.props.language === "vi" &&
                            item.gender === "F" &&
                            "Nữ"}
                          {this.props.language === "vi" &&
                            item.gender === "O" &&
                            "Khác"}
                          {this.props.language === "en" &&
                            item.gender === "M" &&
                            "Male"}
                          {this.props.language === "en" &&
                            item.gender === "F" &&
                            "Female"}
                          {this.props.language === "en" &&
                            item.gender === "O" &&
                            "Other"}
                        </td>
                        <td className="action">
                          <button
                            className="btn btn-warning btn-edit"
                            onClick={() => this.linktoEdit(item.id)}
                          >
                            <FormattedMessage id="system.btn.edit" />
                          </button>
                          <button
                            className="btn btn-danger btn-delete"
                            onClick={() => this.handleDeletePatient(item.id)}
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
  connect(mapStateToProps, mapDispatchToProps)(ManagePatient)
);
