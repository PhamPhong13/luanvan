import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import _ from 'lodash';
import { getAllpost, getAllpostById , getcatById} from '../../services/userService';
import { withRouter } from 'react-router';

class PostOnCat extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            cat: ''
        }
    }

    async componentDidMount() {
        await this.getallpost();
    }
    
    getcat = async () => {
        let res = await getcatById(this.props.catId);
        this.setState({
            cat: res.data
        })
    }

    getallpost = async () => {
        let res = await getAllpostById(this.props.catId);
        if (res && res.errCode === 0) { 
            let reverse  = res.data.reverse();
            this.setState({
                listPost: reverse
            })
        }
        else this.setState({
            listPost: []
        })

        await this.getcat();
    }
    

      linktopost = (id) => {
        if ( this.props.history )
        {
            this.props.history.push( `/post/${id}` );
        }
    }

    render ()
    {
        let { listPost , cat} = this.state;
        return (
            <>
                
                {listPost && listPost.length > 0 && 
                
                    <div className='homepage-content-item'>
                                <div className='top'>
                                    <span>
                                        {cat.name}
                                    </span>
                                </div>
                    <div className='down'>
                        {listPost && listPost.slice(0, 2).map((item, index) => {
                    return (
                        <div className='down-content' onClick={() => this.linktopost(item.id)}>
                            <img src={ item.image} />
                            <div className='name'><p>{ item.name}</p></div>
                                    </div>
                       )
                    })}
                                    
                                </div>
                </div>
                }

                

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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( PostOnCat ));
