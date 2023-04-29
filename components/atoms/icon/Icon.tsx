import React from 'react';

type IconProps = {
	id: string;
	color?: string;
	size?: number;
} & typeof defaultProps;

const defaultProps = {
	color: '#000',
	size: 24,
};

export default function Icon({ id, color, size, ...delegated }: IconProps) {
	return (
		<svg width={size} height={size} {...delegated}>
			<use fill={color} width={size} height={size} href={`/svgs/sprite.svg#${id}`} />
		</svg>
	);
}
