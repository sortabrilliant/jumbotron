( function() {
	const jumbotrons = document.querySelectorAll(
		'.wp-block-sortabrilliant-jumbotron'
	);

	function renderPlayer( jumbotron, video ) {
		const player = jumbotron.querySelector( '.jumbotron-player' );
		const markup = `
			<figure class="jumbotron-player">
				<video
					controls="true"
					src=${ video.src }
					${ video.poster && `poster=${ video.poster }` }
				></video>
				<figcaption>${ video.desc }</figcaption>
			</figure>
		`;

		// Replace the current player.
		player.outerHTML = markup;
	}

	function bindEvents( jumbotron ) {
		const videos = jumbotron.querySelectorAll(
			'.jumbotron-gallery-item__link'
		);

		jumbotron.addEventListener( 'click', function( event ) {
			event.preventDefault();

			if ( ! Array.from( videos ).includes( event.target ) ) {
				return;
			}

			const video = {
				src: event.target.href,
				id: event.target.getAttribute( 'data-id' ),
				desc: event.target.getAttribute( 'data-desc' ),
				poster: event.target.getAttribute( 'data-poster' ),
			};

			renderPlayer( jumbotron, video );
		} );
	}

	if ( jumbotrons.length ) {
		jumbotrons.forEach( bindEvents );
	}
} )();
