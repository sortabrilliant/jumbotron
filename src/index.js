/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

const { name, category, attributes } = metadata;

registerBlockType( name, {
	title: 'Jumbotron',
	description: '',
	icon: 'editor-video',
	keywords: [ 'videos', 'gallery' ],
	category,
	attributes,
	edit() {
		return <p>Kiss cam</p>;
	},
	save() {
		return <p>Kiss cam</p>;
	},
} );
