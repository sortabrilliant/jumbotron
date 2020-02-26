import { RawHTML } from '@wordpress/element';

const save = ( { attributes, className } ) => {
	const { videos } = attributes;
	const [ fisrtVideo ] = videos;

	return (
		<div className={ className }>
			{ fisrtVideo && (
				<figure className="jumbotron-player">
					<video
						controls={ true }
						poster={ fisrtVideo.poster }
						src={ fisrtVideo.url }
					/>
					{ fisrtVideo.description && (
						<figcaption>
							<RawHTML>{ fisrtVideo.description }</RawHTML>
						</figcaption>
					) }
				</figure>
			) }
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
