import React from 'react';

type Callback = () => void | null;

const useInterval = (callback: Callback, delay = 1000, isPause = false) => {
	const savedCallback = React.useRef<Callback>(callback);

	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	React.useEffect(() => {
		const tick = savedCallback.current;

		const id = setInterval(tick, delay);

		return () => {
			clearInterval(id);
		};
	}, [isPause, delay]);
};

export default useInterval;
