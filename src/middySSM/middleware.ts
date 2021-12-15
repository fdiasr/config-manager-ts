import ssm from '@middy/ssm';
import { getInternal } from '@middy/util';
import { prepareOptions, SSMList } from '.';
import { Configuration } from '..';

const configurationMiddleware = async (configuration: Configuration, ssmList: SSMList, cacheExpiry: Number) => {
    const middySSMOptions = prepareOptions(ssmList, cacheExpiry);

    const configurationMiddlewareBefore = async request => {
        await ssm(middySSMOptions).before(request);
        const keys = Object.keys(request.internal);
        const configList = await getInternal(keys, request);
        configuration.load(configList);
    };

    return {
        before: configurationMiddlewareBefore
    };
};

export default configurationMiddleware;
