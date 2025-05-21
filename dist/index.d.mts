/**
 * Translates JS/TS error to a beginner-friendly explanation.
 * @param error Error object or string
 * @returns Friendly explanation
 */
declare function translateError(error: string | Error): Promise<string>;

export { translateError };
