import immutablePersistenceTransform from '../services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
    active: true,
    reducerVersion: '0.0.6',
    storeConfig: {
        storage: AsyncStorage,
        //blacklist: [], // reducer keys that you do NOT want stored to persistence here
        whitelist: ['login'],
        // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
        transforms: [immutablePersistenceTransform]
    }
};

export default REDUX_PERSIST;
