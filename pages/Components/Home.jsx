import styles from "../CSS/Home.module.scss";
import Jobs from "./Jobs";

export default function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.theJobs}>
        <Jobs></Jobs>
      </div>
    </div>
  );
}
