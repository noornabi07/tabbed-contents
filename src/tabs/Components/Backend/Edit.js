import { useEffect, useState, useRef } from "react";
import { __ } from "@wordpress/i18n";
import { withDispatch, withSelect } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { useBlockProps, InnerBlocks, Inserter, RichText } from "@wordpress/block-editor";
import { IconButton } from "@wordpress/components";

import { getIconCSS } from "../../../../../bpl-tools/utils/getCSS";

import { tabInit } from "../../../utils/functions";
import Settings from "./Settings/Settings";
import Style from "../Common/Style";

// Define the template for inner blocks
const defaultThemeTab1 = [
  ["tcb/tab", { title: "HTML5 Audio Player", mediaType: "icon", icon: { class: "fa-solid fa-music" } }],
  ["tcb/tab", { title: "HTML5 Video Player", mediaType: "icon", icon: { class: "fa-solid fa-video" } }],
  ["tcb/tab", { title: "PDF Poster", mediaType: "icon", icon: { class: "fa-solid fa-file-pdf" } }],
];

const Edit = (props) => {
  const { attributes, setAttributes, clientId, innerBlocks, getBlock, getBlockAttributes, updateBlockAttributes, removeBlock } = props;

  const { options, tabs } = attributes;

  const { theme = "default" } = options;

  const blockRef = useRef(null);
  const menuRef = useRef(null);

  // State variables
  const [firstClientId, setFirstClientId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeClientId, setActiveClientId] = useState(false);
  const [titleValue, setTitleValue] = useState({});
  const [iconValue, setIconValue] = useState({});
  const [tabAttribute, setTabAttribute] = useState({});

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Update tabs attribute when innerBlocks change
  useEffect(() => {
    const newTabs = innerBlocks?.map(({ clientId, attributes: { title, mediaType, icon } }, index) => {
      if (index === 0) {
        setFirstClientId(clientId);
      }
      return { clientId, title, mediaType, icon };
    });

    setAttributes({ tabs: newTabs });
  }, [innerBlocks]);

  // Initialize tab on component mount
  useEffect(() => {
    menuRef.current.children[0] && tabInit(blockRef.current, menuRef.current.children[0]);
  }, []);

  // Initialize tab when firstClientId changes
  useEffect(() => {
    tabInit(blockRef.current, menuRef.current.children[0]);
  }, [firstClientId]);

  // Update tabAttribute, titleValue, and iconValue when activeClientId changes
  useEffect(() => {
    const block = getBlock(activeClientId);
    setTabAttribute(block?.attributes);
    setTitleValue(block?.attributes?.title || {});
    setIconValue(block?.attributes?.icon || {});
  }, [activeClientId]);

  // Update iconValue when it changes
  useEffect(() => {
    const newAttributes = { ...tabAttribute };
    newAttributes.icon = iconValue;
    updateBlockAttributes(activeClientId, newAttributes);
  }, [iconValue]);

  // Update titleValue when it changes
  useEffect(() => {
    const newAttributes = { ...tabAttribute };
    newAttributes.title = titleValue;
    updateBlockAttributes(activeClientId, newAttributes);
  }, [titleValue]);

  const id = `tabbed-content-${clientId}`;

  return (
    <>
      <Settings {...{ attributes, setAttributes, iconValue, setIconValue, isOpen, toggleDropdown }} />
      <div {...useBlockProps()} id={id}>
        <Style {...{ attributes, id }} />

        <div className={`tcbTabContent ${theme}`} ref={blockRef}>
          <ul className="tabMenu" ref={menuRef}>
            {tabs.map((tab, index) => (
              <Tab
                attributes={attributes}
                blockRef={blockRef}
                id={id}
                key={index}
                getBlockAttributes={getBlockAttributes}
                updateBlockAttributes={updateBlockAttributes}
                removeBlock={removeBlock}
                clientId={clientId}
                setActiveClientId={setActiveClientId}
                tab={tab}
                index={index}
              />
            ))}
          </ul>

          <div className="tabContent">
            <InnerBlocks
              allowedBlocks={["b-temp/tab"]}
              template={defaultThemeTab1}
              renderAppender={() => (
                <Inserter
                  rootClientId={clientId}
                  isAppender
                  renderToggle={({ onToggle, disabled }) => (
                    <IconButton className="bTempAddTab" onClick={onToggle} disabled={disabled} label={__("Add New Tab", "tabbed-contents")} icon="plus-alt">
                      {__("Add New Tab", "tabbed-contents")}
                    </IconButton>
                  )}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Tab = ({ blockRef, getBlockAttributes, id, updateBlockAttributes, removeBlock, setActiveClientId, tab, index, attributes }) => {
  const { clientId: childId, title, icon } = tab;
  const { options } = attributes;

  const [childAttr, setChildAttr] = useState({});

  const [titleValue, setTitleValue] = useState(title);

  useEffect(() => {
    setChildAttr(getBlockAttributes(childId));
  }, [childId]);

  useEffect(() => {
    const newAttr = { ...childAttr };
    newAttr.title = titleValue;
    updateBlockAttributes(childId, newAttr);
  }, [titleValue, childAttr]);

  const onListClick = (e) => {
    e.preventDefault();
    tabInit(blockRef.current, e.currentTarget);
    setActiveClientId(childId);
  };

  return (
    <li key={index} onClick={onListClick} className={index === 0 ? "active" : ""} id={`menuItem-${childId}`}>
      <style>
        {`#${id} .tabMenu #menuItem-${childId} .menuIcon i{
					${icon?.color || icon?.gradient ? getIconCSS(icon, false) : ""}
				}`}
      </style>

      <i
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          removeBlock(childId);

          const liEl = e.target.parentElement;
          const isActive = liEl.classList.contains("active");

          if (isActive) {
            const nextEl = liEl.nextSibling;
            const prevEl = liEl.previousSibling;

            if (prevEl) {
              setTimeout(() => {
                tabInit(blockRef.current, prevEl);
              }, 0);
            } else if (nextEl) {
              setTimeout(() => {
                tabInit(blockRef.current, nextEl);
              }, 0);
            }
          }
        }}
        className="fa-solid fa-xmark"
      ></i>

      {
        options?.theme === "default" || options?.theme === "theme1" || options?.theme === "theme2" || options?.theme === "theme3" || options?.theme === "theme4" ? <>{icon?.class ? (
          <span className="menuIcon">
            <i className={icon?.class}></i>
          </span>
        ) : null}</> : null
      }

      {
        options?.theme === "default" || options?.theme === "theme1" || options?.theme === "theme2" || options?.theme === "theme4" || options?.theme === "theme5" ? <RichText
          tagName="span"
          className="tabLabel"
          value={titleValue}
          onChange={(content) => setTitleValue(content)}
          placeholder={__("Enter Title", "tcb-block-title")}
          inlineToolbar
          allowedFormats={["core/bold", "core/italic"]}
        /> : null
      }

    </li>
  );
};

export default compose([
  withSelect((select, { clientId }) => {
    const { getBlocks, getBlock, getBlockAttributes } = select("core/block-editor");

    return {
      innerBlocks: getBlocks(clientId),
      getBlock,
      getBlockAttributes,
    };
  }),
  withDispatch((dispatch) => {
    const { updateBlockAttributes } = dispatch("core/block-editor");
    const { removeBlock } = dispatch("core/editor");

    return { updateBlockAttributes, removeBlock };
  }),
])(Edit);
