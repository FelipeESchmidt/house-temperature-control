"use client";

import React from "react";
import { onValue } from "firebase/database";

import { useDatabaseRef } from "../../hooks/useDatabaseRef";

import styles from "./place.module.css";

export interface IPlaceProps {
  name: string;
  dbKey: string;
  background: string;
}

export const Place = ({ background, name, dbKey }: IPlaceProps) => {
  const placeTemperature = useDatabaseRef(dbKey);

  React.useEffect(() => {
    onValue(placeTemperature, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }, [placeTemperature]);

  return (
    <div
      id={dbKey}
      className={styles.place_single}
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className={styles.place_name}>{name}</h2>

      <div className={styles.place_temperature_container}>
        <span>0º</span>
      </div>
    </div>
  );
};
