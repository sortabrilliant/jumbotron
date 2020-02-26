/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { IconButton } from '@wordpress/components';

class GalleryVideo extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectVideo = this.onSelectVideo.bind( this );
	}

	onSelectVideo( event ) {
		event.preventDefault();
		this.props.onSelectVideo();
	}

	render() {
		const {
			id,
			title,
			url,
			description,
			poster,
			fileLength,
			isFirstItem,
			isLastItem,
			onMoveUp,
			onMoveDown,
		} = this.props;

		return (
			<>
				<a
					href={ url }
					className="jumbotron-gallery-item__link"
					data-id={ id }
					data-poster={ poster }
					data-desc={ description }
					onClick={ this.onSelectVideo }
				>
					{ title }
				</a>
				<span className="jumbotron-gallery-item__time">
					{ fileLength }
				</span>
				<span className="jumbotron-gallery-item__movers">
					<IconButton
						icon="arrow-up"
						onClick={ isFirstItem ? undefined : onMoveUp }
						className="jumbotron-gallery-item__move-up"
						label="Move video up"
						aria-disabled={ isFirstItem }
					/>
					<IconButton
						icon="arrow-down"
						onClick={ isLastItem ? undefined : onMoveDown }
						className="jumbotron-gallery-item__move-down"
						label="Move video down"
						aria-disabled={ isLastItem }
					/>
				</span>
			</>
		);
	}
}

export default GalleryVideo;
