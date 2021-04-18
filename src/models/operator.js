import {opHeat} from "@/services/heat";
import moment from "moment";

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
        timestampInfo: {
          newest: moment(timestamp_info.newest).format('YYYY/MM/DD HH:mm:ss'),
          max: moment(timestamp_info.now_max).format('YYYY/MM/DD HH:mm:ss')
        }
      }
    },

  },
};
export default OpHeatModel;
