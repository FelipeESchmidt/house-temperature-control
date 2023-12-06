"use client";

import React, { useState } from "react";
import { onValue } from "firebase/database";
import { parseTemperatures } from "@/utils/parseOrders";

import { useDatabaseRef } from "../../hooks/useDatabaseRef";

import { ITemperatureProps } from "./types";
import styles from "./place.module.css";
import Link from "next/link";

export interface IPlaceProps {
  name: string;
  dbKey: string;
  background: string;
}

export const Place = ({ background, name, dbKey }: IPlaceProps) => {
  const [temperatures, setTemperatures] = useState<Array<ITemperatureProps>>(
    []
  );

  const placeTemperature = useDatabaseRef(dbKey);

  React.useEffect(() => {
    onValue(placeTemperature, (snapshot) => {
      const data = snapshot.val();
      setTemperatures(parseTemperatures(data));
    });
  }, [placeTemperature]);

  return (
    <Link href={{ pathname: `/place`, query: { dbKey } }}>
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
    </Link>
  );
};
