"use client";
import React, { useState, useEffect } from "react";

import { onValue } from "firebase/database";
import { useDatabaseRef } from "@/hooks/useDatabaseRef";
import { parseTemperatures } from "@/utils/parseOrders";

import { IPlaceProps } from "../Place";
import styles from "./placeInfo.module.css";
import { ITemperatureProps } from "../Place/types";
import { useApi } from "@/hooks/useApi";

export const PlaceInfo = ({ background, name, dbKey }: IPlaceProps) => {
  const { postChangeAirState } = useApi();
  const [temperatures, setTemperatures] = useState<Array<ITemperatureProps>>(
    []
  );

  const placeTemperature = useDatabaseRef(dbKey);

  useEffect(() => {
    onValue(placeTemperature, (snapshot) => {
      const data = snapshot.val();
      setTemperatures(parseTemperatures(data).reverse());
    });
  }, [placeTemperature]);

  const getDate = (dateTime: string, type: string) => {
    const [date, hour] = dateTime.split(" ");
    if (type === "date") return date;
    if (type === "hour") return hour;
  };

  return (
    <div className={styles.container}>
      <div
        id={dbKey}
        className={styles.place_single}
        style={{ backgroundImage: `url(${background})` }}
      >
        <h2 className={styles.place_name}>{name}</h2>

        <div className={styles.place_temperature_container}>
          <span>
            {!!temperatures && temperatures.length > 0
              ? temperatures[0].temperature
              : "--"}
            º
          </span>
        </div>
      </div>
      <div className={styles.buttons_container}>
        <button
          className={`${styles.button} ${styles.button_on}`}
          onClick={() => postChangeAirState(dbKey, true)}
        >
          Ligar
        </button>
        <button
          className={`${styles.button} ${styles.button_off}`}
          onClick={() => postChangeAirState(dbKey, false)}
        >
          Desligar
        </button>
      </div>
      <table className={styles["place-info-table"]}>
        <thead>
          <tr>
            <th>Temperatura</th>
            <th>Data</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {temperatures.map((item, index) => (
            <tr key={index}>
              <td>{item.temperature}</td>
              <td>{getDate(item.date, "date")}</td>
              <td>{getDate(item.date, "hour")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
