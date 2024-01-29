import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "../manage.scss";
import { withRouter } from "react-router";
import { getClinic, deleteClinic } from "../../../../services/userService";
import { toast } from "react-toastify";
class ManageClinic extends Component {
  
  constructor(props) { 
    super(props);
    this.state = {
      listClinic: []
    };
  }

  async componentDidMount() {
    await this.getAllClinic();
  console.log(this.state)
  }

  getAllClinic = async () => {
    let res = await getClinic();
    console.log(res);
    if (res && res.errCode === 0 && !isEmpty(res.data)) {
      this.setState({
        listClinic: res.data
      });
    }
    else {
      this.setState({
        listClinic: []

      })
    }
  }
     // move to link
  handleOnpenAddClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/system/add-clinic`);
    }
  };

  handleDeleteClinic = async(id) => {
    alert("Bạn có chắc rằng muốn xóa phòng khám này không!");
    let res = await deleteClinic(id);
    if(res && res.errCode === 0){
      this.getAllClinic();
      toast.success("Clinic deleted successfully!");
    }
    else{
      toast.error("Clinic deleted fail!");
    }
  }

    render() {
      let { listClinic } = this.state;
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
          <div className="btn-add mt-3 mx-3">
            <div
              className="btn btn-primary add"
              onClick={() => this.handleOnpenAddClinic()}
            >
              + <FormattedMessage id="system.btn.add-clinic" />
            </div>
          </div>

              {/* list clinic */}
              <div className="container clinic">
                  {listClinic &&  listClinic.map((item, index) => {
                    return (
                      <>
                      <div className="clinic-content">
                        <div className="clinic-content-left">
                    {item.name}
                  </div>
                  <div className="clinic-content-right">
                    <button
                            className="btn btn-warning btn-edit"
                            /* onClick={() => this.linktoEdit(item.id)} */
                          >
                            <FormattedMessage id="system.btn.edit" />
                          </button>
                          <button
                            className="btn btn-danger btn-delete"
                            onClick={() => this.handleDeleteClinic(item.id)}
                          >
                            <FormattedMessage id="system.btn.delete" />
                          </button>
                  </div>
                </div>
                      </>
                    )
                  })}
                {listClinic && listClinic.length <= 0 && <div className="listnull">
                Danh sách rổng!</div>}
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
