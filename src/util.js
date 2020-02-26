/**
 * External dependencies
 */
import { get, pick } from 'lodash';

export function pickRelevantMediaFiles( video ) {
	const videoProps = pick( video, [
		'id',
		'title',
		'url',
		'description',
		'icon',
		'fileLength',
	] );
	const vidoeImage = get( video, [ 'image', 'src' ] );

	videoProps.poster = videoProps.icon !== vidoeImage ? vidoeImage : null;

	return videoProps;
}
