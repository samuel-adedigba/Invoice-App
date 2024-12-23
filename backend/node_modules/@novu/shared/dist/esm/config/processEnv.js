const DEFAULT_ENV = 'local';
const envFileFromNodeEnv = {
    production: '.env.production',
    test: '.env.test',
    ci: '.env.ci',
    local: '.env',
    dev: '.env.development',
};
export function getEnvFileNameForNodeEnv(nodeEnv) {
    const selectedEnvFile = envFileFromNodeEnv[nodeEnv || DEFAULT_ENV];
    return selectedEnvFile;
}
