import ExpressRequest from './http/express-request.js';
import { validateRequest } from 'zod-express-middleware';
export default class ExpressRoute {
    constructor() {
        this._middleware = [];
        this._lastValidation = [];
        this._bodyOptions = { type: 'auto', default: true };
    }
    use(middleware) {
        if (middleware instanceof ExpressRoute) {
            this._middleware = this._middleware.concat(middleware._middleware);
            if (!middleware._bodyOptions.default) {
                this._bodyOptions = middleware._bodyOptions;
            }
            return this;
        }
        this._middleware.push(middleware);
        return this;
    }
    body(type) {
        this._bodyOptions = { type };
        return this;
    }
    validate(schemas) {
        this._lastValidation.push(validateRequest(schemas));
        return this;
    }
    route(...middlewares) {
        const bodyOptions = this._bodyOptions;
        const validation = this._lastValidation.pop();
        if (validation) {
            middlewares.unshift(validation);
        }
        return async (context) => {
            try {
                const request = new ExpressRequest(context, bodyOptions);
                await request._parse();
                await this._runMiddleware(request, middlewares);
                request.emit('close');
                request.emit('finish');
                return request._response._createResponseNativeObject();
            }
            catch (error) {
                return new Response(error.message, { status: error.status ?? 500 });
            }
        };
    }
    async _runMiddleware(req, extraMiddleware = []) {
        for (const middleware of this._middleware.concat(extraMiddleware)) {
            let runNext = false;
            let okToRunNext = () => runNext = true;
            await middleware(req, req._response, okToRunNext);
            if (!runNext) {
                break;
            }
        }
    }
}
