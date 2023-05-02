import { Howl } from 'howler';
import React from 'react';
import styled from 'styled-components';
import { buttonConstants } from '.';

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
	transform-origin: center;
	transform: skewY(-60deg);
	backface-visibility: hidden;
`;

const Bottom = styled.div`
	content: '';
	display: block;
	position: absolute;
	width: 100%;
	transform-origin: center;
	transform: skewX(-30deg);
	outline: 1px solid transparent;
	backface-visibility: hidden;
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

const Button = styled.div<{ btnVariant?: string; btnSize?: string }>`
	/* Variables */
	--bottom-height: 0.85em;
	--border-width: 0.15rem;

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
			top: 0.48rem;
		}

		> ${Left} {
			width: 0.25rem;
			top: 0.65rem;
		}

		> ${Bottom} {
			height: 0.4rem;
			left: -0.375rem;
		}
	}

	> ${Front} {
		${(props) => getSize(props.btnSize)};
		background-color: white;
		border: var(--border-width) solid black;
		border-radius: 0.15rem;
	}

	> ${Left} {
		z-index: -1;
		height: calc(100%);
		left: -0.45em;
		top: 0.4em;
		width: 0.5em;
		background-color: white;
		border-right: none;
		border: var(--border-width) solid black;
		border-right: none;
		border-top-width: 0.25rem;
		border-bottom-left-radius: 0.1rem;
		border-top-right-radius: 0.1rem;
		border-top-left-radius: 0.1rem;
		border-bottom: none;
	}

	> ${Bottom} {
		left: -0.25em;
		bottom: -0.79em;
		z-index: -1;
		width: calc(100% - 0.04em);
		height: var(--bottom-height);
		border: var(--border-width) solid black;
		border-top: none;
		background-color: white;
		border-bottom-left-radius: 0.2em;
		border-bottom-right-radius: 0.15em;
	}
`;

const getSize = (size: string = buttonConstants.sizes.DEFAULT) => {
	const options = {
		[buttonConstants.sizes.DEFAULT]: 'height: 2rem; padding: 0 0.5rem',
		[buttonConstants.sizes.LG]: 'height: 3rem; font-size: 1.5rem; padding: 0 3rem',
	};

	return options[size] || options[buttonConstants.sizes.DEFAULT];
};

type BouncingButtonProp = {
	variant?: string;
	size?: string;
	children?: React.ReactNode;
} & Record<string, unknown>;

export default function BouncingButton({
	variant,
	size,
	children,
	...delegated
}: BouncingButtonProp) {
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
			btnVariant={variant}
			btnSize={size}
			{...delegated}
		>
			<Left />
			<Front>{children}</Front>
			<Bottom />
		</Button>
	);
}
