/**
 * Internal dependencies
 */
import icon from './icon';
import edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

const { name, category, attributes } = metadata;

registerBlockType( name, {
	title: 'Jumbotron',
	description: '',
	keywords: [ 'videos', 'gallery' ],
	icon,
	category,
	attributes,
	edit,
	save,
} );
