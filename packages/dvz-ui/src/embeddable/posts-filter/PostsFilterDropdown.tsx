import React, { LegacyRef, useEffect, useRef, useState } from "react";
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
    type?: string
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
        // autoApply,
        // taxonomy,
        // type,
        value,
        closeOnSelect = true
    } = props;

    const isMultiSelect = filterType === FILTER_TYPE_MULTI_SELECT;

    const selectedValues = Array.isArray(value) ? value : (current || []);
    const [searchText, setSearchText] = useState("");
    // const [searchFilter, setSearchFilter] = useState("");
    const changeFilter = (e: any, value: any) => {
        if (filterType === FILTER_TYPE_MULTI_SELECT) {
            let nextValues = Array.isArray(selectedValues) ? [...selectedValues] : [];
            if (nextValues.indexOf(value) > -1) {
                nextValues = nextValues.filter((i) => i !== value);
            } else {
                nextValues = [...nextValues, value];
            }

            return onChange && onChange(e, nextValues);
        }

        if (filterType === FILTER_TYPE_SINGLE_SELECT) {
            return onChange && onChange(e, value);
        }


        if (closeOnSelect && refContainer.current) {
            refContainer.current.close();
        }
    };
    const all = () => {
        const matchingValues = (options || [])
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

        if (isMultiSelect && onChange) {
            onChange({} as any, matchingValues);
        }

        if (!isMultiSelect && closeOnSelect && refContainer.current) {
            refContainer.current.close();
        }
    };
    const none = () => {
        let nextValues: any[] = [];
        if (allNoneSameBehaviour) {
            nextValues = (options || [])
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
        }
        if (isMultiSelect && onChange) {
            onChange({} as any, nextValues);
        }
        if (!isMultiSelect && closeOnSelect && refContainer.current) {
            refContainer.current.close();
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
    }, [])



    const getSelected = () => {
        if (filterType == FILTER_TYPE_SINGLE_SELECT) {
            const selectedItem =
                value
                    ? options?.filter((v) => v.value == value)[0]
                    : null;
            return selectedItem ? selectedItem.text : "";
        } else {
            const selectedCount = selectedValues
                ? selectedValues.filter((v) => {
                    if (v == Number.MIN_SAFE_INTEGER) {
                        return false;
                    }

                    if (hiddenFilters && hiddenFilters.length > 0) {
                        return !(hiddenFilters.indexOf(v) != -1);
                    }

                    return true;
                }).length
                : 0;

            const totalCount = options?.filter((f) => {
                if (hiddenFilters && hiddenFilters.length > 0) {
                    return !(hiddenFilters.indexOf(f.id) != -1);
                }
                return true;
            }).length || 0;

            return `${placeholder} (${selectedCount}/${totalCount})`;
        }
    };
    const refContainer = useRef<DropdownProps>(null);


    const selectedText = getSelected();
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
            {...props}
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
                                                    onChange={(e) => {
                                                        if (e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                                                            // @ts-ignore
                                                            e.nativeEvent.stopImmediatePropagation();
                                                        }
                                                        freeTextSelect(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                                                            // @ts-ignore
                                                            e.nativeEvent.stopImmediatePropagation();
                                                        }
                                                    }}
                                                    onKeyUp={(e) => {
                                                        if (e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                                                            // @ts-ignore
                                                            e.nativeEvent.stopImmediatePropagation();
                                                        }
                                                    }}
                                                    onKeyPress={(e) => {
                                                        if (e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
                                                            // @ts-ignore
                                                            e.nativeEvent.stopImmediatePropagation();
                                                        }
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    onFocus={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    type="text"
                                                    autoComplete="off"
                                                />

                                                <Icon
                                                    name="remove"
                                                    link
                                                    className="clear-icon ignore"
                                                    onClick={(_e) => {
                                                        freeTextSelect("");
                                                    }}
                                                ></Icon>
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
                    {options?.filter((o) => {
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
                                        checked={value === optionValue}
                                        onChange={(e) => {
                                            changeFilter(e, optionValue)
                                        }}
                                        label={text}
                                    />
                                )}
                                {filterType === FILTER_TYPE_MULTI_SELECT && (
                                    <Checkbox
                                        checked={
                                            selectedValues &&
                                                selectedValues.indexOf(optionValue) > -1 &&
                                                !(
                                                    options.length == selectedValues.length && allNoneSameBehaviour
                                                )
                                                ? true
                                                : false
                                        }
                                        onChange={() => changeFilter(null, optionValue)}
                                        label={text}
                                    />
                                )}
                            </Dropdown.Item>
                        ))}
                </Container>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default PostsFilterDropdown;
