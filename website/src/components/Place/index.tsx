import styles from "./place.module.css";

export interface IPlaceProps {
  name: string;
  dbKey: string;
  background: string;
}

export const Place = ({ background, name }: IPlaceProps) => {
  return (
    <div
      id="quarto1"
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
