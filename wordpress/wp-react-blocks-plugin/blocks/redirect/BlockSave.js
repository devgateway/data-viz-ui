
const SaveComponent = (props) => {
    const {
        attributes: {
            redirect_url
        },
    } = props;

    return (<div    className={"tcdi-component"}  data-component={"redirect"}  data-url={redirect_url}></div>);
}


export default SaveComponent