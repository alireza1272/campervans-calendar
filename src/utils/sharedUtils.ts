type AnyFunction = (...args: any[]) => void;

export function debounce<T extends AnyFunction>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>): void {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
