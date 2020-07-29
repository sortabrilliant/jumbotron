<?php
/**
 * Plugin Name:       Jumbotron
 * Plugin URI:        https://sortabrilliant.com/jumbotron/
 * Description:       With Jumbotron it's never been easier to display a gallery of videos.
 * Version:           1.1.3
 * Requires at least: 5.0
 * Requires PHP:      5.6
 * Author:            sorta brilliant
 * Author URI:        https://sortabrilliant.com/
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Jumbotron
 */

namespace SortaBrilliant\Jumbotron;

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$asset_filepath = __DIR__ . '/build/index.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : [
		'dependencies' => [],
		'version'      => false,
	];

	wp_register_script(
		'jumbotron',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_script(
		'jumbotron-theme-script',
		plugins_url( 'build/theme.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'jumbotron-style',
		plugins_url( 'build/style.css', __FILE__ ),
		[],
		$asset_file['version']
	);

	wp_register_style(
		'jumbotron-editor-style',
		plugins_url( 'build/editor.css', __FILE__ ),
		[],
		$asset_file['version']
	);

	register_block_type( 'sortabrilliant/jumbotron', [
		'editor_script'   => 'jumbotron',
		'editor_style'    => 'jumbotron-editor-style',
		'style'           => 'jumbotron-style',
		'render_callback' => __NAMESPACE__ . '\\enqueue_theme_script',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

/**
 * Enqueue conditional front-end scripts.
 *
 * @param array $attributes
 * @param string $content
 * @return string $content
 */
function enqueue_theme_script( $attributes, $content ) {
	wp_enqueue_script( 'jumbotron-theme-script' );

	return $content;
}
