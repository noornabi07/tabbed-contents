import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

import { Label, IconControl } from "../../../../../../bpl-tools/Components";

const Settings = ({ attributes, setAttributes }) => {
  const title = attributes.title ? attributes.title : "";
  const icon = attributes.icon ? attributes.icon : "";

  return (
    <InspectorControls>
      <PanelBody className="bPlPanelBody" title={__("Tab Content", "tabbed-contents")}>
        {/* Title */}
        <Label className="mb5">{__("Title:", "tabbed-contents")}</Label>
        <TextControl value={title} onChange={(val) => setAttributes({ title: val })} />

        {/* Icon */}
        <IconControl
          className="mt20"
          value={icon}
          onChange={(val) => {
            setAttributes({ icon: val });
          }}
          isSize={false}
        />
      </PanelBody>
    </InspectorControls>
  );
};

export default Settings;
