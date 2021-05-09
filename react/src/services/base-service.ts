import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static GetAxiosConfig(jwt?: string): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;

        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        }
        return config;
    }

    static async GetAll<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity[]>> {
        try {
            let response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.GetAxiosConfig(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }

    static async GetOne<TEntity>(apiEndpoint: string, id: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        const endPointUrl = apiEndpoint + '/' + id;
        try {
            let response = await this.axios.get<TEntity>(endPointUrl, BaseService.GetAxiosConfig(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            }
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }

    static async Delete<TEntity>(apiEndpoint: string, id: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        const endPointUrl = apiEndpoint + '/' + id;
        try {
            let response = await this.axios.delete(endPointUrl, BaseService.GetAxiosConfig(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            }
        } catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }

    static async Create<TEntity>(apiEndpoint: string, entity: TEntity, jwt?: string): Promise<IFetchResponse<TEntity>> {
        let entityDataJson = JSON.stringify(entity);
        
        try {
            let response = await this.axios.post(apiEndpoint, entityDataJson);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            }
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }

    static async Put<TEntity>(apiEndpoint: string, id: string, entity: TEntity, jwt?: string): Promise<IFetchResponse<TEntity>> {
        const endPointUrl = apiEndpoint + '/' + id;
        let entityDataJson = JSON.stringify(entity);
        
        try {
            let response = await this.axios.put(endPointUrl, entityDataJson, BaseService.GetAxiosConfig());
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            }
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages
            }
        }
    }
}