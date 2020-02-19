const save = ( { attributes, className } ) => {
	const { videos } = attributes;

	return (
		<div className={ className }>
			<ul className="jumbotron-gallery">
				{ videos.map( ( video ) => {
					return (
						<li className="jumbotron-gallery-item" key={ video.id }>
							<a
								href={ video.url }
								className="jumbotron-gallery-item__link"
								data-id={ video.id }
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
