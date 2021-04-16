import {opHeat} from "@/services/heat";

const OpHeatModel = {
  namespace: 'opHeat',
  state: {
    current: null,
    last: {},
    predict: {},
    timestampInfo: {}
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(opHeat);
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
export default OpHeatModel;
