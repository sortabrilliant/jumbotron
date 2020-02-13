<?php
/**
 * Plugin Name: Jumbotron
 * Plugin URI:  https://sortabrilliant.com/jumbotron/
 * Description:
 * Author:      sorta brilliant
 * Author URI:  https://sortabrilliant.com/
 * Version:     1.0.0
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
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
		'style'           => 'jumbotron-style'
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );
