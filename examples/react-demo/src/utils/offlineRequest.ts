import OfflineRequest from '../../../../src'
import Axios from 'axios'

export const offlineRequest = new OfflineRequest(Axios.create());
