/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	Disabled,
	DropZone,
	FormFileUpload,
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
import { mediaUpload } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import icon from './icon';
import { defaultColumnsNumber, pickRelevantMediaFiles } from './util';

const MAX_COLUMNS = 4;
const ALLOWED_MEDIA_TYPES = [ 'video' ];

class JumbotronEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectVideos = this.onSelectVideos.bind( this );
		this.setColumnsNumber = this.setColumnsNumber.bind( this );
		this.addFiles = this.addFiles.bind( this );
		this.uploadFromFiles = this.uploadFromFiles.bind( this );
	}

	onSelectVideos( videos ) {
		this.props.setAttributes( {
			videos: videos.map( ( video ) => pickRelevantMediaFiles( video ) ),
		} );
	}

	setColumnsNumber( value ) {
		this.props.setAttributes( { columns: value } );
	}

	uploadFromFiles() {
		this.addFiles( event.target.files );
	}

	addFiles( files ) {
		const currentVideos = this.props.attributes.videos || [];
		const { setAttributes, noticeOperations } = this.props;

		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( videos ) => {
				const videosNormalized = videos.map( ( video ) =>
					pickRelevantMediaFiles( video )
				);
				setAttributes( {
					videos: currentVideos.concat( videosNormalized ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
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
		const {
			videos,
			columns = defaultColumnsNumber( attributes ),
		} = attributes;

		const dropZone = <DropZone onFilesDrop={ this.addFiles } />;

		const controls = (
			<BlockControls>
				{ !! videos.length && (
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

		if ( videos.length === 0 ) {
			return (
				<Fragment>
					<MediaPlaceholder
						icon={ <BlockIcon icon={ icon } /> }
						className={ className }
						labels={ {
							title: 'Jumbotron',
							instructions:
								'Drag videos, upload new ones or select files from your library.',
						} }
						onSelect={ this.onSelectVideos }
						accept="video/*"
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						multiple
						notices={ noticeUI }
						onError={ noticeOperations.createErrorNotice }
					/>
				</Fragment>
			);
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
					{ dropZone }
					{ videos.map( ( video ) => {
						return (
							<li
								className="jumbotron-gallery-item"
								key={ video.id || video.url }
							>
								<figure>
									<Disabled>
										<video
											controls={ true }
											src={ video.url }
											data-id={ video.id }
										/>
									</Disabled>
								</figure>
							</li>
						);
					} ) }
					{ isSelected && (
						<li className="jumbotron-gallery-item has-add-item-button">
							<FormFileUpload
								multiple
								isLarge
								className="jumbotron-add-item-button"
								onChange={ this.uploadFromFiles }
								accept="video/*"
								icon="insert"
							>
								Upload an video
							</FormFileUpload>
						</li>
					) }
				</ul>
			</Fragment>
		);
	}
}

export default withNotices( JumbotronEdit );
