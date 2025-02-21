import axios from 'axios'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import { checkIfInstanceOf } from "./utils/index.js"
interface UploadConfig {
    folderName?: string
    fileName?: string
    url?: string
    useDate?: 'yes' | 'no'
    ext?: string
}
interface UploadResult {
    message: string
    error?: any
    filePath: string | null
    code: number
}
interface GetFilePathConfig {
    url?: string
    extNameConfig?: 'all' | 'no' | Array<string>
}
interface GetFilePathResult {
    message: string
    files: Array<string>
    code: number
    err?: any
}
const uploadResource = async (file: File | Blob | Buffer | fs.ReadStream, config: UploadConfig = {}): Promise<UploadResult> => {
    if (!file) {
        return {
            message: 'file is required',
            error: 'file is required',
            filePath: null,
            code: 400
        }
    }
    const {
        folderName = 'default',
        fileName = 'default_name',
        url = 'http://localhost:3100',
        useDate = 'yes',
        ext = 'jpg'
    } = config
    const wholeUrl = path.join(url, '/upload')
    const formData = new FormData()
    if (checkIfInstanceOf(file, Buffer) || checkIfInstanceOf(file, fs.ReadStream) || checkIfInstanceOf(file, Blob) || checkIfInstanceOf(file, File)) {
        formData.append('file', file)
    } else {
        return {
            message: 'file type is not supported',
            error: 'file type is not supported',
            filePath: null,
            code: 400
        }
    }
    formData.append('folderName', folderName)
    formData.append('fileName', fileName)
    formData.append('useDate', useDate)
    formData.append('ext', ext)
    try {
        const response = await axios.post(wholeUrl, formData, {
            headers: formData.getHeaders(),
        })
        return response.data
    } catch (err) {
        return {
            message: 'An error occurred during the request',
            error: err,
            filePath: null,
            code: 400
        }
    }

}
const getFilePath = async (config: GetFilePathConfig = {}): Promise<GetFilePathResult> => {

    const {
        url = 'http://localhost:3100',
        extNameConfig = 'all'
    } = config
    const wholeUrl = path.join(url, '/filePath')
    try {
        const response = await axios.post(wholeUrl, {
            extNameConfig: extNameConfig
        })
        return response.data
    } catch (err) {
        return {
            message: 'An error occurred during the request',
            files: [],
            code: 400,
            err: err,
        }
    }
}
export {
    uploadResource,
    getFilePath
}