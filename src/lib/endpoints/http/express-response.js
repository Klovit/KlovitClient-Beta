import mime from 'mime';
import statuses from 'statuses';
import * as fs from 'fs/promises';
import * as path from 'path';
import ExpressError from './http-errors/express-error.js';
export default class ExpressResponse extends Headers {
    constructor(astroContext) {
        super();
        this.astroContext = astroContext;
        this._responseClosed = false;
        this.responseBody = '';
        this.statusCode = 200;
    }
    cookie(key, value, options) {
        this.astroContext.cookies.set(key, value, options);
        return this;
    }
    clearCookie(key, options) {
        this.astroContext.cookies.delete(key, options);
        return this;
    }
    type(type) {
        type = mime.getType(type) || type;
        this.set('Content-Type', `${type}; charset=utf-8`);
        return this;
    }
    status(status) {
        this.statusCode = status;
        return this;
    }
    json(body) {
        this.responseBody = JSON.stringify(body);
        this.type('json');
        return this;
    }
    html(body) {
        this.responseBody = body;
        this.type('html');
        return this;
    }
    send(body) {
        if (this._responseClosed) {
            throw new ExpressError('Response already closed');
        }
        if (body instanceof Buffer || body instanceof Uint8Array) {
            this.responseBody = body;
        }
        else if (typeof body === 'object' && body !== undefined) {
            return this.json(body);
        }
        this.responseBody = body;
        return this;
    }
    end(body) {
        this.send(body);
        this._responseClosed = true;
        return this;
    }
    sendStatus(status) {
        this.status(status);
        this.responseBody = statuses(status) || status.toString();
        return this;
    }
    redirect(url, status = 302) {
        this.set('Location', url);
        this.status(status);
        return this;
    }
    async sendFile(filePath) {
        const content = await fs.readFile(filePath);
        this.responseBody = content;
        this.type(filePath);
        return this;
    }
    async attachment(filePath, fileName = path.parse(filePath).name) {
        await this.sendFile(filePath);
        this.set('Content-Disposition', `attachment; filename="${fileName}"`);
        return this;
    }
    cacheControl({ days = 0, months = 0, minuets = 0 }) {
        const totalSeconds = days * 24 * 60 * 60 + months * 30 * 24 * 60 * 60 + minuets * 60;
        this.set('Cache-Control', `max-age=${totalSeconds}`);
        return this;
    }
    _createResponseNativeObject() {
        return new Response(this.responseBody, {
            headers: this,
            status: this.statusCode
        });
    }
}
