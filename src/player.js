import { Disabled } from '@wordpress/components';

const Player = ( { video } ) => {
	if ( ! video ) {
		return null;
	}

	return (
		<figure className="jumbotron-player">
			<Disabled>
				<video controls={ true } src={ video.url } />
			</Disabled>
			{ video.description && (
				<figcaption>{ video.description }</figcaption>
			) }
		</figure>
	);
};

export default Player;
