import { message } from 'antd';
import { fakeSubmitForm } from './service';

const Model = {
  namespace: 'formAdvancedForm',
  state: {},
  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('ζδΊ€ζε');
    },
  },
};
export default Model;
