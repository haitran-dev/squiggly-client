import React from 'react';

type Tick = () => void | null;

function useInterval(callback: Tick, delay: number = 1000, isPause: boolean = false): void {
	const savedCallback = React.useRef<Tick>(callback);

	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	React.useEffect(() => {
		const tick = savedCallback.current;

		const id = setInterval(tick, delay);

		return () => {
			clearInterval(id);
		};
	}, [delay, isPause]);
}

export default useInterval;
