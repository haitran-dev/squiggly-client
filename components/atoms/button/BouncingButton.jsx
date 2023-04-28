import React from 'react';
import styled from 'styled-components';
import { buttonConstants } from '.';
import PropTypes from 'prop-types';
import { Howl } from 'howler';

// Sound
const soundDown = new Howl({
	src: ['/sounds/mouse-down.wav'],
	volume: 0.3,
});

const soundUp = new Howl({
	src: ['/sounds/mouse-up.wav'],
	volume: 0.3,
});

// Styles
const Left = styled.div`
	content: '';
	display: block;
	position: absolute;
	height: 100%;
	filter: brightness(1.3);
	transform: skewY(-60deg);
`;

const Bottom = styled.div`
	content: '';
	display: block;
	position: absolute;
	width: 100%;
	filter: brightness(0.72);
	transform: skewX(-30deg);
	border-top: none;
`;

const Front = styled.div`
	position: relative;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-left: none;
`;

const Shadow = styled.div`
	position: absolute;
	left: -0.5em;
	top: 1.4em;
	height: 100%;
	z-index: -1;
	width: calc(0.5em + 100% + 0.5em);
	background-color: var(--shadow-color);
`;

const Button = styled.div`
	/* Variables */
	--current-background-color: ${(props) => getVariantColor(props.variant)};
	--bottom-height: 0.8125em;

	/* Properties */
	display: inline-block;
	position: relative;
	height: min-content;
	cursor: pointer;
	z-index: 0;

	/* Disable selection */
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&:active {
		> ${Front} {
			right: 0.25rem;
			top: 0.46875rem;
		}

		> ${Left} {
			width: 0.25rem;
			top: 0.65625rem;
		}

		> ${Bottom} {
			height: 0.375rem;
			left: -0.375rem;
		}

		> ${Shadow} {
			top: 1.1rem;
			width: calc(100% + 0.6rem);
			clip-path: polygon(
				0 0,
				calc(100% - 0.5rem) 0,
				calc(100% - 0.25rem) calc(10% - 0.1rem),
				100% 100%,
				0.5875rem 100%,
				0 calc(100% - 0.2875rem)
			);
		}
	}

	> ${Front} {
		${(props) => getSize(props.size)};
		background-color: var(--current-background-color);
	}

	> ${Left} {
		height: calc(100% - 0.03125em);
		left: -0.5em;
		top: 0.40625em;
		width: 0.5em;
		background-color: var(--current-background-color);
	}

	> ${Bottom} {
		left: -0.25em;
		bottom: -0.8125em;
		width: calc(100% + 0.03125em);
		height: var(--bottom-height);
		background-color: var(--current-background-color);
	}

	> ${Shadow} {
		clip-path: polygon(
			0 0,
			calc(100% - 0.5rem) 0,
			calc(100% - 0.25rem) calc(10% - 0.1rem),
			100% 100%,
			0.5875rem 100%,
			0 calc(100% - 0.5875rem)
		);
	}
`;

const getVariantColor = (variant = buttonConstants.variants.DEFAULT) => {
	const options = {
		[buttonConstants.variants.DEFAULT]: '#c3c3c3',
		[buttonConstants.variants.PRIMARY]: '#fed138',
		[buttonConstants.variants.ABOUT]: '#ee7aa9',
		[buttonConstants.variants.TWITTER]: '#5ca8dc',
		[buttonConstants.variants.FACEBOOK]: '#3565a5',
	};

	return options[variant] || options[buttonConstants.variants.DEFAULT];
};

const getSize = (size = buttonConstants.sizes.DEFAULT) => {
	const options = {
		[buttonConstants.sizes.DEFAULT]: 'height: 2rem; padding: 0 0.5rem',
		[buttonConstants.sizes.LG]: 'height: 3rem; font-size: 1.5rem; padding: 0 3rem',
	};

	return options[size] || options[buttonConstants.sizes.DEFAULT];
};

export default function BouncingButton({ variant, children, ...delegated }) {
	const playSoundDown = () => {
		soundDown.play();
	};

	const playSoundUp = () => {
		soundUp.play();
	};

	return (
		<Button
			onMouseDown={playSoundDown}
			onMouseUp={playSoundUp}
			variant={variant}
			{...delegated}
		>
			<Left />
			<Front>{children}</Front>
			<Bottom />
			<Shadow />
		</Button>
	);
}

BouncingButton.propTypes = {
	children: PropTypes.any.isRequired,
	variant: PropTypes.string,
};
