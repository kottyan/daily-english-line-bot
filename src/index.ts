import { gasApi } from './gasapi.service';

declare var global: any;

global.doPost = (e: any): any => {
  gasApi.doPost(e);
};

global.doGet = (e: any): void => {
  gasApi.doGet(e);
};


