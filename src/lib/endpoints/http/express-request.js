import ExpressResponse from './express-response.js';
import { parse as cookieParse } from 'cookie';
import mime from 'mime';
import ExpressBodyError from './http-errors/express-body-error.js';
import { EventEmitter } from 'events';
import { Accepts } from '@tinyhttp/accepts';
const BODY_REQUEST_TYPES_MAP = {
    json: 'application/json',
    multipart: 'multipart/form-data',
    urlencoded: 'application/x-www-form-urlencoded',
    text: 'text/plain'
};
const BODY_METHODS = ['POST', 'PUT', 'PATCH'];
export default class ExpressRequest extends EventEmitter {
    constructor(astroContext, _bodyOptions) {
        super();
        this.astroContext = astroContext;
        this._bodyOptions = _bodyOptions;
        this.query = {};
        this.cookies = {};
        this.session = {};
        this.body = {};
        this.headers = {};
        this.params = {};
        this.filesOne = {};
        this.filesMany = {};
        this.method = '';
        this.url = '';
        this.path = '';
        this.subdomains = [];
        this.hostname = '';
        this.ip = '';
        this.locals = {};
        this._response = new ExpressResponse(astroContext);
    }
    async _parse() {
        this.query = Object.fromEntries(this.astroContext.url.searchParams.entries());
        this.headers = Object.fromEntries([...this.astroContext.request.headers].map(([key, value]) => [key.toLowerCase(), value]));
        this.method = this.astroContext.request.method;
        this.url = this.astroContext.url.href;
        this.path = this.astroContext.url.pathname;
        this.cookies = cookieParse(this.headers.cookie ?? '');
        this.locals = this.astroContext.locals;
        this.session = this.astroContext.locals.session;
        this.params = this.astroContext.params;
        this.subdomains = this.astroContext.url.hostname.split('.').slice(0, -2);
        this.hostname = this.astroContext.url.hostname;
        this.ip = this.astroContext.clientAddress;
        this._accepts = new Accepts(this);
        if (this._bodyOptions.type && BODY_METHODS.includes(this.method)) {
            await this.parseBody(this._bodyOptions.type);
        }
    }
    async parseBody(type) {
        if (!BODY_METHODS.includes(this.method)) {
            throw new ExpressBodyError(`Body parsing only available for ${BODY_METHODS.join(', ')}`, 500);
        }
        if (this.astroContext.request.bodyUsed) {
            throw new ExpressBodyError('Request body already used', 500);
        }
        if (type === 'auto') {
            const contentType = this.get('content-type').split(';').shift().trim();
            type = Object.entries(BODY_REQUEST_TYPES_MAP).find(([, value]) => value === contentType)?.[0] ?? contentType;
        }
        switch (type) {
            case 'json':
                this.body = await this.astroContext.request.json();
                break;
            case 'multipart':
                await this._parseBodyMultiPart();
                break;
            case 'urlencoded':
                this.body = await this.astroContext.request.formData();
                break;
            case 'text':
                this.body = await this.astroContext.request.text();
                break;
            default:
                throw new ExpressBodyError(`Unknown body type ${type}`);
        }
        return this.body;
    }
    async _parseBodyMultiPart() {
        var _a;
        try {
            const formData = await this.astroContext.request.formData();
            for (const [key, value] of formData) {
                if (typeof value === 'string') {
                    if (this.body[key]) {
                        if (!Array.isArray(this.body[key])) {
                            this.body[key] = [this.body[key]];
                        }
                        this.body[key].push(value);
                    }
                    else {
                        this.body[key] = value;
                    }
                    continue;
                }
                this.filesOne[key] = value;
                (_a = this.filesMany)[key] ?? (_a[key] = []);
                this.filesMany[key].push(value);
            }
        }
        catch (error) {
            this.error = error;
        }
    }
    get(headerName) {
        return this.headers[headerName.toLowerCase()];
    }
    is(type) {
        type = BODY_REQUEST_TYPES_MAP[type] ?? type;
        const contentType = this.get('content-type').split(';').shift().trim();
        return contentType === mime.getType(type);
    }
    accepts(types, ...args) {
        return this._accepts.types(types, ...args);
    }
    acceptsCharsets(types, ...args) {
        return this._accepts.charsets(types, ...args);
    }
    acceptsEncodings(types, ...args) {
        return this._accepts.encodings(types, ...args);
    }
    acceptsLanguages(types, ...args) {
        return this._accepts.languages(types, ...args);
    }
    param(name, defaultValue) {
        return this.params[name] ?? this.body[name] ?? this.query[name] ?? defaultValue;
    }
    header(name, defaultValue) {
        return this.get(name) ?? defaultValue;
    }
}
