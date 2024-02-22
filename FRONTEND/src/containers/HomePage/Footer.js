import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import logo from "../../assets/logo.jpg"

class Footer extends Component
{
     

    render ()
    {
        return (
            <>
                <div className='container footer'>
                    <div className='footer-content'>
                        <div className='left'>
                            <img src={ logo} />
                        </div>
                        <div className='right'>
                            <p><img src='https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XLGk7XTX1NS.png'/> <b>Trang</b> · Tổ chức phi lợi nhuận</p>
                            <p><img src='https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/W4m-1QXtJyK.png'/> chsvbinhtan@gmail.com</p>
                            <p><img src='https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/DzX7o-tOmJ6.png'/> <a href='facebook.com/CTU.chsv.bt'>facebook.com/CTU.chsv.bt</a></p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user1.users,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};  

export default connect( mapStateToProps, mapDispatchToProps )( Footer );
