export function isEmpty(variable: any): boolean {
    return typeof variable === "undefined" || variable === null || (typeof variable === "string" && variable.trim() === "");
}

export function listIsEmpty<T>(list: T[] | null | undefined): boolean {
    return !list || list.length === 0;
}

export function isEmptyObject(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}
