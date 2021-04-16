import {driverHeat} from "@/services/heat";

const DriverPageModel = {
  namespace: 'driverPage',
  state: {
    current: null,
    last: {},
    predict: {},
    timestampInfo: {}
  },
  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(driverHeat, payload);
      yield put({
        type: 'update',
        payload: response,
      });
    },
  },
  reducers: {
    update(state, {payload}) {
      // eslint-disable-next-line camelcase
      const {current, last, predict, timestamp_info} = payload;

      return {
        ...state,
        current,
        last,
        predict,
        timestampInfo: {newest: timestamp_info.newest, max: timestamp_info.now_max}
      }
    },

  },
};
export default DriverPageModel;
