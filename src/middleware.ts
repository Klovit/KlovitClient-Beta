import { doubleCsrf } from "csrf-csrf";
import db from "@/database";
const config = await db.get("config")

const {
    doubleCsrfProtection,
    generateToken
} = doubleCsrf({
    getSecret: () => config.website.secret,
    cookieName: '__Host-psifi.x-csrf-token',
    cookieOptions: {
        secure: true
    }
});
export default doubleCsrfProtection;
export async function onRequest ({ locals, request }, next) {
    locals.csrfToken = generateToken;
    doubleCsrfProtection;
    next()
}