import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions'
import {createanswerform, getanswerform, updateanswerform, deleteanswerform} from '../../services/userService';

class QuestionKey extends Component
{

    constructor(props) {
        super(props);
        this.textareaRef = React.createRef();
        this.state = {
            key: "",
            desc: "",
            id: "",
            user: "",
            answer: "",
            type: "create"
        }
    }
    
    async componentDidMount() {
        await this.getquestion();
    }



    getquestion = async () => {
        this.setState({
            key: this.props.item.key,
            desc: this.props.item.desc,
            id: this.props.item.id,
            user: this.props.userInfo.id,
            type: "create",
            remove: this.props.removes
        })
        await this.getquestionbykey()
    }
    
    getquestionbykey = async () => {
        let question = await getanswerform(this.props.item.id, this.props.userInfo.id);
        if (question && question.errCode === 0 ) {
            this.setState({
                answer: question.data.answer,
                type: "update",
            })
        }
    }

    async componentDidUpdate(prevProps) { 
        if (this.props.removes !== prevProps.removes) {
            console.log(this.props.removes)
            this.setState({
                answer: "",
            })
            if (this.props.removes === 'delete') { 
                await this.handleremoveAnswer();
                this.props.handleremoveNo();
                this.props.linktoform();
            }
            else {
                await this.handleSaveAnswers();
                this.props.handleremoveNo();
            }
        }
    }
    
    handleremoveAnswer = async() => {
        let res = await deleteanswerform(this.state.id, this.state.user)
            if (res && res.errCode === 0) {
                this.setState({
                    type: "update",
                })
        }
        await this.getquestionbykey()
    }

    handleSaveAnswers = async () => {
        if (this.state.type === "create") {
           let res =  await createanswerform({
            key: this.state.id,
            userId: this.state.user,
            answer: this.state.answer,
           })
            if (res && res.errCode === 0) {
                this.setState({
                    type: "update",
                })
            }
        }
        else {
            let res = await updateanswerform({
                id: this.state.id,
                userId: this.state.user,
                answer: this.state.answer,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    type: "update",
                })
            }
        }

        await this.getquestionbykey()

    }

     handleOnchangeInput = async ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        })
         
    }


    render ()
    {
        let { key, desc, answer } = this.state;
        return (
            <>
                <div className='formanswer-content-bottom'>
                                <div className='question'>
                                            <div className='name'>{ key}</div>
                                            <div className='desc'> {desc} *</div>
                        <input placeholder='Trả lời'
                            onChange={(event) => this.handleOnchangeInput(event, "answer")}
                            value={answer}
                            onBlur={() => this.handleSaveAnswers()}
                            className='answer' type='text' />
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

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( QuestionKey ));
