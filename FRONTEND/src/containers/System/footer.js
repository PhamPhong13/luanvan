import React, { Component } from 'react';
import { connect } from 'react-redux';
class footer extends Component
{
    render ()
    {
        return (
            <>
                <div className='container'>
                    <div className='text-center my-5 border'>
                        &copy; CopyRight 2024
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

export default connect( mapStateToProps, mapDispatchToProps )( footer );
