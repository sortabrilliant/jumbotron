( function() {
	const jumbotrons = document.querySelectorAll(
		'.wp-block-sortabrilliant-jumbotron'
	);

	function renderPlayer( jumbotron, video ) {
		const currentPlayer = jumbotron.querySelector( '.jumbotron-player' );

		const markup = `
			<figure class="jumbotron-player">
				<video controls="true" src=${ video.src }></video>
				<figcaption>${ video.desc }</figcaption>
			</figure>
		`;

		// Replace current player
		if ( currentPlayer ) {
			currentPlayer.outerHTML = markup;
			return;
		}

		jumbotron.insertAdjacentHTML( 'afterbegin', markup );
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
			};

			renderPlayer( jumbotron, video );
		} );
	}

	if ( jumbotrons.length ) {
		jumbotrons.forEach( bindEvents );
	}
} )();
