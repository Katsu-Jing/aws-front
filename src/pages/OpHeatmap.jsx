import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card} from 'antd';
import {MapboxScene, HeatmapLayer} from '@antv/l7-react';
import {connect} from 'umi';

const OpHeatmap = (props) => {
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

  const {dispatch, opHeatmap} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'opHeat/fetch'
      });
    }, 5000);
    return () => {
      clearTimeout(timer)
    }
  });

  return (
    <PageContainer
      title={"全量需求热力图"}
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
            source={{data: opHeatmap[activeHeap] || dd}}
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
          />
        </MapboxScene>
      </Card>
    </PageContainer>
  );
};

export default connect(({opHeat}) => ({
  opHeatmap: opHeat,
}))(OpHeatmap);
