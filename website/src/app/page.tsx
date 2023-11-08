import styles from "./page.module.css";
import { Places } from "@/components/Places";

export default function Home() {
  return (
    <main className={styles.main}>
      <Places />
    </main>
  );
}
