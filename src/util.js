/**
 * External dependencies
 */
import { pick } from 'lodash';

export function defaultColumnsNumber( attributes ) {
	return Math.min( 2, attributes.videos.length );
}

export function pickRelevantMediaFiles( video ) {
	return pick( video, [ 'id', 'url' ] );
}
