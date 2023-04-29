import React from 'react';

export default function useEscapeKey(callback: () => void): void {
	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				callback();
			}
		};

		window.addEventListener('keydown', handleEscape);

		return () => window.removeEventListener('keydown', handleEscape);
	}, [callback]);
}
