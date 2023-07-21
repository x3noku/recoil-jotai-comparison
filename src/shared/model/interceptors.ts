/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import styles from 'ansi-styles';
import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { logger } from 'shared/lib';
import { api } from './api';
import { ApiError, ErrorCodes } from './error';

export interface IExtendedInternalAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
    withToken?: boolean;
    isSent?: boolean;
}

export const loggingRequestInterceptorHandlers = [
    (config: IExtendedInternalAxiosRequestConfig) => {
        logger.api.debug(`Fetching ${config.method} ${config.url}`);

        return config;
    },
] as const;

export const loggingResponseInterceptorHandlers = [
    (response: AxiosResponse) => {
        logger.api.debug(
            `${styles.green.open}Succeed ${response.config.method} ${response.config.url} with ${styles.green.close}`,
            response
        );

        return response;
    },
    async (error?: AxiosError) => {
        logger.api.debug(
            `${styles.red.open}Failed ${error?.config?.method} ${error?.config?.url} with ${styles.red.close}`,
            error
        );

        return await Promise.reject(error);
    },
] as const;

export const transformErrorInterceptorHandler = async (error?: ApiError) => {
    return await Promise.reject(new ApiError(error));
};

let accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIwNzgzZDgwOC01NDIyLTRiMjUtOWRiNC0yZWVhNDRmYjMyMWYiLCJpYXQiOjE2ODkzNDAxMzYsImV4cCI6MTY4OTM0MTAzNn0.U_WU9XD1nh_ju4Yko6Opu7JiULv8Bc_oYvk_vEWR8Ls';

export const accessErrorInterceptorHandler = async (error?: ApiError) => {
    const request = error?.config as IExtendedInternalAxiosRequestConfig;

    if (error?.code === ErrorCodes.Unathorized && error?.config?.url !== '/auth/refresh' && !request?.isSent) {
        request.isSent = true;
        // todo(x3noku): probably this should be wrapped with try-catch
        const { data } = await api<{
            accessToken: string;
        }>({
            method: 'post',
            url: '/auth/refresh',
            withCredentials: true,
        });
        logger.debug(`Token: ${data.accessToken}`);
        accessToken = data.accessToken;

        return await api(request);
    }

    return await Promise.reject(new ApiError(error));
};

export const accessRequestInterceptorHandler = (config: IExtendedInternalAxiosRequestConfig) =>
    ({
        ...config,
        headers: {
            ...config.headers,
            Authorization: config.headers.Authorization ?? config.withToken ? `Bearer ${accessToken}` : undefined,
        },
    } as IExtendedInternalAxiosRequestConfig);
