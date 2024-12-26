import { InnerBlocks } from "@wordpress/block-editor";

import Settings from "./Settings/Settings";

const Edit = (props) => {
  const { attributes, setAttributes, clientId } = props;
  const { title } = attributes;

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} />
      <div className="wp-block-tcb-tab" id={`tcbTabContentTab-${clientId}`}>
        <InnerBlocks
          template={[
            [
              "core/heading",
              {
                level: 3,
                content: title,
                style: {
                  typography: { fontSize: "28px" }
                },
              },
            ],
            [
              "core/paragraph",
              {
                content: `Welcome to the amazing world of our WordPress plugin, ${title}! This plugin is designed to enhance your website's functionality and provide a seamless user experience. With its intuitive interface and powerful features, you can easily manage your content and customize your site to your liking. 
${title} offers a variety of tools to help you optimize your site for search engines, improve your site's performance, and engage your audience. Whether you're a beginner or an experienced developer, you'll find ${title} easy to use and highly effective.
Experience the difference with ${title} and take your website to the next level. Try it out today and see the results for yourself!`,
                style: {
                  typography: { fontSize: "15px" },
                },
              },
            ]
          ]}
        />
      </div>
    </>
  );
};

export default Edit;