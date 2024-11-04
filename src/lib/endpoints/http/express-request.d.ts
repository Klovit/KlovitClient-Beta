import { APIContext, Props } from 'astro';
import { EventEmitter } from 'events';
import type { ExpressRouteBodyType } from '../express-route.js';
import { ExpressRouteBodyOptions } from '../express-route.js';
interface ExpressRequestEventEmitterTypes {
    on(event: 'close', listener: (error?: Error) => void): this;
    emit(event: 'close', error?: Error): boolean;
}
type StringMap = {
    [key: string]: string;
};
export default class ExpressRequest extends EventEmitter implements ExpressRequestEventEmitterTypes {
    astroContext: APIContext<Props>;
    private _bodyOptions;
    private _accepts;
    query: StringMap;
    cookies: StringMap;
    session: StringMap;
    body: any;
    headers: StringMap;
    params: StringMap;
    filesOne: {
        [key: string]: File;
    };
    filesMany: {
        [key: string]: File[];
    };
    method: string;
    url: string;
    path: string;
    subdomains: string[];
    hostname: string;
    ip: string;
    locals: APIContext['locals'];
    error?: Error;
    constructor(astroContext: APIContext<Props>, _bodyOptions: ExpressRouteBodyOptions);
    parseBody(type: ExpressRouteBodyType): Promise<any>;
    private _parseBodyMultiPart;
    get(headerName: string): string | undefined;
    is(type: string): boolean;
    accepts(types: string | string[], ...args: string[]): string | false | string[];
    acceptsCharsets(types: string | string[], ...args: string[]): string | boolean | string[];
    acceptsEncodings(types: string | string[], ...args: string[]): string | boolean | string[];
    acceptsLanguages(types: string | string[], ...args: string[]): string | boolean | string[];
    param(name: string, defaultValue?: any): any;
    header(name: string, defaultValue?: any): any;
}
export {};
