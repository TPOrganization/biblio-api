import { Readable } from 'stream'

export class StorageFile {
    buffer: Buffer
    metadata: Map<string, string>
    contentType: string
}

export interface ExpressMulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
