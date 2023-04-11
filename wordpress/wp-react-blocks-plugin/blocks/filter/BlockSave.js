const SaveComponent = (props) => {

    const {
        attributes: {
            placeHolder,
            type,
            param,
            app,
            icon,
            group,
            csvField,
            csvValue,
            isRange,
            allLabel,
            noneLabel,
            startLabel,
            endLabel,
            useSingleColumn,
            enableTextSearch,
            filterType,
            defaultValues,
            showNoDataOption,
            defaultValueCriteria,
            booleanTrueLabel,
            booleanFalseLabel,
            hiddenFilters,
            allNoneSameBehaviour,
            closeOnSelect
        }
    } = props;

    const divClass = {}
    const divStyles = {}


    return (<div className={"tcdi-component"}
             data-component={"filter"}
             data-app={app}
             data-icon={icon}
             data-type={type}
             data-group={group}
             data-param={param}
             data-csv-field={csvField}
             data-csv-value={csvValue}
             data-place-holder={placeHolder}
             data-is-range={isRange}
             data-all-label={allLabel}
             data-none-label={noneLabel}
             data-start-label={startLabel}
             data-end-label={endLabel}
             data-use-single-column={useSingleColumn}
             data-enable-text-search={enableTextSearch}
             data-filter-type={filterType}
             data-default-values={defaultValues}
             data-show-no-data-option={showNoDataOption}
             data-default-value-criteria={defaultValueCriteria}
             data-boolean-true-label={booleanTrueLabel}
             data-boolean-false-label={booleanFalseLabel}
             data-hidden-filters={encodeURIComponent(JSON.stringify(hiddenFilters))}
             data-close-on-select={closeOnSelect}			
             data-all-none-same-behaviour={allNoneSameBehaviour}>                 
             </div>);
}


export default SaveComponent