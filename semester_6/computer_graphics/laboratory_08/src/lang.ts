export function present<T>(value: T | null): T {
    if (value == null) {
        throw new Error('Value is null!');
    }

    return value;
}