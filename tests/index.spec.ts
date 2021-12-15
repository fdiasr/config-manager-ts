import { Configuration } from '../src';

const configList = {
    firstKey: 'first key value',
    secondKey: {
        innerKey: 'inner key value',
        anotherKey: {
            anotherInnerKey: 'another key value'
        }
    }
}

let config: Configuration = null;

describe('Configurations', () => {
    beforeAll(() => {
        config = new Configuration(configList);
    })

    test('retrieve all parameters', () => {
        expect(config.all()).toEqual(configList);
    });

    test('retrieve first parameter', () => {
        expect(config.get('firstKey')).toEqual(configList.firstKey);
    });

    test('retrieve second parameter', () => {
        expect(config.get('secondKey')).toEqual(configList.secondKey);
    });

    test.skip('retrieve inner parameter', () => {
        expect(config.get('secondKey.innerKey')).toEqual(configList.secondKey.innerKey);
    });

    test.skip('retrieve another parameter', () => {
        expect(config.get('secondKey.anotherKey.anotherInnerKey')).toEqual(configList.secondKey.anotherKey.anotherInnerKey);
    });

    test('fails to retrieve undefined parameter', () => {
        const getUndefinedKey = () => config.get('undefinedKey');
        expect(getUndefinedKey).toThrow;
    });
})
