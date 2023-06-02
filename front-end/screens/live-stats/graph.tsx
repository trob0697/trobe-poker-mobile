// External Imports
import React, { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import { VictoryChart, VictoryAxis, VictoryLine } from "victory-native";

// Internal Imports
import * as Functions from "../../helper/functions";
import * as Interfaces from "../../helper/interfaces";
import * as Props from "../../helper/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function GraphComponent( props: Props.GraphComponent ): JSX.Element {
  const [earnings, setEarnings] = useState<number>(0);
  const [earningsRate, setEarningsRate] = useState<number>(0);
  const [graphData, setGraphData] = useState<Interfaces.GraphDataPoint[]>([]);

  useEffect(() => {
    const graphData = Functions.getGraphData(props.sessions);
    setEarnings(graphData.earnings);
    setEarningsRate(graphData.earningsRate);
    setGraphData(graphData.graphData);
  }, [props]);

  function yAxisFormater( num: number ): string {
    const res = Math.abs(num) > 999 ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k" : (Math.sign(num) * Math.abs(num)).toString();
    return Math.sign(num) >= 0 ? "$" + res : "-$" + res;
  }

  return (
    <View className="items-center">
      {earnings >= 0 ?
        <>
          <Text className="text-2xl text-green-500">
            {"+$" + earnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <Text className="text-xs text-white">
            {earningsRate.toString() + " BB/HR"}
          </Text>
        </>
      :
        <>
          <Text className="text-2xl text-red-500">
            {"-$" +
              Math.abs(earnings)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <Text className="text-xs text-white">
            {"-" + Math.abs(earningsRate).toString() + " BB/HR"}
          </Text>
        </>
      }
      <VictoryChart
        scale={{ x: "time" }}
        minDomain={{ y: Math.min(0, ...graphData.map((d) => d.y)) }}
        padding={{
          top: 5,
          bottom: HEIGHT * 0.03,
          left: WIDTH * 0.12,
          right: WIDTH * 0.075,
        }}
        height={HEIGHT * 0.27}
        theme={{
          axis: {
            style: {
              axis: { stroke: "grey" },
              grid: { stroke: "grey", strokeWidth: 0.2 },
              ticks: { stroke: "grey", size: 3 },
              tickLabels: {
                padding: 1,
                fontSize: HEIGHT * 0.012,
                fill: "grey",
              },
            },
          },
        }}
      >
        <VictoryAxis tickCount={4} />
        <VictoryAxis dependentAxis tickFormat={(num: number) => yAxisFormater(num)} />
        <VictoryLine data={graphData} style={{ data: { stroke: "white" } }} />
      </VictoryChart>
    </View>
  );
}
