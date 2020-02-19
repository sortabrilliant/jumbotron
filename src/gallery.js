import GalleryVideo from './gallery-video';

const Gallery = ( props ) => {
	const {
		attributes,
		isSelected,
		mediaPlaceholder,
		onSelectVideo,
		onMoveUp,
		onMoveDown,
	} = props;
	const { videos } = attributes;

	return (
		<>
			<ul className="jumbotron-gallery">
				{ videos.map( ( video, index ) => {
					return (
						<li
							className="jumbotron-gallery-item"
							key={ video.id || video.url }
						>
							<GalleryVideo
								{ ...video }
								isFirstItem={ index === 0 }
								isLastItem={ index + 1 === videos.length }
								onMoveUp={ onMoveUp( index ) }
								onMoveDown={ onMoveDown( index ) }
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
