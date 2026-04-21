import React, { LegacyRef, useEffect, useRef, useState, useMemo } from "react";
import {
    Checkbox,
    Container,
    Divider,
    Dropdown,
    DropdownProps,
    Icon,
    Label,
    Radio,
    Segment,
} from "semantic-ui-react";
// import { setPostsFilter } from "@/embeddable/reducers/data";

const FILTER_TYPE_MULTI_SELECT = "multi-select";
const FILTER_TYPE_SINGLE_SELECT = "single-select";
const NONE_SELECTION_VALUE = Number.MIN_SAFE_INTEGER;

const toValueKey = (value: any): string | null => {
    if (value === null || value === undefined) {
        return null;
    }
    return String(value);
};

export interface PostFilterDropdownProps extends DropdownProps {
    allLabel?: string;
    noneLabel?: string;
    group: string;
    useSingleColumn?: boolean;
    enableTextSearch?: boolean;
    filterType?: string;
    showNoDataOption?: boolean;
    allNoneSameBehaviour?: boolean;
    closeOnSelect?: boolean;
    autoApply?: boolean;
    alphabeticalSort?: boolean;
    ascOrder?: boolean;
    placeholder?: string;
    taxonomy?: string
    type?: string;
    noneFunction?: (e: any) => void;
}

const PostsFilterDropdown = (props: PostFilterDropdownProps) => {
    const {
        allLabel,
        noneLabel,
        placeholder,
        options,
        // group,
        current,
        onChange,
        useSingleColumn,
        enableTextSearch,
        filterType,
        // defaultValues,
        // showNoDataOption,
        // defaultValueCriteria,
        allNoneSameBehaviour,
        hiddenFilters,
        autoApply,
        // taxonomy,
        // type,
        value,
        closeOnSelect = true,
        noneFunction,
        alphabeticalSort,
        ascOrder,
        ...restProps
    } = props;

    const isMultiSelect = filterType === FILTER_TYPE_MULTI_SELECT;

    const rawSelectedValues = Array.isArray(value) ? value : (current || []) || [];
    const isExplicitNoneSelection = Array.isArray(rawSelectedValues)
        ? rawSelectedValues.some((optionValue) => optionValue === NONE_SELECTION_VALUE)
        : false;
    const selectedValues = isExplicitNoneSelection
        ? rawSelectedValues.filter((optionValue) => optionValue !== NONE_SELECTION_VALUE)
        : rawSelectedValues;
    const [searchText, setSearchText] = useState("");
    // const [searchFilter, setSearchFilter] = useState("");
    const [pendingValues, setPendingValues] = useState<any[] | null>(null);
    const effectiveValues = autoApply === false && pendingValues !== null ? pendingValues : selectedValues;
    const sortedOptions = useMemo(() => {
        if (!options) return [];
        const opts = [...options];
        if (alphabeticalSort) {
            opts.sort((a, b) => {
                const aText = a.text ? String(a.text).toLowerCase() : "";
                const bText = b.text ? String(b.text).toLowerCase() : "";
                return ascOrder
                    ? (aText < bText ? -1 : aText > bText ? 1 : 0)
                    : (aText < bText ? 1 : aText > bText ? -1 : 0);
            });
        } else {
            opts.sort((a, b) => {
                const aPos = a.position !== undefined ? a.position : 0;
                const bPos = b.position !== undefined ? b.position : 0;
                return ascOrder ? aPos - bPos : bPos - aPos;
            });
        }
        return opts;
    }, [options, alphabeticalSort, ascOrder]);
    const changeFilter = (e: any, candidateValue: any) => {
        if (filterType === FILTER_TYPE_MULTI_SELECT) {
            const candidateKey = toValueKey(candidateValue);
            const baseValues = Array.isArray(effectiveValues) ? [...effectiveValues] : [];
            const hasValue = baseValues.some((optionValue) => toValueKey(optionValue) === candidateKey);
            let nextValues = hasValue
                ? baseValues.filter((optionValue) => toValueKey(optionValue) !== candidateKey)
                : [...baseValues, candidateValue];

            if (!allNoneSameBehaviour && nextValues.length === 0) {
                nextValues = [NONE_SELECTION_VALUE];
            }

            if (autoApply === false) {
                setPendingValues(nextValues);
            } else {
                onChange && onChange(e, nextValues);
            }
            if (closeOnSelect && refContainer.current) {
                refContainer.current.close();
            }
            return;
        }

        if (filterType === FILTER_TYPE_SINGLE_SELECT) {
            if (autoApply === false) {
                setPendingValues([candidateValue]);
            } else {
                onChange && onChange(e, candidateValue);
            }
            if (closeOnSelect && refContainer.current) {
                refContainer.current.close();
            }
            return;
        }
    };
    const all = () => {
        const matchingValues = (sortedOptions || [])
            .filter((o) => {
                if (
                    enableTextSearch &&
                    searchText &&
                    searchText.trim().length > 0 &&
                    o.text
                ) {
                    return o.text?.toString().toLowerCase().includes(searchText.toLowerCase());
                }
                return true;
            })
            .map((v) => v.value);

        if (isMultiSelect) {
            if (autoApply === false) {
                setPendingValues(matchingValues);
            } else if (onChange) {
                onChange({} as any, matchingValues);
            }
        }

        if (closeOnSelect && refContainer.current) {
            refContainer.current.close();
        }
    };
    const none = (e: any) => {
        if (noneFunction) {
            noneFunction(e);
            return;
        } else {
            if (!sortedOptions) return;
            const matchingItems = sortedOptions.filter((o) => {
                if (
                    enableTextSearch &&
                    searchText &&
                    searchText.trim().length > 0 &&
                    o.text
                ) {
                    return o.text?.toString().toLowerCase().includes(searchText?.toString().toLowerCase());
                }
                return true;
            });

            if (isMultiSelect) {
                const finalValues = allNoneSameBehaviour ? matchingItems.map((v) => v.value) : [NONE_SELECTION_VALUE];
                if (autoApply === false) {
                    setPendingValues(finalValues);
                } else if (onChange) {
                    onChange({} as any, finalValues);
                }
            }
            if (closeOnSelect && refContainer.current) {
                refContainer.current.close();
            }
        }

    };

    const freeTextSelect = (searchText) => {
        setSearchText(searchText);
        // No-op: selection handled in render via searchText filter
    };

    const didAutoInitRef = useRef(false);
    useEffect(() => {
        if (!isMultiSelect || didAutoInitRef.current) return;
        if (options && options.length > 0) {
            const hasSelection = Array.isArray(selectedValues)
                ? selectedValues.length > 0
                : Boolean(selectedValues);
            if (!hasSelection && onChange) {
                didAutoInitRef.current = true;
                const allValues = options.map((o) => o.value);
                onChange({} as any, allValues);
            } else {
                didAutoInitRef.current = true;
            }

        }
    }, [isMultiSelect, options])

    useEffect(() => {
        if (!isMultiSelect) return;
        if (options && options.length > 0 && onChange) {
            const allValues = options.map((o) => o.value);
            onChange({} as any, allValues);
        }
    }, [isMultiSelect])



    const getSelected = useMemo(() => {
        if (filterType == FILTER_TYPE_SINGLE_SELECT) {
            const activeValue = autoApply === false && pendingValues !== null ? pendingValues[0] : value;
            const selectedItem =
                activeValue !== undefined && activeValue !== null
                    ? sortedOptions?.filter((v) => v.value == activeValue)[0]
                    : null;
            return selectedItem ? `${placeholder ? placeholder + " " : ""}${selectedItem.text}` : "";
        } else {
            const selectedCount = effectiveValues
                ? effectiveValues.filter((v) => {
                    if (v == Number.MIN_SAFE_INTEGER) {
                        return false;
                    }

                    if (hiddenFilters && hiddenFilters.length > 0) {
                        return !(hiddenFilters.indexOf(v) != -1);
                    }

                    return true;
                }).length
                : 0;

            const totalCount = sortedOptions?.filter((f) => {
                if (hiddenFilters && hiddenFilters.length > 0) {
                    return !(hiddenFilters.indexOf(f.id) != -1);
                }
                return true;
            }).length || 0;

            return `${placeholder} (${selectedCount}/${totalCount})`;
        }
    }, [sortedOptions, effectiveValues, filterType, autoApply, pendingValues, value]);
    const refContainer = useRef<DropdownProps>(null);


    const selectedText = getSelected;
    const selectedString = typeof selectedText === 'string' ? selectedText : '';
    const displayText = (selectedString && selectedString.length > 0) ? selectedString : (placeholder || "");

    const initialSingleValueRef = useRef<any>(undefined);
    useEffect(() => {
        if (filterType === FILTER_TYPE_SINGLE_SELECT && initialSingleValueRef.current === undefined && value !== undefined) {
            initialSingleValueRef.current = value;
        }
    }, [filterType, value]);

    const isAppliedClass = filterType === FILTER_TYPE_SINGLE_SELECT
        ? (value !== undefined && value !== null && value !== initialSingleValueRef.current)
        : (current && current.length > 0);

    return (
        // @ts-ignore
        <Dropdown
            {...restProps}
            ref={refContainer as unknown as LegacyRef<HTMLDivElement>}
            fluid
            text={displayText}
            scrolling={false}
            button
            icon={"angle down"}
            multiple={isMultiSelect}
            search
            floating={false}
            value={value}
            closeOnChange={closeOnSelect}
            {...(isMultiSelect ? { renderLabel: () => null } : {})}
            className={`multiple ${isAppliedClass ? "applied " : ""}`}
        >
            <Dropdown.Menu>
                {filterType != FILTER_TYPE_SINGLE_SELECT && (
                    <>
                        <Segment>
                            <Dropdown.Item>
                                <Label basic onClick={all}>
                                    {allLabel}
                                </Label>{" "}
                                |{" "}
                                <Label basic onClick={none}>
                                    {noneLabel}
                                </Label>
                            </Dropdown.Item>
                        </Segment>
                        {enableTextSearch && (
                            <>
                                <Container>
                                    <Dropdown.Item>
                                        <div className="ui action input">
                                            <div className="ui input">
                                                <input
                                                    className="filter-search"
                                                    value={searchText}
                                                    placeholder="Search..."
                                                    onChange={(e) => freeTextSelect(e.target.value)}
                                                    onMouseDown={(e) => e.stopPropagation()}
                                                    onClick={(e) => e.stopPropagation()}
                                                    type="text"
                                                    autoComplete="off"
                                                />
                                                <Icon
                                                    name="remove"
                                                    link
                                                    className="clear-icon ignore"
                                                    onClick={() => freeTextSelect("")}
                                                />
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                </Container>
                                <Divider />
                            </>
                        )}
                    </>
                )}
                <br></br>
                <Container className={useSingleColumn ? "dropdown-single-column" : ""}>
                    {sortedOptions?.filter((o) => {
                        if (
                            enableTextSearch &&
                            searchText &&
                            searchText.trim().length > 0 &&
                            o.text
                        ) {
                            return o.text?.toString().toLowerCase().includes(searchText.toLowerCase());
                        }
                        return true;
                    })
                        .map(({ value: optionValue, text }, index) => (
                            <Dropdown.Item
                                key={index}
                                className={useSingleColumn ? "dropdown-item-single-column" : ""}
                            >

                                {filterType === FILTER_TYPE_SINGLE_SELECT && (
                                    <Radio
                                        checked={(autoApply === false && pendingValues !== null ? pendingValues[0] : value) == optionValue}
                                        onChange={(e) => {
                                            changeFilter(e, optionValue)
                                        }}
                                        label={text}
                                    />
                                )}
                                {filterType === FILTER_TYPE_MULTI_SELECT && (
                                    <Checkbox
                                        checked={
                                            effectiveValues &&
                                            effectiveValues.some(
                                                (selectedValue) => toValueKey(selectedValue) === toValueKey(optionValue)
                                            )
                                        }
                                        onChange={() => changeFilter(null, optionValue)}
                                        label={text}
                                    />
                                )}
                            </Dropdown.Item>
                        ))}
                </Container>
                {autoApply === false && (
                    <Segment>
                        <Dropdown.Item>
                            <Label basic onClick={() => {
                                const applyVal = filterType === FILTER_TYPE_SINGLE_SELECT
                                    ? (pendingValues !== null ? pendingValues[0] : value)
                                    : (pendingValues !== null ? pendingValues : selectedValues);
                                onChange && onChange({} as any, applyVal);
                                setPendingValues(null);
                                if (refContainer.current) {
                                    refContainer.current.close();
                                }
                            }}>
                                Apply
                            </Label>
                        </Dropdown.Item>
                    </Segment>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default PostsFilterDropdown;

