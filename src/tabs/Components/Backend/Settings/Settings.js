import { __ } from "@wordpress/i18n";
import { InspectorControls, BlockControls } from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
  ToolbarItem,
  Toolbar,
  Button,
  Dropdown,
  SelectControl,
  __experimentalBorderBoxControl as BorderBoxControl
} from "@wordpress/components";

import { Background, ColorControl, ColorsControl, IconControl, Typography } from "../../../../../../bpl-tools/Components";
import { produce } from "immer";
import { emUnit, pxUnit } from "../../../../../../bpl-tools/utils/options";
import { themeSwitch } from "../../../../utils/functions";

const Settings = ({ attributes, setAttributes, iconValue, setIconValue, isOpen, toggleDropdown }) => {
  const { tabsPadding, tabColors, tabActiveColors, titleTypo, icon, contentBG, options = {}, tabBorder = {}, borderHeight = {}, borderBG = {} } = attributes;
  const { size: iconSize, color, activeColor } = icon;
  const { active = {} } = tabBorder;
  const { height = "3px" } = borderHeight;

  const { theme = "default" } = options;

  return (
    <>
      <InspectorControls>
        {/* Tab/Menu Panel */}
        <PanelBody className="bPlPanelBody" title={__("Tab/Menu", "tabbed-contents")}>
          <BoxControl
            label={__("Padding", "tabbed-contents")}
            values={tabsPadding}
            resetValues={{
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onChange={(value) => setAttributes({ tabsPadding: value })}
          />
        </PanelBody>

        {/* Themes Panel */}
        <PanelBody title={__("Themes", "tabbed-contents")} initialOpen={true}>
          <SelectControl
            label={__("Select Theme:", "tabbed-contents")}
            value={theme}
            options={[
              { label: "Default", value: "default" },
              { label: "Theme 1", value: "theme1" },
              { label: "Theme 2", value: "theme2" },
              { label: "Theme 3", value: "theme3" },
              { label: "Theme 4", value: "theme4" },
              { label: "Theme 5", value: "theme5" }
            ]}
            labelPosition="left"
            onChange={(val) => setAttributes(themeSwitch(val, attributes))}
          />
        </PanelBody>

        {/* Tab Panel */}
        <PanelBody className="bPlPanelBody" title={__("Tab", "tabbed-contents")} initialOpen={false}>

          <ColorsControl
            label={__("Colors", "tcb")}
            value={tabColors}
            onChange={(val) => setAttributes({ tabColors: val })}
            defaults={{ color: "#333", bgType: "gradient", gradient: "linear-gradient(to right, #e7f5dd, #f1f9eb, #f8fff1, #e4eedc, #d5e3cb)" }}
          />

          <ColorsControl
            label={__("Active Colors", "tcb")}
            value={tabActiveColors}
            onChange={(val) => setAttributes({ tabActiveColors: val })}
            defaults={{ color: "#333", bgType: "gradient", gradient: "linear-gradient(to right, #019447, #f1f9eb, #10d56d, #e4eedc, #dbeccd)" }}
          />

          {/* active tab border control */}
          {
            "theme1" === theme ? "" : <BorderBoxControl label={__('Tab Borders')} value={active} onChange={val => {
              const newBorder = produce(tabBorder, draft => {
                draft.active = val
              })
              setAttributes({ tabBorder: newBorder })
            }} />
          }

          {
            "theme3" === theme ? "" : <Typography label={__("Title Typography", "tabbed-contents")} value={titleTypo} onChange={(val) => setAttributes({ titleTypo: val })} produce={produce} />
          }

          {
            "theme5" === theme ? "" : <>
              <UnitControl
                label={__("Icon Size", "tabbed-contents")}
                className="mt20"
                labelPosition="left"
                value={iconSize}
                onChange={(val) => setAttributes({ icon: { ...icon, size: val } })}
                units={[pxUnit(), emUnit()]}
              />

              <ColorControl label={__("Icon Color", "tabbed-contents")} value={color} onChange={(val) => setAttributes({ icon: { ...icon, color: val } })} />

              <ColorControl label={__("Icon Active Color", "tabbed-contents")} value={activeColor} onChange={(val) => setAttributes({ icon: { ...icon, activeColor: val } })} />
            </>
          }

          {
            "theme1" === theme && <>
              <UnitControl
                label={__("Active Border Bottom Size", "tabbed-contents")}
                className="mt20"
                labelPosition="left"
                value={height}
                onChange={(val) => {
                  const newBorder = produce(borderHeight, draft => {
                    draft.height = val
                  })
                  setAttributes({ borderHeight: newBorder })
                }}
                units={[pxUnit(), emUnit()]}
              />

              <Background label={__("Border Color", "tabbed-contents")} value={borderBG} onChange={(val) => setAttributes({ borderBG: val })} />
            </>

          }
        </PanelBody>

        {/* Content Panel */}
        <PanelBody className="bPlPanelBody" title={__("Content", "stepped-content")} initialOpen={false}>
          <Background label={__("Background", "tabbed-contents")} value={contentBG} onChange={(val) => setAttributes({ contentBG: val })} />
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <Toolbar label="Options">
          <Dropdown
            popoverProps={{ placement: "bottom-start" }}
            contentClassName="tcbTabContentPopover"
            renderToggle={({ onToggle }) => {
              return <ToolbarItem icon="edit" as={Button} onClick={onToggle}></ToolbarItem>;
            }}
            renderContent={() => {
              return (
                <IconControl
                  className="mt20"
                  value={iconValue}
                  onChange={(val) => {
                    setIconValue(val);
                  }}
                  isSize={false}
                />
              );
            }}
            isOpen={isOpen}
            onClose={toggleDropdown}
          />
        </Toolbar>
      </BlockControls>
    </>
  );
};
export default Settings;
