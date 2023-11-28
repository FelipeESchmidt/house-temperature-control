import { Place } from "../Place";
import { places } from "./constants";

import styles from "./places.module.css";

export const Places = () => {
  return (
    <div className={styles.places}>
      {places.map((place) => (
        <Place key={place.dbKey} {...place} />
      ))}
    </div>
  );
};
