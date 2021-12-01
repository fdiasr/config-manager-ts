import { configuration } from '../src';

test('Check Configuration', () => {
    expect(configuration).toEqual({"test": "configuration"});
});
