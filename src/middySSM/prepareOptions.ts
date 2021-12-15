import { SSMList } from ".";

export default (ssmList: SSMList, cacheExpiry: Number): object => {
    const options = {
        fetchData: ssmList,
        cacheExpiry: cacheExpiry,
        disablePrefetch: true,
    };

    if (process.env.NODE_ENV === 'test') {
        const localOptions = {
            httpOptions: {},
            endpoint: 'http://localhost:4566',
        };
        options['awsClientOptions'] = localOptions;
    }

    return options;
};
