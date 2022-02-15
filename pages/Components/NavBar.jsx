import styles from "../CSS/NavBar.module.scss";
import { useState } from "react";

export default function NavBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterEgg2, setEasterEgg2] = useState(false);

  return (
    <header className={styles.NavBar}>
      <div className={styles.div} />
      <nav className={styles.nav}>
        <div className={styles.dropdownMenu}>&#8801;</div>
        <div className={styles.eachDiv}>
          <div className={styles.divHeEx}>HEALTH EXPLORE</div>
        </div>
        <div className={styles.middledivs}>
          <div className={styles.eachDiv}>
            <div className={styles.div}>PROFILE</div>
          </div>
          <div className={styles.eachDiv}>
            <div className={styles.div}>JOBS</div>
          </div>
          <div className={styles.eachDiv}>
            <div className={styles.div}>PROFESSIONAL NETWORK</div>
          </div>
          <div className={styles.eachDiv}>
            <div className={styles.div}>LOUNGE</div>
          </div>
          <div className={styles.eachDiv}>
            <div className={styles.div}>SALARY</div>
          </div>
        </div>
        <div className={styles.rightdivs}>
          <div className={styles.eachDiv}>
            <div className={styles.div}>
              {easterEgg && (
                <button
                  onClick={() => setEasterEgg2(!easterEgg2)}
                  className={styles.easterEgg}
                >
                  Considering hiring me? &#128064;
                </button>
              )}
              {easterEgg2 && (
                <button
                  className={styles.easterEgg2}
                  onClick={() => {
                    setEasterEgg(false), setEasterEgg2(false);
                  }}
                >
                  You should &#128076;
                </button>
              )}
              <button
                onClick={() => {
                  setEasterEgg(!easterEgg), setEasterEgg2(false);
                }}
                className={styles.buttonCreate}
              >
                CREATE JOB
              </button>
            </div>
          </div>
          <div className={styles.eachDiv}>
            <div className={styles.divBP}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={styles.buttonProfile}
              >
                LB
              </button>
              {showNotifications ? (
                <span className={styles.notification}>2</span>
              ) : null}
            </div>
          </div>
          <div className={styles.eachDiv}>
            <div className={styles.divLog}>LOGOUT</div>
          </div>
        </div>
      </nav>
    </header>
  );
}
