import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { tabsIcon } from '../utils/icons';

registerBlockType(metadata, {
	icon: tabsIcon,
	edit: Edit,
	save: () => <InnerBlocks.Content />
});