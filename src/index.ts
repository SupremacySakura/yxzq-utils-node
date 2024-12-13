import axios from 'axios'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import { checkIfInstanceOf } from "./utils/index.js"
interface UploadConfig {
    folderName?: string
    fileName?: string
    url?: string
    useDate?: string
    ext?: string
}
const uploadResource = async (file: File | Blob | Buffer | fs.ReadStream, config: UploadConfig) => {
    if (!file) {
        return
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
        throw new Error('file type not supported')
    }
    formData.append('folderName', folderName)
    formData.append('fileName', fileName)
    formData.append('useDate', useDate)
    formData.append('ext', ext)
    const response = await axios.post(wholeUrl, formData, {
        headers: formData.getHeaders(),
    })
    return response.data
}
export {
    uploadResource,
}