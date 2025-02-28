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
            filters,
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
            closeOnSelect,
            alphabeticalSort,
            ascOrder,
            useFilterItems,
            datasetId
        }
    } = props;

    const divClass = {}
    const divStyles = {}


    return (<div className={"viz-component"}
                 data-component={"filter"}
                 data-app={app}
                 data-dataset-id={datasetId}
                 data-icon={icon}
                 data-alphabetical-sort={alphabeticalSort}
                 data-asc-order={ascOrder}
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
                 data-filters={encodeURIComponent(JSON.stringify(filters))}
                 data-show-no-data-option={showNoDataOption}
                 data-default-value-criteria={defaultValueCriteria}
                 data-boolean-true-label={booleanTrueLabel}
                 data-boolean-false-label={booleanFalseLabel}
                 data-hidden-filters={encodeURIComponent(JSON.stringify(hiddenFilters))}
                 data-close-on-select={closeOnSelect}
                 data-use-filter-items={useFilterItems}
                 data-all-none-same-behaviour={allNoneSameBehaviour}>
    </div>);
}


export default SaveComponent;