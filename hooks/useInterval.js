import React from 'react';
import { safeInvoke } from 'utils/safe';

const useInterval = (callback, delay = 1000, isPause) => {
	const savedCallback = React.useRef(callback);

	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	React.useEffect(() => {
		const tick = () => safeInvoke(savedCallback.current);

		const id = setInterval(tick, delay);

		return () => {
			clearInterval(id);
		};
	}, [delay, isPause]);
};

export default useInterval;
