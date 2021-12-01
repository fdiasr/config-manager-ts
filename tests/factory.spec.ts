import { writeFileSync, unlinkSync } from 'fs';
import { factory, Configuration, DEFAULT_JSON_FILENAME } from '../src';


const DEFAULT_CONFIG_FILENAME = `../${DEFAULT_JSON_FILENAME}`;
const CUSTOM_CONFIG_FILENAME = '../custom_config.json';

const ENV_CONFIG_DATA = '{ "firstKey": "first env value", "secondKey": { "innerKey": "inner env value", "anotherKey": { "anotherInnerKey": "another env value" } } }';

const DEFAULT_CONFIG_DATA:object = {
    "firstKey": "first key value",
    "secondKey": {
        "innerKey": "inner key value",
        "anotherKey": {
            "anotherInnerKey": "another key value"
        }
    }
};

const createConfigFile = (filename: string, data: object) => writeFileSync(filename, JSON.stringify(data));

describe('Configuration Factory', () => {

    beforeEach(() => {
        delete process.env.TS_CONFIG_MANAGER_LIST_TYPE;
        delete process.env.TS_CONFIG_MANAGER_LIST_FILE;
        delete process.env.TS_CONFIG_MANAGER_LIST_DATA;
    });

    afterEach(() => {
    })

    test('creates Configuration successfully', () => {
        expect(factory()).toBeInstanceOf(Configuration);
    });

    test('creates Configuration using default JSON file', () => {
        process.env.TS_CONFIG_MANAGER_LIST_TYPE = 'json';

        createConfigFile(DEFAULT_CONFIG_FILENAME, DEFAULT_CONFIG_DATA);

        expect(factory()).toBeInstanceOf(Configuration);
        unlinkSync(DEFAULT_CONFIG_FILENAME);
    });

    test('creates Configuration using custom JSON file', () => {
        process.env.TS_CONFIG_MANAGER_LIST_TYPE = 'json';
        process.env.TS_CONFIG_MANAGER_LIST_FILE = CUSTOM_CONFIG_FILENAME;
        createConfigFile(CUSTOM_CONFIG_FILENAME, DEFAULT_CONFIG_DATA);

        const configuration = factory();

        expect(configuration.all()).toEqual(DEFAULT_CONFIG_DATA);
        unlinkSync(CUSTOM_CONFIG_FILENAME);
    });

    test('creates Configuration using ENVIRONMENT data', () => {
        process.env.TS_CONFIG_MANAGER_LIST_TYPE = 'env';
        process.env.TS_CONFIG_MANAGER_LIST_DATA = ENV_CONFIG_DATA;

        const configuration = factory();

        expect(configuration.all()).toEqual(JSON.parse(ENV_CONFIG_DATA));
    });

    test.skip('creates Configuration using AWS SSM Parameter Store', () => {
        expect(factory()).toBeInstanceOf(Configuration);
    });

    test.skip('creates Configuration using YAML file', () => {
        expect(factory()).toBeInstanceOf(Configuration);
    });
})
