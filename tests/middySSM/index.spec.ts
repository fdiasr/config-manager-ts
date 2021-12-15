import { factory } from '../../src';

const mockApplicationConfig = {
    'firstKey': 'first key value',
    'secondKey': {
        'innerKey': 'inner key value',
        'anotherKey': {
            'anotherInnerKey': 'another key value'
        }
    }
};

const mockChannelsConfig = {
    channelA: { 'channel-a-key': 'value channel a' },
    channelB: { 'channel-b-key': 'value channel b' }
};

const mockedMiddlewareSSM = () => {
    return {
        before: (request) => {
            request.internal = {
                app: mockApplicationConfig,
                channels: mockChannelsConfig
            };
        },
    };
};

jest.mock('@middy/ssm', () => ({
    default: () => mockedMiddlewareSSM()
}));

import { configurationMiddleware } from '../../src/middySSM';

describe('Custom Middy SSM Middleware', () => {

    beforeEach(() => {
    });

    afterEach(() => {
    })

    test('loads Configuration successfully', async () => {
        const configuration = factory();
        const ssmList = { app: '/ssm/app', channels: '/ssm/channels' };
        const cacheExpiry = 3000;
        const request = {};

        const middleware = await configurationMiddleware(configuration, ssmList, cacheExpiry);
        await middleware.before(request);

        const expectedConfig = {
            app: mockApplicationConfig,
            channels: mockChannelsConfig
        }

        expect(configuration.all()).toEqual(expectedConfig);
    });
});
