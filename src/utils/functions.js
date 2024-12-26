import { produce } from 'immer';

const addClass = (el, cl) => el?.classList.add(cl);
const remClass = (el, cl) => el?.classList.remove(cl);

export const getBoxValue = (object) => Object.values(object).join(' ');

const getIndex = (el) => Array.from(el?.parentElement?.children || [])?.indexOf(el);

export const tabInit = (wrapEl, targetMenuItem) => {
	const listEls = wrapEl.querySelectorAll(`.tabMenu > li`);
	const bodyEls = wrapEl.querySelectorAll(`.wp-block-tcb-tab`);

	// Remove Active Classes
	listEls.forEach((el) => {
		remClass(el, 'active');
	});
	bodyEls.forEach((bodyEl) => {
		remClass(bodyEl, 'active');
		remClass(bodyEl, 'activeContent');
	});

	// Add Active Classes
	addClass(targetMenuItem, 'active');

	const bodyEl = bodyEls[getIndex(targetMenuItem)];
	addClass(bodyEl, 'active');

	// Opacity Transition Class
	const timeout = setTimeout(() => {
		addClass(bodyEl, 'activeContent');
		clearTimeout(timeout);
	}, 50);
};

export const themeSwitch = (theme = 'default', attributes) => produce(attributes, (draft) => {
	draft['options']['theme'] = theme;

	switch (theme) {
		case 'default':
			draft['tabsPadding'] = { top: "0px", right: "0px", bottom: "0px", left: "0px" };

			draft['tabColors'] = { color: "#333", bgType: 'gradient', gradient: "linear-gradient(to right, #f3fbed, #f1f9eb, #f0f7e9, #e4eedc, #dbeccd)" };

			draft['tabActiveColors'] = { color: "#fff", bgType: "gradient", gradient: "linear-gradient(90deg, #019447 0%, #10d56d 100%)" }

			draft['tabBorder']['active'] = { left: { width: '0px', type: 'solid', color: '#118B50' } };

			draft['contentBG'] = { type: 'gradient', gradient: '-webkit-linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(232,243,214,1) 0%, rgba(242,246,203,1) 39%, rgba(242,246,202,1) 70%, rgba(252,249,190,1) 90%)', };

			draft['titleTypo'] = { fontSize: 20 }

			draft['icon'] = { size: '55px', color: '#000', activeColor: '#fff' };

			break;

		case 'theme1':
			draft['tabsPadding'] = { top: "0px", right: "0px", bottom: "0px", left: "0px" };

			draft['tabColors'] = { color: '#CCCCCC', bgType: 'solid', bg: "#fff" };

			draft['tabActiveColors'] = { color: '#A94AEB', bgType: 'solid', bg: '#fff' };

			draft['tabBorder']['active'] = { left: { width: '0px', type: 'solid', color: '#118B50' } };

			draft['contentBG'] = { type: 'solid', color: '#fff' };

			draft['titleTypo'] = { fontSize: 16 }

			draft['icon'] = { size: '18px', color: '#ccc', activeColor: '#b84de5' };
			break;

		case 'theme2':
			draft['tabsPadding'] = { top: "0px", right: "0px", bottom: "0px", left: "0px" };

			draft['tabColors'] = { color: '#CCCCCC', bgType: 'solid', bg: "#fff" };

			draft['tabActiveColors'] = { color: '#fff', bgType: 'solid', bg: '#4FDFB4' };

			draft['tabBorder']['active'] = { left: { width: '4px', type: 'solid', color: '#118B50' } };

			draft['contentBG'] = { type: 'solid', color: '#4FDFB4' };

			draft['titleTypo'] = { fontSize: 16 }

			draft['icon'] = { size: '15px', color: '#ccc', activeColor: '#fff' };
			break;

		case "theme3":
			draft['tabsPadding'] = { top: "0px", right: "0px", bottom: "0px", left: "0px" };

			draft['tabColors'] = { color: '#CCCCCC', bgType: 'solid', bg: "#fff" };

			draft['tabActiveColors'] = { color: '#fff', bgType: 'solid', bg: '#0A5EB0' };

			draft['tabBorder']['active'] = { left: { width: '0px', type: 'solid', color: '#118B50' } };

			draft['contentBG'] = { type: 'solid', color: '#0A97B0' };

			draft['icon'] = { size: '42px', color: '#CCCCCC', activeColor: '#fff' };
			break;

		case "theme4":
			draft['tabsPadding'] = { top: "0px", right: "0px", bottom: "0px", left: "0px" };

			draft['tabColors'] = { color: '#fff', bgType: 'solid', bg: "#2CC185" };

			draft['tabActiveColors'] = { color: '#fff', bgType: 'solid', bg: '#074799' };

			draft['tabBorder']['active'] = { left: { width: '0px', type: 'solid', color: '#118B50' } };

			draft['contentBG'] = { type: 'solid', color: '#fff' };

			draft['titleTypo'] = { fontSize: 16 }

			draft['icon'] = { size: '20px', color: '#fff', activeColor: '#fff' };
			break;

		case "theme5":
			draft['tabsPadding'] = { top: "0px", right: "0px", bottom: "10px", left: "0px" };

			draft['tabColors'] = { color: '#fff', bgType: 'solid', bg: "#BCCCDC" };

			draft['tabActiveColors'] = { color: '#fff', bgType: 'solid', bg: '#9AA6B2' };

			draft['tabBorder']['active'] = { left: { width: '0px', type: 'solid', color: '#118B50' } };

			draft['contentBG'] = { type: 'solid', color: '#F2F9FF' };

			draft['titleTypo'] = { fontSize: 16 }

			draft['icon'] = { size: '20px', color: '#fff', activeColor: '#fff' };

	}
});
