import {
  PanelRow,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const Labels = (props) => {
  const {
    setAttributes,
    attributes: {
      barLabelPosition,
      lineLabelPosition,
      type,
    },
  } = props;

  return [
    <>
      {type == "bar" && (
        <PanelRow>
          <SelectControl
            label={__("Bar Label Position", "dg")}
            value={[barLabelPosition]}
            onChange={(barLabelPosition) => {
              setAttributes({ barLabelPosition: barLabelPosition });
            }}
            options={[
              { label: __("Top", "dg"), value: "top" },
              { label: __("Middle", "dg"), value: "middle" },
              { label: __("None", "dg"), value: "none" },
            ]}
            style={{ width: "120px" }}
          />
        </PanelRow>
      )}

      {type == "line" && (
        <PanelRow>
          <SelectControl
            label={__("Point Label Position", "dg")}
            value={[lineLabelPosition]}
            onChange={(position) => {
              setAttributes({ lineLabelPosition: position });
            }}
            options={[
              { label: __("On Top", "dg"), value: "top" },
              { label: __("None", "dg"), value: "none" },
            ]}
            style={{ width: "120px" }}
          />
        </PanelRow>
      )}
    </>,
  ];
};

export default Labels;
