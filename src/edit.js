/**
 * WordPress dependencies
 */
import { IconButton, Toolbar, withNotices } from '@wordpress/components';
import {
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaUpload,
} from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import icon from './icon';
import Player from './player';
import Gallery from './gallery';
import { pickRelevantMediaFiles } from './util';

const ALLOWED_MEDIA_TYPES = [ 'video' ];

class JumbotronEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectVideo = this.onSelectVideo.bind( this );
		this.onSelectVideos = this.onSelectVideos.bind( this );

		this.state = {
			selectedVideo: null,
		};
	}

	onSelectVideo( index ) {
		return () => {
			if ( this.state.selectedVideo !== index ) {
				this.setState( {
					selectedVideo: index,
				} );
			}
		};
	}

	onSelectVideos( videos ) {
		this.props.setAttributes( {
			videos: videos.map( ( video ) => pickRelevantMediaFiles( video ) ),
		} );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			noticeOperations,
			noticeUI,
		} = this.props;
		const { selectedVideo } = this.state;
		const { videos } = attributes;

		const hasVideos = !! videos.length;

		const mediaPlaceholder = (
			<MediaPlaceholder
				addToGallery={ hasVideos }
				isAppender={ hasVideos }
				className={ className }
				disableMediaButtons={ hasVideos && ! isSelected }
				icon={ ! hasVideos && <BlockIcon icon={ icon } /> }
				labels={ {
					title: ! hasVideos && 'Jumbotron',
					instructions:
						! hasVideos &&
						'Drag videos, upload new ones or select files from your library.',
				} }
				onSelect={ this.onSelectVideos }
				accept="video/*"
				allowedTypes={ ALLOWED_MEDIA_TYPES }
				multiple
				value={ videos }
				onError={ noticeOperations.createErrorNotice }
				notices={ hasVideos ? undefined : noticeUI }
			/>
		);

		const controls = (
			<BlockControls>
				{ hasVideos && (
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectVideos }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							multiple
							value={ videos.map( ( video ) => video.id ) }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label="Edit gallery"
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				) }
			</BlockControls>
		);

		if ( ! hasVideos ) {
			return mediaPlaceholder;
		}

		const [ firstVideo ] = videos;

		return (
			<Fragment>
				{ controls }
				{ noticeUI }
				<div className={ className }>
					<Player video={ selectedVideo || firstVideo } />
					<Gallery
						{ ...this.props }
						mediaPlaceholder={ mediaPlaceholder }
						onSelectVideo={ this.onSelectVideo }
					/>
				</div>
			</Fragment>
		);
	}
}

export default withNotices( JumbotronEdit );
