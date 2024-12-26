<?php
$id = wp_unique_id( 'tcbTabContentTab-' );
extract( $attributes );
?>

<div <?php echo get_block_wrapper_attributes(); ?> id='<?php echo esc_attr( $id ); ?>'>
	<?php echo wp_kses_post( $content ); ?>
</div>