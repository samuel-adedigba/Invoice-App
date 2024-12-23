export declare function getEnvFileNameForNodeEnv(nodeEnv?: string): string;
export type StringifyEnv<T extends Record<string, string | number | boolean | undefined>> = {
    [K in keyof T]: T[K] extends undefined ? string : `${T[K]}`;
};
//# sourceMappingURL=processEnv.d.ts.map