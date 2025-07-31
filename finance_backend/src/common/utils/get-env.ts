export const getEnv = (key: string, defaultValue:string= ""): string => {
    const value = process.env[key];
    if (value === undefined) {
        if(defaultValue && defaultValue !== "") {
            console.warn(`Environment variable ${key} is not set. Using default value: ${defaultValue}`);
            return defaultValue;
        }
        throw new Error(`Environment variable ${key} is not set and no default value provided.`);
    }
    return value;
};