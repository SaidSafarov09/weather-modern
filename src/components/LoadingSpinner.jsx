import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}>
                <div className={styles.spinnerRing}></div>
                <div className={styles.spinnerRing}></div>
                <div className={styles.spinnerRing}></div>
                <svg className={styles.spinnerIcon} width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
            <p className={styles.loadingText}>Загрузка данных...</p>
        </div>
    );
}
