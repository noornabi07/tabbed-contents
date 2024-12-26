import './style.scss';
import { tabInit } from '../utils/functions';

document.addEventListener('DOMContentLoaded', () => {
	const tabsEls = document.querySelectorAll('.wp-block-tcb-tabs');
	tabsEls.forEach(tabsEl => {
		// Initialize the first tab
		const menuEl = tabsEl.querySelector('.tabMenu');
		const tabs = tabsEl.querySelectorAll('.tabMenu li');
		tabInit(tabsEl, menuEl.children[0]);

		// Add click event listeners to all tabs
		tabs.forEach((tab) => {
			tab.addEventListener('click', function () {
				tabInit(tabsEl, tab);
			});
		});

		// Remove the 'data-attributes' attribute from the block
		tabsEl?.removeAttribute('data-attributes');
	});
});