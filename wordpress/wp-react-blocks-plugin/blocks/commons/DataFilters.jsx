import {Button, PanelBody, PanelRow, SelectControl, ToggleControl} from "@wordpress/components";
import {__} from '@wordpress/i18n';

const DataFilters = (props) => {

  const updateFilterParam = (param, idx) => {
    const {attributes: {filters}, setAttributes, allFilters} = props
    const newFilters = filters.slice()
    const selected = allFilters.filter(f => f.param === param)[0]
    newFilters[idx] = {...selected, value: []}
    setAttributes({filters: newFilters})

  }

  const updateFilterValue = (value, idx) => {
    const {attributes: {filters}, setAttributes, onChange} = props
    const selected = filters[idx]
    let values = selected.value
    if (values.indexOf(value) > -1) {
      values = values.filter(v => v != value)
    } else {
      values.push(value)
    }

    const newFilters = filters.slice()
    newFilters[idx].value = values
    setAttributes({filters: newFilters})
    onChange()
  }

  const addFilter = () => {
    const {attributes: {filters}, setAttributes, allFilters} = props
    let index = filters.length > allFilters.length ? allFilters.length : filters.length
    const newFilter = (allFilters && allFilters.length > 0) ? {
      ...allFilters[index],
      "value": []
    } : null
    let newFilters = filters.slice()
    newFilters.push(newFilter)
    setAttributes({filters: newFilters})
  }

  const removeFilter = (f) => {
    const {attributes: {filters}, setAttributes} = props
    let newFilters = filters.slice(0, -1)
    setAttributes({filters: newFilters})
  }

  const items = (type) => {
    const values = props.allCategories ? props.allCategories.filter(c => c.type === type) : []
    const cat = values.length > 0 ? values[0] : null
    let items = null
    if (type === 'Boolean') {
      items = [{"value": "Yes", id: true}, {"value": "No", id: false}]
    } else if (cat) {
      items = cat.items
    }
    return items
  }

  const FilterSelector = ({param, index, options, onUpdateFilterParam}) => {
    const sortedOptions = options.sort(function (a, b) {
      var aLabel = a.label ? a.label.toLowerCase() : "";
      var bLabel = b.label ? b.label.toLowerCase() : "";
      return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });
    return <SelectControl onChange={(value) => {
      onUpdateFilterParam(value, index)
    }} value={param} options={sortedOptions}/>
  }

  const CategoricalFilter = ({value, index, items, onUpdateFilterValue}) => {
    if (items) {
      const sortedItems = items.sort(function (a, b) {
        return a.position - b.position
      });
      return sortedItems.map(v => <PanelRow>
        <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1} onChange={e => {onUpdateFilterValue(v.id, index)}}/>
      </PanelRow>)
    } else {
      return null;
    }
  }

  const {
    allFilters,
    attributes: {
      filters,
    }
  } = props

  return <PanelBody initialOpen={false} title={__("Filters")}>
      {filters.map((f, index) => {

        return (
          <PanelBody initialOpen={true} title={__(`Filter - ${f.label}`)}>
            <FilterSelector param={f.param} index={index} options={allFilters}
                            onUpdateFilterParam={updateFilterParam}/>
            {<CategoricalFilter value={f.value} index={index} items={items(f.type)}
                                onUpdateFilterValue={updateFilterValue}/>}
          </PanelBody>)
      })}

      <PanelRow>

        <Button variant={"link"} onClick={addFilter}>{__("Add Filter")}</Button>
        <Button variant={"link"} onClick={removeFilter}>{__("Remove")}</Button>
      </PanelRow>
    </PanelBody>
}

export default DataFilters