import pino, {Logger} from "pino";

export default function buildLogger(): Logger {
    const logLevel = process.env.LOG_LEVEL?.toLowerCase() || "info";
    return pino({
        level: logLevel,
        base: {
            component: process.env.MICROSERVICE_NAME,
        },
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
    });
}
