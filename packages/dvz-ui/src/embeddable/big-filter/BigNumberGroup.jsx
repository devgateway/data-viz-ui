import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Grid } from "semantic-ui-react";
import { BigNumberItem } from './BigNumberItem';
import { decode } from '../utils/parseUtils';
import _ from 'lodash';

const BigNumberGroup = (props) => {
    const {
        group,
        app,
        parent,
        hasParentFilters,
        nColumns,
        height,
        blockName,
        measures,
        dimension,
        data,
        numberFontSize,
        backgroundColor,
        numberColor,
        labelColor,
        unselectedBackgroundColor,
        unselectedNumberColor,
        unselectedLabelColor,
        labelFontSize,
        intl,
        onUnSetFilter,
        onSetFilter,
        appliedFilters,
        sort,
        order,
        showZeroValues
    } = props;

    const selectedKey = measures[app] ? Object.keys(measures[app]).find(key => measures[app][key].selected) : null


    const readGroup = parent ? parent : blockName + Math.random(0, 1) //were to read my linked filters
    const selfGroup = blockName //where to store my  state


    const formatObject = measures[app] && measures[app].format ? measures[app].format : {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }

    const sortFunc = (a, b) => {
        const valueA = a[selectedKey]
        const valueB = b[selectedKey]
        const direction = order === 'asc' ? 1 : -1

        if (sort === 'alpha') {
            // Alphabetical sorting based on the label
            const labelA = getLabel(a.value) || ''
            const labelB = getLabel(b.value) || ''
            return direction * labelA.localeCompare(labelB)
        } else {
            // Numerical sorting based on the selected measure value
            const numA = parseFloat(valueA) || 0
            const numB = parseFloat(valueB) || 0
            return direction * (numA - numB)
        }
    }

    useEffect(() => {

        onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] }) //this is for global group the one connected to charts
        onUnSetFilter({ app, group: blockName, parent, param: dimension }) //this one is internal state to filter other linked big filters

    }, []);

    useEffect(() => {
        if (parent && parent != "" && hasParentFilters === false && appliedFilters) {
            const hasAnyFilters = Object.values(appliedFilters).some(filterArray => filterArray && filterArray.length > 0);
            if (hasAnyFilters) {
                onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] })
                onUnSetFilter({ app, group: blockName, parent, param: dimension })
                setLocalFilters([])
                pendingFilters.current = null
            }
        }
    }, [hasParentFilters]);

    useEffect(() => {

        const items = data.children.map(d => d.value)
        const hasMissing = appliedFilters && appliedFilters[dimension] ? appliedFilters[dimension].some(val => !items.includes(val)) : false;
        if (hasMissing) {
            const cleanedFilters = appliedFilters[dimension].filter(val => items.includes(val));
            if (cleanedFilters.length == 0) {
                onUnSetFilter({ app, group, param: dimension }) //write on global filters  group(charts)
                onUnSetFilter({ app, group: selfGroup, param: dimension }) //keep isolated self selected filter
                setLocalFilters([])
                pendingFilters.current = null
            } else {
                onSetFilter({ app, group, param: dimension, value: cleanedFilters })//write on global filters  group(charts)
                onSetFilter({ app, group: selfGroup, parent, param: dimension, value: cleanedFilters }) //keep update self selected filter
                setLocalFilters(cleanedFilters)
                pendingFilters.current = null
            }
        }
    }, [hasParentFilters, appliedFilters, data]);

    const getLabel = (type) => {
        if (!data || !data.metadata || !data.metadata.types) return null;

        const l = data.metadata.types.filter(d => d.dimension == dimension)
        return l && l.length > 0 ? l[0].items.filter(i => i.code == type)[0]?.value : null;
    }


    // -------------------------------------------------------------------------
    // Debounce Logic Implementation
    // -------------------------------------------------------------------------

    // Local state to track filters immediately for UI feedback
    const [localFilters, setLocalFilters] = useState([]);
    const pendingFilters = useRef(null); // Track the last local update we sent

    // Sync local state with props when they change externally
    useEffect(() => {
        const incoming = appliedFilters && appliedFilters[dimension] ? appliedFilters[dimension] : [];

        // Conflict Resolution Strategy:
        // If we have a pending local update, we want to ignore "stale" props that might
        // arrive before our update has been processed by the server.
        // We only sync if:
        // 1. We have NO pending update (pure external change)
        // 2. OR the incoming props MATCH our pending update (server caught up!)

        if (pendingFilters.current) {
            // Check if incoming props match what we expect
            // We sort both to ensure array order doesn't matter
            const incomingSorted = [...incoming].sort();
            const pendingSorted = [...pendingFilters.current].sort();

            if (_.isEqual(incomingSorted, pendingSorted)) {
                // Server caught up! We can clear pending and sync.
                pendingFilters.current = null;
                setLocalFilters(incoming);
            } else {
                // Props don't match our pending state yet.
                // It's likely an old prop value or an intermediate state.
                // We IGNORE it to preserve our optimistic local state (stopping the blink).
                // Risk: If an external update happens simultaneously, we might miss it until we stop interacting.
            }
        } else {
            // No pending local changes, always sync (e.g. initial load or external reset)
            setLocalFilters(incoming);
        }
    }, [appliedFilters, dimension]);

    // Create a debounced function to perform the actual expensive filter update
    // We use useRef to keep the debounce function stable across renders
    const debouncedApplyFilter = useRef(
        _.debounce((newFilters, type) => {
            if (newFilters.length == 0) {
                onSetFilter({ app, group, parent, param: type, value: [] });
                onUnSetFilter({ app, group: blockName, parent, param: type });
            } else {
                onSetFilter({ app, group, param: type, parent, value: [...newFilters] });
                onSetFilter({ app, group: blockName, param: type, parent, value: [...newFilters] });
            }
        }, 300) // 400ms delay
    ).current;

    // Cleanup pending debounces on unmount
    useEffect(() => {
        return () => {
            debouncedApplyFilter.cancel();
        };
    }, [debouncedApplyFilter]);

    // Handler called by BigNumberItem
    const handleSetLocalFilter = (childValue, type) => {
        if (parent && !hasParentFilters) return;

        let newFilters = [...localFilters];
        if (newFilters.includes(childValue)) {
            newFilters = newFilters.filter(f => f !== childValue);
        } else {
            newFilters.push(childValue);
        }

        // 1. Update local state immediately for UI responsiveness
        setLocalFilters(newFilters);
        pendingFilters.current = newFilters; // Mark this state as pending

        // 2. Trigger the debounced server update
        debouncedApplyFilter(newFilters, type);
    };

    // -------------------------------------------------------------------------


    const filteredFilters = data.children.filter(d => {
        if (showZeroValues === "true") {
            return d[selectedKey] !== null && d[selectedKey] !== undefined;
        } else {
            return d[selectedKey] && d[selectedKey] > 0;
        }
    }).sort(sortFunc)

    // Use localFilters for display count to reflect immediate user action
    const selected = localFilters ? localFilters.length : 0;

    const total = filteredFilters ? filteredFilters.length : 0


    if (dimension == null) {
        return <h2>Select a dimensiosn to start configuring the component</h2>
    } else {
        return <Container fluid={true} style={{ padding: '0px', margin: '0px', height: `${height}px` }}>



            <Grid fluid={true} celled={true} stackable columns={nColumns} style={{ border: '1px solid #EEE' }}>
                <Grid.Row>
                    <Grid.Column width={16} textAlign='right'>

                        Selected    {selected}/{total}
                    </Grid.Column>
                </Grid.Row>
                {data.children && filteredFilters.map((child, idx) => {

                    // We override the appliedFilters prop passed to item to use our localFilters
                    // This ensures the item looks selected immediately
                    const appliedFiltersOverride = {
                        ...appliedFilters,
                        [dimension]: localFilters
                    };

                    return <BigNumberItem
                        key={idx}
                        idx={idx}
                        child={child}
                        selectedKey={selectedKey}
                        appliedFilters={appliedFiltersOverride} // Use overriding filters
                        dimension={dimension}
                        app={app}
                        group={group}
                        parent={parent}
                        blockName={blockName}
                        hasParentFilters={hasParentFilters}
                        onSetFilter={(params) => {
                            // Intercept the call from BigNumberItem
                            // Note: BigNumberItem calls onSetFilter with complex object, 
                            // but we essentially just need to know which item was clicked.
                            // However, since we are rewriting the logic here, we can just pass
                            // our simple handler if we modify BigNumberItem or keep the signature compatible.
                            //
                            // Wait! BigNumberItem implements its own toggle logic inside 'click'. 
                            // We should probably pass a custom handler instead of onSetFilter
                            // OR modify BigNumberItem to accept a simple 'onClick' handler.
                            //
                            // Let's pass a special prop `customClickHandler` and check for it in BigNumberItem
                            // OR just pass our handler as `onSetFilter` but that might break strict prop types if checked.
                            // The cleanest way without modifying BigNumberItem heavily is to pass this new handler
                            // as a prop, but BigNumberItem needs to be updated to use it.
                        }}
                        // We will pass our new handler as a specific prop to intercept logic
                        handleClick={() => handleSetLocalFilter(child.value, child.type)}

                        // We pass the original handlers too just in case, but they won't be used for the click
                        // if we update BigNumberItem to prefer handleClick
                        onUnSetFilter={onUnSetFilter}

                        intl={intl}
                        numberFontSize={numberFontSize}
                        labelFontSize={labelFontSize}
                        backgroundColor={backgroundColor}
                        numberColor={numberColor}
                        labelColor={labelColor}
                        unselectedBackgroundColor={unselectedBackgroundColor}
                        unselectedNumberColor={unselectedNumberColor}
                        unselectedLabelColor={unselectedLabelColor}
                        formatObject={formatObject}
                        decode={decode}
                        getLabel={getLabel}
                    />
                })}
            </Grid>

        </Container>
    }
}

export default BigNumberGroup;
