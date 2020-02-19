/**
 * External dependencies
 */
import { pick } from 'lodash';

export function pickRelevantMediaFiles( video ) {
	return pick( video, [ 'id', 'title', 'url', 'description', 'fileLength' ] );
}
