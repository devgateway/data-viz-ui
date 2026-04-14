import React, {useCallback, useEffect, useImperativeHandle, useState, useRef} from 'react'
import { Button, Container, Grid, GridColumn, GridRow, Input, Badge, Alert, Textarea, Icon } from '@devgateway/ui'
import countryOptions from '../../countries'
import {reset, sendShowCaseForm} from "../reducers/embeddable";
import {connect} from "react-redux";
import {useDropzone} from "react-dropzone";
import configData from "../../conf/config.json";

const options = countryOptions.map(c => {
    return {
        flag: c.flag.toLocaleLowerCase(),
        value: c.text,
        text: c.text
    }
})

const recaptchaRef = React.createRef();


function FileUploader({onSelectionChange, showValidation, inputRef, name}) {
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles([...files, ...acceptedFiles])
        setErrors([])
    }, [files])

    const onDropRejected =  useCallback(rejectedFiles => {
        setErrors([...rejectedFiles])
    }, [files])

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        open
    } = useDropzone({accept: 'application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif', maxFiles: 5, multiple: true, onDrop, onDropRejected});

    useImperativeHandle(inputRef, () => ({
        name,
        reset: () => {
            setFiles([])
        },
        hasErrors: () => files.length == 0,
        value: () => files
    }));

    const remove = file => {
        const newFiles = [...files]
        newFiles.splice(file, 1)
        setFiles(newFiles)
      };

    const hasErrors = files.length === 0
    return (<>
         {errors && errors[0] && errors[0].errors &&
           <Container fluid className={`upload files ${hasErrors ? 'error' : ''}`}>
               <div className="error-messages">
            <ul style={{}}>
          {errors[0].errors.map( (e, index) => {
                   return (<li key={index}>{"File type not allowed. File type must be - application/-pdf,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif "}</li>)
          })}
          </ul>
          </div>
         </Container>
        }

        <Container fluid className={`upload files`}>
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()}/>
                <p>Drag 'n' drop files here, or click select button to select files. The maximum file size allowed is {configData.maxUploadFileSize}MB.</p>
                {files.length > 0 ? <ul>
                    {files.map((f, i) => <li key={i}><Badge color="green" icon='file'>{f.name}</Badge>
                    <Icon color="red" name='remove' size='large' onClick={(e) =>{ e.stopPropagation(); remove(i);}}/>
                    </li>)}
                </ul> : null}

            </div>
            <Button secondary onClick={open}>Select</Button>
        </Container>
        </>
    );
}


const ValidatedDropDown = ({options, placeholder, name, required, showValidation, icon, inputRef}) => {

    const [value, setValue] = useState(null)
    const [error, setError] = useState(true)

    useEffect(() => {
        if (required && value == null) {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])


    useImperativeHandle(inputRef, () => ({
        name,
        reset: () => {
            setValue(null)
        },
        value: () => value,
        hasErrors: () =>{
            console.log(error)
            return error
        }
    }));

    return <select
        value={value || ''}
        name={name}
        className={`ui dropdown selection${error && showValidation ? ' error' : ''}`}
        onChange={(e) => setValue(e.target.value)}
    >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
    </select>
}


const ValidatedField = ({placeholder, name, icon, required, pattern, as, inputRef, showValidation}) => {
    const [value, setValue] = useState("")
    const [error, setError] = useState(true)

    useEffect(() => {
        if ((required && value.trim() == "") || (pattern && !pattern.test(value))) {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])


    useImperativeHandle(inputRef, () => ({
        name,
        reset: () => {
            setValue("")
        },
        hasErrors: () => error,
        value: () => value
    }));


    const C = as ? as : Input
    return <C
        value={value}

        error={error && showValidation}
        onChange={e => setValue(e.target.value)}
        name={name} icon={icon}
        iconPosition='left'
        placeholder={placeholder}/>

}


const Index = (props) => {
    const [state, setState] = useState({});
    const iframe = useRef();
    const inputs = useRef({});

    const submitForm = (e) => {
        const elements = Object.keys(inputs.current).map(k => inputs.current[k]);
        const hasErrors = elements.map(e => e.hasErrors()).reduce((a, b) => a || b);
        const files = state.files;
        if (hasErrors) {
            setState(prevState => ({...prevState, showValidation: true}));
        } else {
            const values = {};
            elements.forEach(e => values[e.name] = e.value());
            props.onSubmit(values);
            setTimeout(() => {
                reset();
            }, 5000);
        }
    };

    const reset = () => {
        const elements = Object.keys(inputs.current).map(k => inputs.current[k]);
        elements.forEach(e => {
            e.reset();
        });
        setState({showValidation: false, status: null});
        props.onReset();
    };

    const captchaChange = (value) => {
        setState(prevState => ({...prevState, token: value}));
    };

    const setInput = (el) => {
        if (el) {
            inputs.current[el.name] = el;
        }
    };

    const {
        status,
        organization = "Organization",
        name = "Name",
        email = "Email",
        country = "Country",
        message = "Message",
        resetlabel = "Reset",
        submitlabel = "Submit",
        successmessage = "Thanks for submitting your data",
        failuremessage = "Something didn't go well, please try again later",
        editing
    } = props;
    const {showValidation, token, reset: resetState} = state;

    return (
        <Container fluid={true} className="viz showcase">
            <Grid columns={1} className={showValidation ? 'validated' : ''}>
                <GridColumn>
                    <ValidatedField inputRef={el => setInput(el)} showValidation={showValidation} required={true}
                                    icon={"building"}
                                    name={"organization"} placeholder={organization}/>
                </GridColumn>

                <GridColumn>
                    <ValidatedField inputRef={el => setInput(el)} showValidation={showValidation} required={true}
                                    icon={"user"}
                                    name={"name"}
                                    placeholder={name}/>
                </GridColumn>

                <GridColumn>
                    <ValidatedField
                        inputRef={el => setInput(el)} showValidation={showValidation} required={true}
                        pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                        icon={"envelope"}
                        placeholder={email}
                        name={"email"}/>
                </GridColumn>

                <GridColumn>
                    <div>
                        <ValidatedDropDown inputRef={el => setInput(el)}
                                           showValidation={showValidation}
                                           name={"country"}
                                           required={true}
                                           options={options}
                                           placeholder={country}/>
                    </div>
                </GridColumn>

                <GridColumn>
                    <FileUploader inputRef={el => setInput(el)}
                                  showValidation={showValidation}
                                  name="files"></FileUploader>
                </GridColumn>

                <GridColumn>
                    <ValidatedField inputRef={el => setInput(el)} placeholder={message} name={"message"}
                                    as={Textarea}/>
                </GridColumn>

                <GridRow>
                    <GridColumn textAlign={"left"} width={12} verticalAlign="bottom" className="form-buttons">
                        <Button className="btn-reset"
                                onClick={e => reset()}>{resetlabel}</Button>
                        <Button secondary={true}
                                onClick={e => submitForm()}>{submitlabel}</Button>
                    </GridColumn>
                    {(status == 'OK' || editing) && <GridColumn width={16}> <Alert
                        success
                        content={<p>{successmessage}</p>}
                    /></GridColumn>}

                    {(status == 'ERROR' || editing) && <GridColumn width={16}> <Alert negative>
                        <p>{failuremessage}</p>
                    </Alert></GridColumn>}
                </GridRow>
            </Grid>
        </Container>
    );
};


const mapStateToProps = (state, ownProps) => {
    return {
        status: state.getIn(['embeddable', 'showCase', 'status'])
    }
}

const mapActionCreators = {
    onSubmit: sendShowCaseForm,
    onReset: reset
};

export default connect(mapStateToProps, mapActionCreators)(Index)
