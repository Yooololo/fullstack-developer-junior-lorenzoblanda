import styles from "../CSS/Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.aboutus}>
        <h3 className={styles.h3}>About Us</h3>
        <div className={styles.eachItemAbout}>
          We are a team of nurses, doctors, technologists and executives
          dedicated to help nurses find jobs that they love.
        </div>
        <div className={styles.eachItemAbout}>
          All copyrights reserved &#169; 2020 - Health Explore
        </div>
      </div>
      <div className={styles.sitemap}>
        <h3 className={styles.h3}>Sitemap</h3>
        <div className={styles.eachItem}>Nurses</div>
        <div className={styles.eachItem}>Employers</div>
        <div className={styles.eachItem}>Social networking</div>
        <div className={styles.eachItem}>Jobs</div>
      </div>
      <div className={styles.privacy}>
        <h3 className={styles.h3}>Privacy</h3>
        <div className={styles.eachItem}>Terms of use</div>
        <div className={styles.eachItem}>Privacy policy</div>
        <div className={styles.eachItem}>Cookie policy</div>
      </div>
    </div>
  );
}
