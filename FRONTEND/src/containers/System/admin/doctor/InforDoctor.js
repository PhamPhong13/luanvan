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

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class InforDoctor extends Component {
 constructor(props) {
    super(props);
    this.state = {
        fullname: "",
      listPrice: [],
      listPayment: [],
        listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      firstName: "",
      lastName: "",
      desc: "",
        priceId: "",
    };
 }

 async componentDidMount() {
   await this.getDoctorInfor(); 
    await this.getListPrice("PRICE", "listPrice");
    await this.getListPrice("PAYMENT", "listPayment");
    await this.getListPrice("PROVINCE", "listProvince");
   this.getSelected(); 
  }


  getSelected() { 
    let priceId = this.state.priceId;
    let paymentId = this.state.paymentId;
    let provinceId = this.state.provinceId;
    // price
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
    
    // payment
    if (paymentId === null) {
     this.setState({
       selectedPayment: "",
     });
   }
   else {
     let selectedPayment = this.state.listPayment.find((item) => {
       return item && item.value === paymentId;
      }); 
     this.setState({
        selectedPayment: selectedPayment,
      })
    }
    
    // province
    if (provinceId === null) {
     this.setState({
       selectedProvince: "",
     });
   }
   else {
     let selectedProvince = this.state.listProvince.find((item) => {
       return item && item.value === provinceId;
      }); 
     this.setState({
        selectedProvince: selectedProvince,
      })
    }
  }
  


  getListPrice = async (name, id) => {
    let res = await getAllcode(name);
    let listres = this.bullAllcode(res)
    let stateCopy = { ...this.state };
    stateCopy[id] = listres;
    this.setState({
      ...stateCopy,
    });

  }
  

  bullAllcode = (res) => {
    let result = [];
    if (res && res.errCode === 0) {
      res.data.map((item, index) => {
        let object = {};
        object.label = this.props.language === 'vi' ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      })
    }
    return result;
  }

 getDoctorInfor = async () => {
  let id = this.props.match.params.id;
   let doctorInfor = await getDoctorInForByDoctorId(id);
  this.setState({
    desc: doctorInfor.data.Doctor_Infor.desc,
    priceId: doctorInfor.data.Doctor_Infor.priceId,
    firstName: doctorInfor.data.firstName,
    lastName: doctorInfor.data.lastName,
  })
   console.log(this.state)
    
  this.buildFullName(this.state.firstName, this.state.lastName);
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
  
  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });

    console.log(this.state)
  };

  handleChangePrice = (selectedPrice) => {
    let selected = this.state.listPrice.find((item) => {
      return item && item.value === selectedPrice.value;
    });
    this.setState({
      selectedPrice: selected,
    })
  } 

   handleChangePayment = (selectedPayment) => {
    let selected = this.state.listPrice.find((item) => {
      return item && item.value === selectedPayment.value;
    });
    this.setState({
      selectedPayment: selected,
    })
  } 

  handleChangeProvince = (selectedProvince) => {
    let selected = this.state.listProvince.find((item) => {
      return item && item.value === selectedProvince.value;
    });
    this.setState({
      selectedProvince: selected,
    })
  } 

  render() {
    let { fullname, listPrice, selectedPrice, desc, listPayment, selectedPayment,
    listProvince, selectedProvince} = this.state;
    console.log(this.state)
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
                        <input  type="text" value={fullname} className="fullname"/>
                    </div>
                    <div className="form-group description">
                      <label>
                       <FormattedMessage id="doctor.desc" /> :
                      </label>

                  <textarea
                  name="desc" onChange={(event) => this.handleOnchangeInput(event, 'desc')}
                  value={desc}></textarea>
                
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
                         onChange={this.handleChangePrice}
                          placeholder={<FormattedMessage id="doctor.price" />}
                        />
              </div>
              
              <div className="form-group">
                        <label>
                        <FormattedMessage id="doctor.payment" /> : 
                        </label>
                        <Select
                          options={listPayment}
                           value={selectedPayment}
                         onChange={this.handleChangePayment}
                          placeholder={<FormattedMessage id="doctor.payment" />}
                        />
                    </div>

              <div className="form-group">
                        <label>
                        <FormattedMessage id="doctor.province" /> : 
                        </label>
                        <Select
                          options={listProvince}
                           value={selectedProvince}
                         onChange={this.handleChangeProvince}
                          placeholder={<FormattedMessage id="doctor.province" />}
                        />
              </div>
              
              <div className="div-form-group">
                <div className="form-group">
                        <label>
                        <FormattedMessage id="doctor.clinic" /> : 
                        </label>
                        <Select
                          options={listProvince}
                           value={selectedProvince}
                         onChange={this.handleChangeProvince}
                          placeholder={<FormattedMessage id="doctor.clinic" />}
                        />
              </div>

             
              
              <div className="form-group">
                        <label>
                        <FormattedMessage id="doctor.specialty" /> : 
                        </label>
                        <Select
                          options={listProvince}
                           value={selectedProvince}
                         onChange={this.handleChangeProvince}
                          placeholder={<FormattedMessage id="doctor.specialty" />}
                        />
              </div>
              </div>
              
               <div className="form-group description">
                        <label>
                        <FormattedMessage id="doctor.note" /> : 
                        </label>
                        <textarea>kqwfhqwuhqwfi</textarea>
              </div>
              

              
            </div>
            
            <div className="markdown">
              <label><FormattedMessage id="doctor.infor-detail" /> :</label>
                    <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />  
              </div>
                    
              <div className="button-save">
                <div className="btn btn-primary btn-save"><FormattedMessage id="system.btn.save" /></div>
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
