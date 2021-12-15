import * as path from 'path';

import Configuration from './Configuration';

const DEFAULT_JSON_FILENAME = '../config_manager_ts.json';

const factory = (configList: ConfigList = {}) => {
    // @TODO add log wrapper

    const listType: string = process.env.TS_CONFIG_MANAGER_LIST_TYPE || 'env';

    if (listType === 'env') {
        const data = process.env.TS_CONFIG_MANAGER_LIST_DATA || '{}';
        configList = JSON.parse(data);
    }

    if (listType === 'json') {
        let filename = process.env.TS_CONFIG_MANAGER_LIST_FILE || DEFAULT_JSON_FILENAME;

        // @TODO verify if works when module is installed into a project
        const fullpath = path.resolve(process.cwd(), filename);
        configList = require(fullpath);
    }

    return new Configuration(configList);
};


export { Configuration, factory, DEFAULT_JSON_FILENAME };
