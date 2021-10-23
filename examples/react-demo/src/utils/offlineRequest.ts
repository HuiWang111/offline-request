import OfflineRequest, { NetWork } from '../../../../src'
import Axios from 'axios'

const network = new NetWork()
const wait = (timer: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timer);
    })
}
export const offlineRequest = new OfflineRequest(Axios.create(), async () => {
    await wait(1000);
    return false;
});
