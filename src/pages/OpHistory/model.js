import {message} from 'antd';
import {submitForm, getRecentFormData} from './service';

const Model = {
  namespace: 'opHistory',
  state: {},
  effects: {
    * fetchFormData(_, {call, put}) {
      const resp = yield call(getRecentFormData);
      if (resp) {
        yield put({
          type: 'update',
          payload: resp,
        });
      }
    },

    * submitAdvancedForm({payload}, {call, put}) {
      const queryParams = {};
      Object.keys(payload).forEach(k => {
        if (payload[k] === undefined || payload[k] === null) {
          return;
        }
        if (Array.isArray(payload[k]) && payload[k][0].unix !== undefined) {
          queryParams[k] = payload[k].map(i => i.valueOf());
          return;
        }
        if (k === 'agg_field_1' || k === 'agg_field_2') {
          queryParams[k] = {field: payload[k]};
          return;
        }
        if (k === 'intervalUnit') {
          return;
        }
        if (k === 'interval') {
          if (payload.intervalUnit !== '') {
            queryParams.agg_field_1 = {
              ...queryParams.agg_field_1,
              interval: payload.intervalUnit,
              interval_value: parseInt(payload[k])
            };
          } else {
            queryParams.agg_field_1.interval = parseInt(payload[k]);
          }
          return;
        }
        queryParams[k] = payload[k];
      });
      console.log(payload, queryParams);
      const resp = yield call(submitForm, queryParams);
      if (resp.msg !== null && resp.msg !== undefined && resp.msg !== '') {
        message.error(resp.msg);
      } else {
        yield put({type: 'updateResult', payload: resp});
        message.success('提交成功');
      }
    },
  },

  reducers: {
    update(state, {payload}) {
      const fieldsData = Object.keys(payload).map((k) => {
        if (typeof payload[k] === 'number' || typeof payload[k] === 'string') {
          return {field_name: k, field_type: 'text', name: k, value: payload[k]}
        }
        return {field_name: k, ...payload[k]};
      });

      return {
        ...state,
        fieldsData
      }
    },

    updateResult(state, {payload}) {
      const {columns, data} = payload;
      return {
        ...state,
        resultType: columns === undefined ? 'line' : 'table',
        columns,
        data
      }
    }
  },
};
export default Model;
