import {Injectable} from "@nestjs/common";
import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, HttpStatusCode} from "axios";
import Logger from "../../../../../helpers/logger/src/module/Logger";
import axiosRetry from "axios-retry";

@Injectable()
export default class AxiosConfig {
    private axiosInstance: AxiosInstance;

    constructor(private readonly logger: Logger) {
        this.axiosInstance = axios.create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                "X-IBM-Client-Id": process.env.X_IBM_CLIENT_ID,
            },
            timeout: Number(process.env.TIMEOUT),
        });
        this.axiosInstance.interceptors.response.use(this.handleSuccess.bind(this), this.handleError.bind(this));
    }

    public getInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public retriesConfiguration(): void {
        axiosRetry(this.axiosInstance, {
            retryDelay: (retryCount: number, error: AxiosError) => axiosRetry.exponentialDelay(retryCount, error, 50),
            retryCondition: (error: AxiosError) => {
                return error.response?.status === HttpStatusCode.InternalServerError || error.code === "ECONNABORTED" || axiosRetry.isNetworkError(error);
            },
        });
    }

    public setRetries(numberOfRetries: number): Record<string, any> {
        return {
            "axios-retry": {
                retries: numberOfRetries,
            },
        };
    }

    private handleSuccess(response: AxiosResponse) {
        if (process.env.ENABLE_LOGS_SUCCESSFUL_REQUESTS === "true") {
            this.logger.info(this.buildDataLogSuccess(response));
            return response;
        }
        const code = response.data?.[Object.keys(response.data)[0]]?.code;
        if (code && !isNaN(Number(code)) && Number(code) >= 300) {
            this.logger.error(this.buildDataLogSuccess(response));
        }
        return response;
    }

    private handleError(error: AxiosError) {
        this.logger.error(this.buildDataLogError(error));
        return Promise.reject(error);
    }

    private buildDataLogSuccess(response: AxiosResponse) {
        return {
            message: "API request information when is successful.",
            ...this.buildDataRequestFromConfig(response.config),
            ...this.buildDataResponse(response),
        };
    }

    private buildDataLogError(error: AxiosError) {
        return {
            message: "API request information when is error.",
            client: {
                name: error.name,
                message: error.message,
                code: error.code,
            },
            ...(error.config ? this.buildDataRequestFromConfig(error.config) : {}),
            ...(error.response ? this.buildDataResponse(error.response) : {}),
        };
    }

    private buildDataRequestFromConfig(config: InternalAxiosRequestConfig) {
        return {
            requestApi: {
                url: config?.baseURL.concat("", config?.url),
                method: config?.method,
                timeout: config?.timeout,
                headers: config.headers,
                body: JSON.parse(config?.data),
                retries: this.buildRetryConfigurationData(config),
            },
        };
    }

    buildRetryConfigurationData(config: InternalAxiosRequestConfig) {
        const axiosRetryConfig = config["axios-retry"];
        if (axiosRetryConfig) {
            return {
                retries: axiosRetryConfig.retries,
                retryCount: axiosRetryConfig.retryCount,
                lastRequestTime: new Date(axiosRetryConfig.lastRequestTime),
            };
        }
        return "There is no retry configuration.";
    }

    private buildDataResponse(response: AxiosResponse) {
        return {
            responseApi: {
                status: response?.status.toString().concat(" ", response?.statusText),
                headers: response?.headers,
                body: response?.data,
            },
        };
    }
}
