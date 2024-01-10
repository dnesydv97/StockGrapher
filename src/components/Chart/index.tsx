import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {colors} from '../../utils/theme';

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
  width?: number;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({data, width, height}) => {
  return (
    <ScrollView horizontal>
      <View>
        <LineChart
          data={data}
          width={width || Dimensions.get('window').width}
          height={height || 200}
          yAxisLabel={'$'}
          verticalLabelRotation={80}
          xLabelsOffset={-10}
          chartConfig={{
            backgroundColor: 'red',
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.grey,
            color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.orange,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Chart;
