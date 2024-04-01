import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { getnhiemkyById , getmenberById, createmenber, deletemenber} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import CHT from './cht';
import CHP from './chp';
import UV from './uv';
import CTV from './ctv';

class InforTunure extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
    }

    

    async componentDidMount() {
        
        await this.getnhiemky();
        
    }


    getnhiemky = async () => {
        let res = await getnhiemkyById(this.props.match.params.id);
        this.setState({
            name: res.data.name
        })
    }

    linkTouser = (link) => {
        if ( this.props.history )
        {
            this.props.history.push( `${link}` );
        }
    }
    render ()
    {
        let { name } = this.state;
        return (
            <>
                <title>
                    Nhiệm kỳ { name }
                </title>
                <div className=' manage tunure'>
                    <div className='left' style={{position: 'fixed', top: '112px', left: '0'}}>
                        <div className='content'>
                            <li onClick={() => this.linkTouser("/system/manage-nhiemky")}><span><i className='fas fa-user-tie'></i>Quản lý nhiệm kỳ</span></li>
                            <li onClick={() => this.linkTouser("/system/add-tunure")}><span><i className='fas fa-plus'></i>Thêm nhiệm kỳ</span>
                            </li>
                        </div>
                    </div>
                    <div className='right' style={{marginLeft: '165px'}}>
                        <div className='title'>chi hội sinh viên bình tân</div>
                    <div className='text-center name-nhiemky'>Nhiệm kỳ {name}</div>
                    <div className='text-center name-nhiemky'>-------------- + --------------</div>


                    {name && <CHT tunure={name} />}

                    {name && <CHP tunure={name} />}

                    {name && <UV tunure={name} />}

                    {name && <CTV tunure={name} />}
                    </div>
                </div>


               
            </>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( InforTunure ));
