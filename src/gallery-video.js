/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Disabled, IconButton } from '@wordpress/components';

class GalleryVideo extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
	}

	onSelectImage() {
		if ( ! this.props.isSelected ) {
			this.props.onSelect();
		}
	}

	render() {
		const { url, id, isSelected, onRemove } = this.props;

		const className = classnames( {
			'is-selected': isSelected,
		} );

		return (
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
			<figure className={ className } onClick={ this.onSelectImage }>
				{ isSelected && (
					<div className="jumbotron-gallery-item__inline-menu">
						<IconButton
							icon="no-alt"
							onClick={ onRemove }
							className="jumbotron-gallery-item__remove"
							label="Remove Video"
						/>
					</div>
				) }
				<Disabled>
					<video controls={ true } src={ url } data-id={ id } />
				</Disabled>
			</figure>
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
		);
	}
}

export default GalleryVideo;
