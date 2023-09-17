import { BASE_API_URL } from '@/constants';
import ky from 'ky';

const httpClient = ky.extend({
  prefixUrl: BASE_API_URL,
  timeout: 5000,
})

export default httpClient

