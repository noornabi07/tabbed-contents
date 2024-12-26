<?php
$id = wp_unique_id('tcbTabbedContent-');
extract($attributes);

$active = $tabBorder['active'] ?? [ 'width' => 0, 'color' => '#000', 'style' => 'solid' ];

$mainSl = "#$id";
$tabMenuSl = "$mainSl .tabMenu";

$styles = TCBPlugin::getTypoCSS('', $titleTypo)['googleFontLink'] .
	TCBPlugin::getTypoCSS("$tabMenuSl .tabLabel", $titleTypo)['styles'] . "

	$tabMenuSl {
		padding: " . implode(' ', $tabsPadding) . ";
	}
	$tabMenuSl li{
		". TCBPlugin::getColorsCSS($tabColors) ."
	}

	$tabMenuSl li.active {
		" . 
		TCBPlugin::getColorsCSS($tabActiveColors) .
		TCBPlugin:: getBorderBoxCSS($active)
		. "
	}
	$tabMenuSl li .menuIcon i{
		font-size: " . $icon['size'] . ";
		color: " . $icon['color'] . ";
	}
	$tabMenuSl li.active .menuIcon i{
		color: " . $icon['activeColor'] . ";
	}
	$mainSl .tabContent {" .
	TCBPlugin::getBackgroundCSS($contentBG)
	. "}
";
?>

<div <?php echo get_block_wrapper_attributes(); ?> id='<?php echo esc_attr($id); ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'>

	<style>
		<?php echo esc_html( $styles ); ?>
	</style>

	<div class='tcbTabContent <?php echo esc_attr($options['theme'] ?? 'default'); ?> '>
		<ul class='tabMenu'>
			<?php foreach ($tabs as $index => $tab) {
				extract($tab);

				$iconEl = isset($icon['class']) ? "<span class='menuIcon'><i class='" . $icon["class"] . "'></i></span>" : '';

				$iconStyles = isset($icon['color']) || isset($icon['gradient']) ? TCBPlugin::getIconCSS($icon, false) : '';
			?>
				<li id='menuItem-<?php echo esc_attr($id); ?>'>
					<style>
						<?php echo esc_html("#$id .tabMenu #menuItem-$id .menuIcon i{
							$iconStyles
						}"); ?>
					</style>

					<?php echo wp_kses_post($iconEl); ?>

					<span class='tabLabel'>
						<?php echo wp_kses_post($title); ?>
					</span>
				</li>
			<?php } ?>
		</ul>

		<div class='tabContent'>
			<?php echo wp_kses_post($content); ?>
		</div>
	</div>
</div>