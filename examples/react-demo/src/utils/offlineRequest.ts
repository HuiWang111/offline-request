import OfflineRequest, { NetWork } from '../../../../src'
import Axios from 'axios'

const network = new NetWork()
export const offlineRequest = new OfflineRequest(Axios.create(), () => false);
