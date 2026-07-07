import React, {useRef, useState,useEffect} from "react";
import DataProvider from "../data/DataProvider.jsx";
import DataConsumer from "../data/DataConsumer.jsx";
import {connect} from "react-redux";
import { formatContent } from "../chart/Tooltip.jsx";

const Chart = (props) => {
    const {
        editing = false,
        unique,
        intl,
        childContent,
        "data-csv": csv = "",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
         "data-view-mode": editMode = 'info',        
        'data-app': app,
        'data-measures': measures = '{}',
        'data-format': format = '{}',
        'data-group': group,
        'data-filters': filters = '[]',
        'data-number-font-size': numberFontSize = 20,       
        'data-number-color': numberColor = '#000000',
        "data-wait-for-filters": waitForFilters = "false",
        "data-no-data-text": noDataText = "-",
        "data-text-template": textTemplate = "",
    } = props
  
    const locale = intl.locale
    const ref = useRef(null);
    let autoHeight = false;
    let frameId = '';
    try {
        const sp = new URLSearchParams(window.location.search);
        autoHeight = sp.get('autoHeight') === '1' || sp.get('autoHeight') === 'true';
        frameId = sp.get('frameId') || '';
    } catch (e) {}
    const decode = (value) => {
        if (editing) {
            return value
        }
        return decodeURIComponent(value)
    }

    const parse = (value) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            console.error("error parsing value:" + value)
        }
        return null
    }

    const formatObject = parse(format)
    const numberFormat = formatObject ? {
        style: (formatObject.style === 'compacted') ? 'decimal' : formatObject.style,
        notation: (formatObject.style === 'compacted') ? 'compact' : "standard",
        currency: formatObject.currency,
        minimumFractionDigits: parseInt(formatObject.minimumFractionDigits),
        maximumFractionDigits: parseInt(formatObject.maximumFractionDigits)
    } : {
        notation: "standard",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    const [mode, setMode] = useState(editMode)
    const viewMode = editing ? editMode : mode
    // Let height auto-adjust to content; provide a minimal line height
    const minLineHeightPx = Math.max(24, (numberFontSize || 14) * 1.2)

    const parsedMeasures = parse(measures);
    const measuresList = parsedMeasures !== null
        ? parsedMeasures
        : (typeof measures === 'string' && measures && !measures.trim().startsWith('{') && !measures.trim().startsWith('[')
            ? [measures]
            : []);
    const params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
      }

    const dimensions = []
    // Enable auto-resize if embedded with autoHeight flag
    useAutoHeight(ref, autoHeight, frameId);
    return (<span ref={ref} >
             <DataProvider
                style={{ minHeight: `${minLineHeightPx}px` }}
                params={params}
                app={app}
                group={group}
                csv={csv}
                editing={editing}
                waitForFilters={waitForFilters === "true"}
                store={[app, unique, ...dimensions]} source={dimensions.join("/")}>
                                        <DataConsumer>
                        <DataFrame
                          locale={locale}
                          intl={intl}
                          app={app}
                          format={numberFormat}
                          measure={measuresList[0] || null}                            
                            numberFontSize={numberFontSize}
                            numberColor={numberColor}                         
                                                        noDataText={noDataText}
                                                        textTemplate={textTemplate}
                          >
                       </DataFrame>
                    </DataConsumer>
            </DataProvider>

        </span>)

}

const DataFrame = (props) => {
    const {
        app, measure, data, format, numberColor, numberFontSize, noDataText = '-', textTemplate = '', intl
    } = props;

    let measureField = measure;
    let dataItem = data;

    if (app === 'csv' && data?.meta?.fields && data?.data?.length) {
        measureField = data.meta.fields[0];
        dataItem = data.data[0];
    }

    const rawValue = dataItem?.[measureField] ?? null;
    const value = rawValue ? (format?.style === 'percent' ? rawValue / 100 : rawValue) : null;
    const [targetValue, setTargetValue] = useState(value);

    useEffect(() => {
        if (value !== null && value !== undefined) {
            setTargetValue(value);
        }
    }, [value]);

    const numberStyle = {
        color: decodeURIComponent(numberColor),
        fontSize: numberFontSize + 'px',
        textAlign: 'center',
        whiteSpace: 'normal',
        wordBreak: 'break-word'
    };

    const formatNumber = (val) =>
        intl.formatNumber(val, { ...format });

   const sanitizeHtml = (html) => {
        if (!html) return '';
        let out = String(html);
        out = out.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        out = out.replace(/\son\w+=(?:"[^"]*"|'[^']*')/gi, '');
        return out;
    };

    const renderTemplateHtml = () => {       
        const rowVars = (dataItem && typeof dataItem === 'object') ? dataItem : {};
        const variables = {
            ...rowVars,
            measure: measureField || '',
            rawValue: rawValue,     
            value: value,           
            formattedValue: (value !== null && value !== undefined) ? formatNumber(value) : noDataText
        };

        const formattedValue = value !== null ? formatNumber(value) : null;

       
        let templateStr = decodeURIComponent(textTemplate) || '';        
        templateStr = templateStr.replace(/(\%|\#C|\#)\(\s*([^)]*?)\s*\)/g, (m, sig, inner) => {
            const compactInner = inner.replace(/\s+/g, '');
            return `${sig}(${compactInner})`;
        });

        const fmtNum = (n, digits, style) => intl.formatNumber(n, { maximumFractionDigits: digits ?? 2, ...style });
        const getVar = (k) => {
            const v = variables[k];
            return typeof v === 'string' ? Number(v) : v;
        };
        
        templateStr = templateStr.replace(/#C\(\{([a-zA-Z0-9_]+)\}(?:,([0-9]+))?\)/g, (m, key, d) => {
            const n = getVar(key);
            if (n == null || isNaN(n)) return '';
            return fmtNum(n, d ? parseInt(d) : 2, { notation: 'compact' });
        });

        // #({field},d) decimal
        templateStr = templateStr.replace(/#\(\{([a-zA-Z0-9_]+)\}(?:,([0-9]+))?\)/g, (m, key, d) => {
            const n = getVar(key);
            if (n == null || isNaN(n)) return '';
            return fmtNum(n, d ? parseInt(d) : 2, { style: 'decimal' });
        });

        // %({field},d) percent (expects value in whole percent)
        templateStr = templateStr.replace(/%\(\{([a-zA-Z0-9_]+)\}(?:,([0-9]+))?\)/g, (m, key, d) => {
            const n = getVar(key);
            if (n == null || isNaN(n)) return '';
            const val = n / 100;
            return fmtNum(val, d ? parseInt(d) : 2, { style: 'percent' });
        });

        const withFormatting = formatContent(templateStr, variables, intl, false);

       const finalHtml = (withFormatting && withFormatting.trim().length)
            ? withFormatting
            : (formattedValue ?? noDataText);
        return sanitizeHtml(finalHtml);
    };


    return (
        <span style={numberStyle} dangerouslySetInnerHTML={{ __html: renderTemplateHtml() }} />
    );
};


const useAutoHeight = (ref, enabled, id) => {
    useEffect(() => {
        if (!enabled) return;
        const target = ref.current || document.body;
        const post = () => {
            try {
                const h = (ref.current ? ref.current.scrollHeight : document.body.scrollHeight) || 0;
                if (window.parent && h) {
                    window.parent.postMessage({ type: 'dvz-embed-height', id, height: h }, '*');
                }
            } catch (e) {}
        };
        const observer = new MutationObserver(() => {
            requestAnimationFrame(post);
        });
        observer.observe(target, { childList: true, subtree: true, characterData: true });
        // initial post
        setTimeout(post, 0);
        return () => observer.disconnect();
    }, [ref, enabled, id]);
};


const mapStateToProps = (state, ownProps) => {
    const {"data-app": app, "data-group": group,} = ownProps
    const injectedMeasures = state.getIn(['data', 'measures', app, group])
    if (injectedMeasures) {
        return {
            "injectedMeasures": injectedMeasures,
        }
    } else {
        return {}
    }
}
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Chart)
