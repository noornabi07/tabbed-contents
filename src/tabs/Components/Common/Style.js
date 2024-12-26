import { getBackgroundCSS, getBorderBoxCSS, getBoxCSS, getColorsCSS, getTypoCSS } from "../../../../../bpl-tools/utils/getCSS";

const Style = ({ attributes, id }) => {
	const { tabColors, tabActiveColors, tabBorder = {}, icon, tabsPadding, options, titleTypo, contentBG, borderBG = {}, borderHeight = {} } = attributes;
	const { active = {} } = tabBorder;
	const { theme = "default" } = options;
	const { height = "3px" } = borderHeight;

	const mainSl = `#${id}`;
	const tabMenu = `${mainSl} .tabMenu`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS(``, titleTypo)?.googleFontLink}
		${getTypoCSS(`${mainSl} li .tabLabel`, titleTypo)?.styles}

		${tabMenu} {
			padding: ${getBoxCSS(tabsPadding)};
		}
		${tabMenu} li {
			${getColorsCSS(tabColors)}
		}
		
		${tabMenu} li::after{
			${getBackgroundCSS(borderBG)}
		}

		${theme === "theme1" ? `${tabMenu} li::after {
			height: ${height};
			${getBackgroundCSS(borderBG)};
		}` : ""}
		
		${tabMenu} li.active {
			${getColorsCSS(tabActiveColors)}
			${getBorderBoxCSS(active)}				
		}
		${tabMenu} li .menuIcon i {
			font-size: ${icon.size};
			color: ${icon.color};
		}
		${tabMenu} li.active .menuIcon i {
			color: ${icon.activeColor};
		}
		${mainSl} .tabContent {
			${getBackgroundCSS(contentBG)}
		}
	`,
	}} />
};
export default Style;