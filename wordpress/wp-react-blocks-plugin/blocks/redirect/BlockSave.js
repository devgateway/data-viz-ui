
const SaveComponent = (props) => {
    const {
        attributes: {
            redirect_url
        },
    } = props;

    return (<div    className={"viz-component"}  data-component={"redirect"}  data-url={redirect_url}></div>);
}


export default SaveComponent