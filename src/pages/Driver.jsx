import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Alert, Typography} from 'antd';
import {MapboxScene, HeatmapLayer} from '@antv/l7-react';
import {useIntl, FormattedMessage, connect} from 'umi';
import styles from './Driver.less';

let layer = null;
let scene = null;

const DriverPage = (props) => {
  const dd = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    },
    features: []
  };
  const [activeHeap, setActiveHeap] = useState("current");

  const {dispatch, pageData} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'driverPage/fetch',
        payload: scene === null ? {lng: -73.8713099, lat: 40.6056632} : scene.getCenter()
      });
    }, 2500);

    return () => {
      clearTimeout(timer)
    }
  });

  return (
    <PageContainer
      title={"周边需求热力图"}
      tabList={[{key: "last", tab: "last"}, {key: "current", tab: "current"}, {key: "predict", tab: "predict"}]}
      tabActiveKey={activeHeap}
      onTabChange={(v)=>{setActiveHeap(v)}}
    >
      <Card>
        <MapboxScene
          id={"map"}
          option={{}}
          map={{
            style: 'light',
            pitch: 0,
            center: [-74.04509616544428, 40.689627459655405],
            zoom: 10.632456779444394,
            // token: '',
          }}
          style={{
            width: "100%",
            minHeight: "500px",
            // minWidth: "1000px",
            justifyContent: "center",
            position: "relative"
          }}
        >
          <HeatmapLayer
            source={{data: pageData[activeHeap] || dd}}
            shape='heatmap'
            autoFit={true}
            size={{
              field: 'mag',
              values: [0, 1.0]
            }}
            style={{
              intensity: 2,
              radius: 20,
              opacity: 1.0,
              rampColors: {
                colors: [
                  '#FF4818',
                  '#F7B74A',
                  '#FFF598',
                  '#91EABC',
                  '#2EA9A1',
                  '#206C7C'
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
              }
            }}
            onLayerLoaded={(layer1, scene1) => {
              scene = scene1;
            }}
          />
        </MapboxScene>
      </Card>
    </PageContainer>
  );
};

export default connect(({driverPage}) => ({
  pageData: driverPage,
}))(DriverPage);
