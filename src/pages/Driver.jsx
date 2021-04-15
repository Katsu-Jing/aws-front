import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Alert, Typography} from 'antd';
import {MapboxScene, HeatmapLayer} from '@antv/l7-react';
import {useIntl, FormattedMessage} from 'umi';
import styles from './Driver.less';

export default () => {
  const dd = {
    type: "FeatureCollection",
    crs: {
      type: "link",
      properties: {href: "https://spatialreference.org/ref/sr-org/google-projection/proj4", type: "proj4"}
    },
    features: [{
      type: "Feature",
      properties: {mag: 6, time: 1519974852000},
      geometry: {type: "Point", coordinates: [-74.04509616544428, 40.689627459655405, 0]}
    }, {
      type: "Feature",
      properties: {mag: 4, time: 1519974816000},
      geometry: {type: "Point", coordinates: [-74.04509616544428, 40.689627459655405, 0]}
    }]
  };

  return (
    <PageContainer>
      <Card>
        <MapboxScene
          id={"map"}
          option={{}}
          map={{
            style: 'light',
            pitch: 0,
            center: [-74.04509616544428, 40.689627459655405],
            zoom: 7.632456779444394,
            // token: '',
          }}
          style={{
            width: "500px",
            minHeight: "500px",
            minWidth: "1000px",
            justifyContent: "center",
            position: "relative"
          }}
        >
          <HeatmapLayer
            source={{data: dd}}
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
                positions: [ 0, 0.2, 0.4, 0.6, 0.8, 1.0 ]
              }
            }}
          />
        </MapboxScene>
      </Card>
    </PageContainer>
  );
};
