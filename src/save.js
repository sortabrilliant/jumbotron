/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { defaultColumnsNumber } from './util';

const save = ( { attributes } ) => {
	const { videos, columns = defaultColumnsNumber( attributes ) } = attributes;

	return (
		<ul
			className={ classnames( 'jumbotron-gallery', {
				[ `columns-${ columns }` ]: columns,
			} ) }
		>
			{ videos.map( ( video ) => {
				return (
					<li className="jumbotron-gallery-item" key={ video.id }>
						<figure>
							<video
								controls={ true }
								src={ video.url }
								data-id={ video.id }
							/>
						</figure>
					</li>
				);
			} ) }
		</ul>
	);
};

export default save;
