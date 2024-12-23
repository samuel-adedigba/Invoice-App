import { HandlebarHelpersEnum } from './handlebarHelpers';
import { TemplateVariableTypeEnum } from '../../types';
export function getTemplateVariables(bod) {
    const pairVariables = bod
        .filter((body) => body.type === 'HashPair')
        .flatMap((body) => {
        var _a, _b;
        const varName = (_a = body.value) === null || _a === void 0 ? void 0 : _a.original;
        if (!shouldAddVariable(varName)) {
            return [];
        }
        return {
            type: TemplateVariableTypeEnum.STRING,
            name: (_b = body.value) === null || _b === void 0 ? void 0 : _b.original,
            defaultValue: '',
            required: false,
        };
    });
    const stringVariables = bod
        .filter((body) => body.type === 'MustacheStatement')
        .flatMap((body) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const varName = ((_a = body.params[0]) === null || _a === void 0 ? void 0 : _a.original) || body.path.original;
        if (((_b = body.path) === null || _b === void 0 ? void 0 : _b.original) === HandlebarHelpersEnum.I18N) {
            if ((_c = body.hash) === null || _c === void 0 ? void 0 : _c.pairs) {
                return getTemplateVariables(body.hash.pairs);
            }
            return [];
        }
        if (!shouldAddVariable(varName)) {
            return [];
        }
        if ((_e = (_d = body.params) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.original) {
            if (!Object.values(HandlebarHelpersEnum).includes(body.path.original)) {
                return [];
            }
        }
        return {
            type: TemplateVariableTypeEnum.STRING,
            name: ((_g = (_f = body.params) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.original) || ((_h = body.path) === null || _h === void 0 ? void 0 : _h.original),
            defaultValue: '',
            required: false,
        };
    });
    const arrayVariables = bod
        .filter((body) => body.type === 'BlockStatement' && ['each', 'with'].includes(body.path.original))
        .flatMap((body) => {
        var _a;
        const varName = ((_a = body.params[0]) === null || _a === void 0 ? void 0 : _a.original) || body.path.original;
        if (!shouldAddVariable(varName)) {
            return [];
        }
        const nestedVariablesInBlock = getTemplateVariables(body.program.body).map((mustVar) => {
            return Object.assign(Object.assign({}, mustVar), { name: `${varName}.${mustVar.name}` });
        });
        if (['with'].includes(body.path.original)) {
            return [...nestedVariablesInBlock];
        }
        return [
            {
                type: TemplateVariableTypeEnum.ARRAY,
                name: varName,
                required: false,
            },
            ...nestedVariablesInBlock,
        ];
    });
    const boolVariables = bod
        .filter((body) => body.type === 'BlockStatement' && ['if', 'unless'].includes(body.path.original))
        .flatMap((body) => {
        var _a;
        const varName = ((_a = body.params[0]) === null || _a === void 0 ? void 0 : _a.original) || body.path.original;
        if (!shouldAddVariable(varName)) {
            return [];
        }
        if (body.params.length > 1) {
            return [];
        }
        const nestedVariablesInBlock = getTemplateVariables(body.program.body);
        return [
            {
                type: TemplateVariableTypeEnum.BOOLEAN,
                name: varName,
                defaultValue: true,
                required: false,
            },
            ...nestedVariablesInBlock,
        ];
    });
    return stringVariables.concat(arrayVariables).concat(boolVariables).concat(pairVariables);
}
const shouldAddVariable = (variableName) => {
    const validRegExp = /^[a-zA-Z_][a-zA-Z0-9_-]*?/;
    const isValid = variableName.match(validRegExp);
    return isValid;
};
