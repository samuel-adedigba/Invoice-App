export type IFlagKey = `IS_${Uppercase<string>}_ENABLED` | `IS_${Uppercase<string>}_DISABLED`;
export declare function testFlagEnumValidity<TEnum extends IFlags, IFlags = Record<IFlagKey, IFlagKey>>(_: TEnum & Record<Exclude<keyof TEnum, keyof IFlags>, ['Key must follow `IFlagKey` format']>): void;
//# sourceMappingURL=flags.types.d.ts.map