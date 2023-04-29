import React from 'react';

type ReturnType = [boolean, () => void];

function useToggle(initialValue: boolean = false): ReturnType {
	const [value, setValue] = React.useState<boolean>(initialValue);

	const toggleValue = React.useCallback(() => {
		setValue((currentValue) => !currentValue);
	}, []);

	return [value, toggleValue];
}

export default useToggle;
