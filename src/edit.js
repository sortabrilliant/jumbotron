/**
 * External dependencies
 */
import classnames from 'classnames';
import { filter } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	IconButton,
	PanelBody,
	RangeControl,
	Toolbar,
	withNotices,
} from '@wordpress/components';
import {
	BlockControls,
	BlockIcon,
	MediaPlaceholder,
	MediaUpload,
	InspectorControls,
} from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import icon from './icon';
import GalleryVideo from './gallery-video';
import { defaultColumnsNumber, pickRelevantMediaFiles } from './util';

const MAX_COLUMNS = 4;
const ALLOWED_MEDIA_TYPES = [ 'video' ];

class JumbotronEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectVideo = this.onSelectVideo.bind( this );
		this.onRemoveVideo = this.onRemoveVideo.bind( this );
		this.onSelectVideos = this.onSelectVideos.bind( this );
		this.setColumnsNumber = this.setColumnsNumber.bind( this );

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

	onRemoveVideo( index ) {
		return () => {
			const videos = filter(
				this.props.attributes.videos,
				( video, i ) => index !== i
			);
			const { columns } = this.props.attributes;
			this.setState( { selectedVideo: null } );
			this.props.setAttributes( {
				videos,
				columns: columns ? Math.min( videos.length, columns ) : columns,
			} );
		};
	}

	onSelectVideos( videos ) {
		this.props.setAttributes( {
			videos: videos.map( ( video ) => pickRelevantMediaFiles( video ) ),
		} );
	}

	setColumnsNumber( value ) {
		this.props.setAttributes( { columns: value } );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			noticeOperations,
			noticeUI,
		} = this.props;
		const {
			videos,
			columns = defaultColumnsNumber( attributes ),
		} = attributes;

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

		return (
			<Fragment>
				{ controls }
				<InspectorControls>
					<PanelBody title="Jumbotron Settings">
						{ videos.length > 1 && (
							<RangeControl
								label="Columns"
								value={ columns }
								onChange={ this.setColumnsNumber }
								min={ 1 }
								max={ Math.min( MAX_COLUMNS, videos.length ) }
								required
							/>
						) }
					</PanelBody>
				</InspectorControls>
				{ noticeUI }
				<ul
					className={ classnames( 'jumbotron-gallery', {
						[ `columns-${ columns }` ]: columns,
					} ) }
				>
					{ videos.map( ( video, index ) => {
						return (
							<li
								className="jumbotron-gallery-item"
								key={ video.id || video.url }
							>
								<GalleryVideo
									url={ video.url }
									id={ video.id }
									isSelected={
										isSelected &&
										this.state.selectedVideo === index
									}
									onRemove={ this.onRemoveVideo( index ) }
									onSelect={ this.onSelectVideo( index ) }
								/>
							</li>
						);
					} ) }
				</ul>
				{ isSelected && mediaPlaceholder }
			</Fragment>
		);
	}
}

export default withNotices( JumbotronEdit );
