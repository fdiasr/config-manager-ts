class Configuration {
    private list: ConfigList;

    constructor(configList: ConfigList) {
        this.load(configList);
    }

    load(configList: ConfigList) {
        // @TODO if configList is empty, log
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

export default Configuration;
