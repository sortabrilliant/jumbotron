import GalleryVideo from './gallery-video';

const Gallery = ( props ) => {
	const { attributes, isSelected, mediaPlaceholder, onSelectVideo } = props;
	const { videos } = attributes;

	return (
		<>
			<ul className="jumbotron-gallery">
				{ videos.map( ( video ) => {
					return (
						<li
							className="jumbotron-gallery-item"
							key={ video.id || video.url }
						>
							<GalleryVideo
								{ ...video }
								onSelectVideo={ onSelectVideo( video ) }
							/>
						</li>
					);
				} ) }
			</ul>
			{ isSelected && mediaPlaceholder }
		</>
	);
};

export default Gallery;
