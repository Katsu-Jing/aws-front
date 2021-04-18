import {CloseCircleOutlined} from '@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker, Slider, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import {connect} from 'umi';
import TableForm from './components/TableForm';
import styles from './style.less';
import {Line} from "@ant-design/charts";

const {Option} = Select;
const {RangePicker} = DatePicker;

const timeRangeItem = (data) => {
  return <Form.Item
    label={data.name}
    name={data.field_name}
  >
    <RangePicker
      placeholder={['开始日期', '结束日期']}
      showTime={{format: 'HH:mm'}}
      format="YYYY-MM-DD HH:mm"
      disableDate={(current) => current < data.min.value || current > data.max.value}
      style={{
        width: '100%',
      }}
    />
  </Form.Item>
}

const selectItem = (data) => {
  return <Form.Item
    label={data.name}
    name={data.field_name}
  >
    <Select placeholder="请选择">
      {
        data.terms.map(it => (
          <Option value={it.key} key={it.key}>{it.name}</Option>
        ))
      }
    </Select>
  </Form.Item>
}

const rangeItem = (data) => {
  return <Form.Item
    label={data.name}
    name={data.field_name}
  >
    <Slider
      range
      min={data.min.value < 0 ? 0 : data.min.value}
      max={data.max.value}
    />
  </Form.Item>
}

const OpHistory = ({fieldsData, resultData, resultType, resultCols, submitting, dispatch}) => {
  const [form] = Form.useForm();

  const [aggType, setAggType] = useState('range');
  const [intervalUnit, setIntervalUnit] = useState('');

  useEffect(() => {
    if (fieldsData === null || fieldsData === undefined) {
      dispatch({type: 'opHistory/fetchFormData'});
    }
  });

  const formItems = () => {
    if (fieldsData === null || fieldsData === undefined) {
      return <Row/>
    }

    const newData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fieldsData.length; i++) {
      const idx = Math.floor(i / 3);
      if (newData[idx] === undefined) {
        newData[idx] = [fieldsData[i]];
      } else {
        newData[idx] = [...newData[idx], fieldsData[i]];
      }
    }

    return newData.map((rowData, ii) => {
      return <Row gutter={16} key={ii}>
        {
          rowData.map((col, i) => {
            let cc;
            if (col.field_type === 'terms') {
              cc = selectItem(col);
            } else if (col.field_type === 'date') {
              cc = timeRangeItem(col);
            } else if (col.field_type === 'range') {
              cc = rangeItem(col);
            } else {
              cc = <div/>
            }
            const lgSetting = {span: 6};
            if (i !== 0) {
              lgSetting.offset = 2;
            }
            return (<Col lg={lgSetting} md={12} sm={24} key={i}>{cc}</Col>)
          })
        }
      </Row>
    });
  }

  const onFieldsChange = (allFields) => {
    const agg = allFields.find(it => it.name.some(n => n === 'agg_field_1')).value;
    if (agg !== null && agg !== undefined) {
      const item = fieldsData.find(it => it.field_name === agg);
      if (item !== undefined) {
        setAggType(item.field_type);
        if (item.field_type === 'date') {
          if (intervalUnit === '') {
            setIntervalUnit('day');
          }
        } else {
          setIntervalUnit('');
        }
      }
    }
  }

  const onFinish = (values) => {
    dispatch({
      type: 'opHistory/submitAdvancedForm',
      payload: {...values, intervalUnit},
    });
  };

  const onFinishFailed = (errorInfo) => {
  };

  const onIntChange = (v) => {
    console.log(v);
    setIntervalUnit(v);
  }

  const selectAfter = (
    <Select defaultValue="day" onChange={onIntChange} style={{width: 80}}>
      <Option value="day">day</Option>
      <Option value="week">week</Option>
      <Option value="month">month</Option>
      <Option value="quarter">quarter</Option>
      <Option value="year">year</Option>
    </Select>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={(_, allFields) => {
        onFieldsChange(allFields);
      }}
    >
      <PageContainer>
        <Card title="筛选条件" className={styles.card} bordered={false}>
          {formItems()}
        </Card>
        <Card title="聚合维度" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={3} md={12} sm={24}>
              <Form.Item
                label="维度一"
                name="agg_field_1"
              >
                <Select placeholder="请选择">
                  {
                    (fieldsData || [])
                      .filter(item => item.field_type !== 'text')
                      .map((item) => (<Option value={item.field_name} key={item.field_name}>{item.name}</Option>))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col
              lg={{
                span: 5,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              {aggType === 'date' &&
              <Form.Item
                label="聚合值"
                name="interval"
              ><Input placeholder="聚合值" type="number" addonAfter={selectAfter}/>
              </Form.Item>}
              {aggType === 'range' &&
              <Form.Item
                label="聚合值"
                name="interval"
              ><Input placeholder="聚合值" type="number"/>
              </Form.Item>}
            </Col>
            <Col
              xl={{
                span: 5,
                offset: 1,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <Form.Item
                label="维度二"
                name="agg_field_2"
              >
                <Select placeholder="请选择">
                  {
                    (fieldsData || [])
                      .filter(item => item.field_type === 'terms')
                      .map((item) => (<Option value={item.field_name} key={item.field_name}>{item.name}</Option>))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 1,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <Form.Item
                label="统计字段"
                name="calculate_fields"
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="请选择">
                  <Option value="doc_count">打车次数</Option>
                  <Option value="trip_distance">平均车程</Option>
                  <Option value="total_amount">平均费用</Option>
                  <Option value="duration">平均时间(s)</Option>
                  <Option value="speed">平均速度(km/h)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="结果展示" bordered={false}>
          {resultType === 'table' &&
          <Table
            columns={resultCols}
            dataSource={resultData}
          ></Table>
          }
          {resultType === 'line' &&
          <Line
            data={resultData}
            xField='date'
            yField='value'
            seriesField={'type'}
          />
          }
        </Card>
      </PageContainer>
      <FooterToolbar>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({opHistory, loading}) => ({
  fieldsData: opHistory.fieldsData,
  resultData: opHistory.data,
  resultType: opHistory.resultType,
  resultCols: opHistory.columns,
  submitting: loading.effects['opHistory/submitAdvancedForm'],
}))(OpHistory);
