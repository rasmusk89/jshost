import axios, { AxiosError } from "axios";
import { ApiBaseUrl } from "../configuration";
import { IFetchResponse } from "../types/IFetchResponse";
import { ILoginResponse } from "../types/ILoginResponse";
import { IMessages } from "../types/IMessages";

export abstract class IdentityService {
    protected static axios = axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-type': 'application/json'
        }
    });

    static async Login(apiEndpoint: string, loginData: {email: string, password: string}): Promise<IFetchResponse<ILoginResponse>> {
        let loginDataJson = JSON.stringify(loginData);
        try {
            let response = await this.axios.post<ILoginResponse>(apiEndpoint, loginDataJson);
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
                messages: (error.response?.data as IMessages).messages,                
            }
        }
    }
}