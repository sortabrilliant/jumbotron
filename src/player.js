import { Disabled } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';

const Player = ( { video } ) => {
	if ( ! video ) {
		return null;
	}

	return (
		<figure className="jumbotron-player">
			<Disabled>
				<video
					controls={ true }
					poster={ video.poster }
					src={ video.url }
				/>
			</Disabled>
			{ video.description && (
				<figcaption>
					<RawHTML>{ video.description }</RawHTML>
				</figcaption>
			) }
		</figure>
	);
};

export default Player;
