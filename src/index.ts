import * as path from 'path';

interface ConfigList extends Object {};

const DEFAULT_JSON_FILENAME = '../config_manager_ts.json';

const factory = () => {
    // @TODO add log wrapper

    const listType: string = process.env.TS_CONFIG_MANAGER_LIST_TYPE || 'env';

    let configList:ConfigList = {};

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

    // @TODO add ssm type code
    // if (listType === 'ssm') {

    // @TODO thorw error if configuration type is not setted

    return new Configuration(configList);
};

class Configuration {
    private list: ConfigList;

    constructor(configList: ConfigList) {
        this.list = configList;
    }

    all() {
        return this.list;
    }

    get(key) {
        if (this.list[key] === undefined) {
            throw new Error('Configuration key not setted.')
        }
        return this.list[key]
    }
}

export { Configuration, factory, DEFAULT_JSON_FILENAME };
