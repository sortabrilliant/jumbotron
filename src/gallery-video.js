/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

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
		const { id, title, url, description, fileLength } = this.props;

		return (
			<>
				<a
					href={ url }
					className="jumbotron-gallery-item__link"
					data-id={ id }
					data-desc={ description }
					onClick={ this.onSelectVideo }
				>
					{ title }
				</a>
				<span className="jumbotron-gallery-item__time">
					{ fileLength }
				</span>
			</>
		);
	}
}

export default GalleryVideo;
