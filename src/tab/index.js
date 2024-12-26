import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { tabIcon } from '../utils/icons';

registerBlockType(metadata, {
	icon: tabIcon,
	edit: Edit,

	save: () => <InnerBlocks.Content />
});