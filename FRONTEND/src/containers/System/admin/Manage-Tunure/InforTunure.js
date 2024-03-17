import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Manage.scss";
import { getnhiemkyById , getmenberById, createmenber, deletemenber} from "../../../../services/userService"
import { CommonUtils } from '../../../../utils'; // vi or en
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import CHT from './cht';
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

    
    render ()
    {
        let { name } = this.state;
        return (
            <>
                <title>
                    Nhiệm kỳ { name }
                </title>
                <div className='container manage tunure'>

                    <div className='title'>chi hội sinh viên bình tân</div>
                    <div className='text-center name-nhiemky'>Nhiệm kỳ {name}</div>
                    <div className='text-center name-nhiemky'>-------------- + --------------</div>

                </div>

                {name && <CHT tunure={name} />}

               
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
