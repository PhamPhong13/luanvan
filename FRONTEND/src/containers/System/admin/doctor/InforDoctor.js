import React, { Component } from "react";
import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import { FormattedMessage } from "react-intl";
import "./InforDoctor.scss";
import { withRouter } from "react-router";
import {
  getAllDoctor, getDoctorInForByDoctorId,
  getAllcode
} from "../../../../services/userService";
import Select from "react-select";

import { toast } from "react-toastify";
class InforDoctor extends Component {
 constructor(props) {
    super(props);
    this.state = {
        doctorInfor: "",
        fullname: "",
        infor: "",
      listPrice: [],
        selectedPrice: "",
    };
 }

 async componentDidMount() {
   await this.getDoctorInfor(); 
   
   await this.getListPrice();
   this.getSelectedPrice();
   
  }


  getSelectedPrice() { 
    let priceId = this.state.infor.priceId;
   if (priceId === null) {
     this.setState({
       selectedPrice: "",
     });
   }
   else {
     let selectedPrice = this.state.listPrice.find((item) => {
       return item && item.value === priceId;
      }); 
     this.setState({
        selectedPrice: selectedPrice,
      })
   }
  }
  


  getListPrice = async () => {
    let res = await getAllcode("PRICE");
    let result = [];
    if (res && res.errCode === 0) {
      res.data.map((item, index) => {
        let object = {};
        object.label = this.props.language === 'vi' ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      })
    }
    this.setState({
      listPrice: result
    });
  }
  

 getDoctorInfor = async () => {
  let id = this.props.match.params.id;
   let doctorInfor = await getDoctorInForByDoctorId(id);
  this.setState({
    doctorInfor: doctorInfor.data,
    infor: doctorInfor.data.Doctor_Infor,
  })
    
  this.buildFullName(doctorInfor.data.firstName, doctorInfor.data.lastName);
 }


 buildFullName = (firstName, lastNames) => {
    let result = `${firstName} ${lastNames}`;
    this.setState({
        fullname: result
    })
  }
  
 removeSpace = (name) => {
    return name.replace(/\s+/g, ' '); // In ra "PHAM THANH PHONG"
  }
 
  render() {
    let { fullname, infor, listPrice , selectedPrice} = this.state;
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
                        <FormattedMessage id="doctor.doctor_fullname" /> : 
                        </label>
                        <input  type="text" value={fullname}/>
                    </div>
                    <div className="form-group description">
                      <label>
                       <FormattedMessage id="doctor.desc" /> :
                      </label>
                <textarea value={infor.desc === null ? "Chưa có thông tin, vui lòng nhập thông tin bác sĩ!":
                  "khoong null"} >               </textarea>
                    </div>
            </div>
            

            <div className="content-top">
                    <div className="form-group">
                        <label>
                        <FormattedMessage id="doctor.price" /> : 
                        </label>
                        <Select
                          options={listPrice}
                           value={selectedPrice}
                         /* onChange={this.handleChangePrice}
                          placeholder={<FormattedMessage id="key.position" />} */
                          name="selectPosition"
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

export default connect(mapStateToProps, mapDispatchToProps)(InforDoctor);
