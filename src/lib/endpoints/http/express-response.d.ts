import { APIContext, Props, ValidRedirectStatus } from 'astro';
type ExpressResponseCookieDeleteOptions = {
    domain?: string;
    path?: string;
};
type ExpressResponseCookieSetOptions = {
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    sameSite?: boolean | 'lax' | 'none' | 'strict';
    secure?: boolean;
} & ExpressResponseCookieDeleteOptions;
type CacheControlOptions = {
    minuets?: number;
    days?: number;
    months?: number;
};
export default class ExpressResponse extends Headers {
    astroContext: APIContext<Props>;
    private _responseClosed;
    responseBody: string | Buffer | Uint8Array;
    statusCode: number;
    constructor(astroContext: APIContext<Props>);
    cookie(key: string, value: string | Record<string, any>, options?: ExpressResponseCookieSetOptions): this;
    clearCookie(key: string, options?: ExpressResponseCookieDeleteOptions): this;
    type(type: string): this;
    status(status: number): this;
    json(body: any): this;
    html(body: string): this;
    send(body: string | Buffer | Uint8Array | any): this;
    end(body: string | Buffer | Uint8Array | any): this;
    sendStatus(status: number): this;
    redirect(url: string, status?: ValidRedirectStatus): this;
    sendFile(filePath: string): Promise<this>;
    attachment(filePath: string, fileName?: string): Promise<this>;
    cacheControl({ days, months, minuets }: CacheControlOptions): this;
}
export {};
