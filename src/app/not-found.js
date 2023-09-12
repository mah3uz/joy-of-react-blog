import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 - Page Not Found</h1>
      <p>This page doesn't found. Please check the url and try again!</p>
    </div>
  )
}
