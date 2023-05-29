import axios from 'axios';
import { baseUrlForEndpoint, baseUrlForImageUploadEndpoint, baseUrlForJoinServerDiscordEndpoint } from './Constants';
import Firebase from './Firebase';
import { UploadFileRequestModel } from './Models';

interface RequestModel {
    url: string,
    body: object,
    place: string,
    onTimerEndFunction?: Function,
    successFunction: Function,
    errorFunction: Function,
    exceptionFunction: (e: any) => void
}

// interface UploadFileRequestModel {
//     successFunction: Function,
//     errorFunction: Function,
//     exceptionFunction: (e: any) => void,
//     body: any
//     place: string
// }

class ApiBase {
    axiosInstance
    timerHolder: any = null

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: baseUrlForEndpoint,
            timeout: 90000,
        });
    }

    Post = async (requestProps: RequestModel, optionalHeader?: string) => {
        const headers = {
            'Content-Type': optionalHeader ? optionalHeader : 'application/json',
        }
        requestProps.onTimerEndFunction && this.StartTimer(requestProps.onTimerEndFunction)
        await this.axiosInstance.post(requestProps.url, requestProps.body, { headers: headers })
            .then(r => {
                clearTimeout(this.timerHolder)
                if (r.data.code === 1) {
                    requestProps.successFunction(r.data)
                }
                else {
                    requestProps.errorFunction(r.data)
                }
            }).catch((err) => {
                Firebase.FirestoreErrorLogPusher(requestProps.place,
                    err);
                clearTimeout(this.timerHolder)
                if (err.response !== undefined) {
                    this.CreateParsedErrorObject(err).then(parsedError => {
                        this.LogError(requestProps.place, parsedError)
                    })
                    requestProps.exceptionFunction(err)
                } else {
                    this.LogError(requestProps.place, err)
                    requestProps.errorFunction({
                        code: 0,
                        data: null,
                        message: 'İnternet bağlantı hatası!',
                        message_translate: 'ThereIsNoInternetConnection'
                    })
                }
            })
    }

    Get = async (requestProps: RequestModel) => {
        requestProps.onTimerEndFunction && this.StartTimer(requestProps.onTimerEndFunction)
        await this.axiosInstance.get(requestProps.url, requestProps.body)
            .then(r => {
                clearTimeout(this.timerHolder)
                if (r.data.code === 1) {
                    requestProps.successFunction(r.data)
                }
                else {
                    requestProps.errorFunction(r.data)
                }
            }).catch((err) => {
                Firebase.FirestoreErrorLogPusher(requestProps.place,
                    err);
                if (err.response !== undefined) {
                    this.CreateParsedErrorObject(err).then(parsedError => {
                        this.LogError(requestProps.place, parsedError)
                    })
                    requestProps.exceptionFunction(err)
                } else {
                    this.LogError(requestProps.place, err)
                    requestProps.errorFunction({
                        code: 0,
                        data: null,
                        message: 'İnternet bağlantı hatası!',
                        message_translate: 'ThereIsNoInternetConnection'
                    })
                }
            })
    }

    StartTimer = (onTimerEndFunction: Function) => {
        // this.timerHolder = setTimeout(() => {
        //     onTimerEndFunction()
        //     clearTimeout(this.timerHolder)
        // }, 15000);

    }

    CreateParsedErrorObject = async (err: any) => {
        let parsedError = await JSON.parse(err.response.request.response)

        return {
            message: parsedError.message,
            file: parsedError.file,
            line: parsedError.line
        }
    }

    LogError = async (place: string, error: any) => {
        // DeviceInfo.getManufacturer().then(manufacturer => {
        //     return {
        //         manufacturer,
        //         model: DeviceInfo.getModel(),
        //         isTablet: DeviceInfo.isTablet(),
        //         os: DeviceInfo.getSystemName(),
        //         osVersion: DeviceInfo.getSystemVersion()
        //     }
        // }).then((data) => {
        //     const { manufacturer, model, isTablet, os, osVersion } = data
        //     FirestoreErrorLogPusher(place, {
        //         manufacturer,
        //         model,
        //         isTablet,
        //         os,
        //         osVersion,
        //         place,
        //         error,
        //     });
        //     this.axiosInstance.post('/api/error-logs/add-error', {
        //         manufacturer,
        //         model,
        //         isTablet,
        //         os,
        //         osVersion,
        //         place,
        //         error,
        //     })
        // })

    }

    JoinServerOnDiscordWithNodeJS = async (requestProps: RequestModel) => {
        fetch(baseUrlForJoinServerDiscordEndpoint, {
            method: "POST",
            body: JSON.stringify(requestProps.body),
            headers: { "Content-type": "application/json" }
        })
            .then(response => response.json())
            .then(realResp => {
                if (realResp.code === 1) {
                    requestProps.successFunction(realResp)
                }
                else {
                    requestProps.errorFunction(realResp)
                }
            }).catch((err) => {
                Firebase.FirestoreErrorLogPusher(requestProps.place,
                    err);
                this.LogError(requestProps.place, err.toString())
                requestProps.exceptionFunction(err)
            })
    }
}

export default new ApiBase

