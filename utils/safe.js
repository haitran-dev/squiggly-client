export const safeInvoke = (func) => {
    if (typeof func !== 'function') return;

    func();
};
