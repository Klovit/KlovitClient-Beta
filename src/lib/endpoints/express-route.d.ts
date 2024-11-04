import ExpressRequest from './http/express-request.js';
import ExpressResponse from './http/express-response.js';
import { APIRoute } from 'astro';
import { RequestValidation } from 'zod-express-middleware';
import { RequestHandlerParams } from 'express-serve-static-core';
export type ExpressRouteBodyType = 'json' | 'multipart' | 'urlencoded' | 'text' | 'auto';
export type ExpressRouteCallback = (req: ExpressRequest, res: ExpressResponse, next?: () => any) => any;
export type ExpressRouteBodyOptions = {
    type?: ExpressRouteBodyType;
    default?: boolean;
};
export default class ExpressRoute {
    private _middleware;
    private _lastValidation;
    private _bodyOptions;
    constructor();
    use(middleware: ExpressRouteCallback | RequestHandlerParams | ExpressRoute): this;
    body(type: ExpressRouteBodyType | null): this;
    validate<TParams = any, TQuery = any, TBody = any>(schemas: RequestValidation<TParams, TQuery, TBody>): this;
    route(...middlewares: ExpressRouteCallback[]): APIRoute;
    private _runMiddleware;
}
