import {Button, Result} from 'antd';
import React from 'react';
import {history, Redirect} from 'umi';
import {getAuthority} from "@/utils/authority";

const NoFoundPage = () => {
  const authority = getAuthority();
  if (authority === 'driver') {
    return <Redirect to={'/driver'}/>
  }
  if (authority === 'operator') {
    return <Redirect to={'/operator/heatmap'}/>
  }
  return (<Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />)
};

export default NoFoundPage;
