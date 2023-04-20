import React from 'react';

export default function useEscapeKey(callback) {
	React.useEffect(() => {
		const handleEscape = (e) => {
			if (e.code === 'Escape') {
				callback();
			}
		};

		window.addEventListener('keydown', handleEscape);

		return () => window.removeEventListener('keydown', handleEscape);
	}, [callback]);
}
