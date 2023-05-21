export function present<T>(input: T | null): T {
    if (input == null) {
        throw new Error();
    }

    return input;
}