import { RawHTML } from '@wordpress/element';

const save = ( { attributes, className } ) => {
	const { videos } = attributes;
	const [ fisrtVideo ] = videos;

	return (
		<div className={ className }>
<<<<<<< HEAD
			<figure className="jumbotron-player">
				<video controls={ true } src={ fisrtVideo.url } />
				{ fisrtVideo.description && (
					<figcaption>
						<RawHTML>{ fisrtVideo.description }</RawHTML>
					</figcaption>
				) }
			</figure>
=======
			{ fisrtVideo && (
				<figure className="jumbotron-player">
					<video
						controls={ true }
						poster={ fisrtVideo.poster }
						src={ fisrtVideo.url }
					/>
					{ fisrtVideo.description && (
						<figcaption>{ fisrtVideo.description }</figcaption>
					) }
				</figure>
			) }
>>>>>>> Adds support for manual poster images
			<ul className="jumbotron-gallery">
				{ videos.map( ( video ) => {
					return (
						<li className="jumbotron-gallery-item" key={ video.id }>
							<a
								href={ video.url }
								className="jumbotron-gallery-item__link"
								data-id={ video.id }
								data-poster={ video.poster }
								data-desc={ video.description }
							>
								{ video.title }
							</a>
							<span className="jumbotron-gallery-item__time">
								{ video.fileLength }
							</span>
						</li>
					);
				} ) }
			</ul>
		</div>
	);
};

export default save;
