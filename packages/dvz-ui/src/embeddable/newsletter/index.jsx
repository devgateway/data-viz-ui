import React from 'react'
import {Button, Input, Message} from 'semantic-ui-react'
import {connect} from "react-redux";
import {newsletterSubscription, setEmail} from "../reducers/embeddable";

const expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const Index = (props) => {

    const submit = () => {
        const list = props["data-list"];
        const tag = props["data-tag"];
        const {email} = props;
        props.onSubmit({email, list, tag})
    }

    const {
        status,
        editing,
        "data-list": list,
        "data-placeholder": placeholder = "enter your email address",
        "data-success-message": successmessage = "Thanks",
        "data-failure-message": failuremessage = "Something didn't go well",
        "data-label": label = "Send",
        "data-tag": tag,
        email,
        onChange
    } = props

    let message = ""

    if (status === "OK" || editing) {
        message = (<Message success>
            <p>{successmessage}</p>
        </Message>)
    }

    if (status === "ERROR" || editing) {
        message = (<Message negative>
            <p>{failuremessage}</p>
        </Message>)
    }

    const valid = expresion.test(email)
    return <div className="viz newsLetter">
        <div className="viz newsLetter form">
            <Input icon='envelope' name="email" value={email}
                   onChange={(e, target) => onChange(target.value)}
                   iconPosition='left'
                   placeholder={placeholder}/>
            <Button disabled={!valid} primary onClick={e => submit()}>{label}</Button>
        </div>
        {message}
    </div>
}


const mapStateToProps = (state, ownProps) => {
    return {
        status: state.getIn(['embeddable', 'newsletter', 'status']),
        email: state.getIn(['embeddable', 'newsletter', 'email'])
    }
}

const mapActionCreators = {
    onSubmit: newsletterSubscription,
    onChange: setEmail
};

export default connect(mapStateToProps, mapActionCreators)(Index)
