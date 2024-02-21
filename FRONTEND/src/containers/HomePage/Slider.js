import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _, { isEmpty } from 'lodash';
import * as actions from '../../store/actions'
import logo from "../../assets/logo.jpg"
import avatar from "../../assets/410251206_697829015774464_3697217710754640905_n.jpg"
import { withRouter } from 'react-router';
import { getAllbg,  getAllpost} from '../../services/userService';

class Slider extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            bg: "",
            name: "",
            listPost: [],
            id: ""
        }
    }

    async componentDidMount() {
        await this.getPost();
    }

    getbg = async () => {
        let res = await getAllbg();
        this.setState({
            bg: res.data[res.data.length - 1].image,
            name:""

        })

    }


    getPost = async () => {
        let res = await getAllpost();
        let reverse = res.data.reverse();
    let slicedData = reverse.slice(0, 5); // Lấy 5 phần tử đầu tiên
    this.setState({
        listPost: slicedData
    });
        this.getbg();
        this.setbg();
    }

    setbg = () => {
    let res = this.state.listPost;
    if (res && res.length > 0) {
        let i = 0;
        setInterval(() => {
            this.setState({
                bg: res[i].image,
                name: res[i].name,
                id: res[i].id
            });
            i++;
            if (i >= res.length) {
                i = 0; // Nếu i vượt quá độ dài của mảng, đặt lại i về 0
            }
        }, 3000);
    }
}




    linktopost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${id}` );
        }
    }

    render ()
    {
        let {bg, name, id} = this.state;
        return (
            <>
                <div className='slider' >
                    <img src={bg} alt="bg" />
                    <div onClick={() => this.linktopost(id)} className='name'>
                        {name}
                    </div>

                </div>
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        processLogout_U: () => dispatch( actions.processLogout_U() ),
    };
};  

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Slider ));
