import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import { Theme } from '.';
import * as Store from '../store';
import {goBack, navigate} from './navigation';

const BASE_URL = process.env.APP_API_URL
const API_KEY = process.env.API_KEY
console.log("first url ", BASE_URL , API_KEY)

const request = async (params: any) => {
 
  const {config, ...restConfig}: any = params;
  console.log("URl#####",BASE_URL+restConfig.url+API_KEY)
  try {
    const res = await axios({
      ...restConfig,
      url: `${BASE_URL}${restConfig.url}${API_KEY}`,
    });
// console.log("response",res)
    if (res.status >= 200 && res.status < 300) {
      if (res.data.status === 'error') {
        throw res;
      } else {
        const data = res.data.data;
        if (config?.store?.action) {
          Store.store.dispatch(Store.Actions[config.store.action](config.store.key, data));
        }
        if (config?.successMessage) {
          Snackbar.show({
            text: config?.successMessage,
            textColor: Theme.colors.white,
            backgroundColor: Theme.colors.primary,
          });
        }
        if (config?.navigateBack) {
          goBack();
        }
        if (config?.navigate) {
          navigate(...config.navigate);
        }
        return data;
      }
    } else {
      throw res;
    }
  } catch (err: any) {
    let errMsg;
    if (err && err.response && err.response.data && err.response.data.message) {
      errMsg = err.response.data.message;
    } else if (err && err.response && err.response.data && err.response.data.error) {
      errMsg = err.response.data.error;
    } else {
      errMsg = err.message || err;
    }
 
    if (config?.showErrorMessage) {
      Snackbar.show({
        text: errMsg,
        textColor: Theme.colors.white,
        backgroundColor: Theme.colors.danger,
      });
    }
    console.log('API error:', errMsg);
    throw errMsg;
  }
};

export default request;
