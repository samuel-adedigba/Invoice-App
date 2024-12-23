export type ControlsDto = {
    steps?: StepControl;
};
type StepControl = Record<stepId, Data>;
type stepId = string;
type Data = Record<string, unknown>;
export {};
//# sourceMappingURL=controls.dto.d.ts.map