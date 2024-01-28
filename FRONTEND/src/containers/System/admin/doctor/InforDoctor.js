import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "./InforDoctor.scss";
import { withRouter } from "react-router";
import { getAllDoctor, getDoctorInForByDoctorId } from "../../../../services/userService";
import Select from "react-select";

import { toast } from "react-toastify";
class InforDoctor extends Component {
 constructor(props) {
    super(props);
    this.state = {
        listDoctor: [],
        listName: [],
        selectedDoctor: '',
        seleteName: '',
        doctorInfor: ""
    };
 }

 async componentDidMount() {
    await this.getAllDoctors();
    this.buildFullName();
    let id = "1";
    let res = await getDoctorInForByDoctorId(id);
    console.log(res)
    
 }

 buildFullName = () => {
    let result =[];
    let {listDoctor} = this.state;
    listDoctor.map(item => {
        let object = {};
        object.value = item.id;
        object.label = this.removeSpace(item.firstName + " " + item.lastName);
        result.push(object);
    })
    this.setState({
        listName: result
    })
 }

 removeSpace = (name) => {
    return name.replace(/\s+/g, ' '); // In ra "PHAM THANH PHONG"
  }


 getAllDoctors = async () => {
    let res = await getAllDoctor();
    if (res && res.errCode === 0) {
        this.setState({
            listDoctor: res.data
        })
    }
}

handleChangeDoctor = (selectedDoctor) => {
    this.setState({
        seleteName: selectedDoctor
    })
}
  render() {
    let { listName } = this.state;
    return (
      <>
        <title>
          <FormattedMessage id="doctor.infor-doctor" />
        </title>

        <div className="container inforDoctor">
            <div className="title">
            <FormattedMessage id="doctor.infor-doctor" />
            </div>

            <div className="infordoctor-content">
                <div className="content-top">
                    <div className="form-group">
                        <label>
                            Chọn bác sĩ
                        </label>
                        <Select
                            options={listName}
                            value={this.state.seleteName}
                            onChange={this.handleChangeDoctor}
                            placeholder={<FormattedMessage id="doctor.choose-doctor" />}
                            name="selectedDoctor"
                        />
                    </div>
                </div>
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
  connect(mapStateToProps, mapDispatchToProps)(InforDoctor)
);
