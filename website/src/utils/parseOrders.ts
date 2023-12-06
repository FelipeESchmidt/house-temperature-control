import { ITemperatureProps } from "@/components/Place/types";

const normalizeTemperatures = (
  temperatures: Array<any>
): Array<ITemperatureProps> => {
  return temperatures.map((temperature) => {
    return {
      date: temperature.date,
      temperature: temperature.temperature,
    };
  });
};

export const parseTemperatures = (
  temperatures: any
): Array<ITemperatureProps> => {
  if (!temperatures) {
    return [];
  }
  const temperaturesAsArray = Object.values(temperatures);
  if (Array.isArray(temperaturesAsArray)) {
    return normalizeTemperatures(temperaturesAsArray);
  }
  return normalizeTemperatures([temperaturesAsArray]);
};
