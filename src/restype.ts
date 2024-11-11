import db from './database';
const config = await db.get("config")

let restype;

if (config?.resource_type === 'MB' || config?.resource_type === 'GB') {
    restype = `${config.resource_type}(s)`
}


export default {restype};
