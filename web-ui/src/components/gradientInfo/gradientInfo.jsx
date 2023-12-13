import styles from "./gradientInfo.module.css";

function GradientInfo({ gradientArr }) {
    return (
        <div className={styles.hoverInfo}>
            {gradientArr[0] ? gradientArr.map((gradient, index) => {
                return (
                    <div key={`gradient_row_${index}`} className={styles.row}>                        
                        <div style={{ backgroundColor: gradient.color, width: 15, height: 15}}></div>
                        {gradient.level}
                    </div>
                )
            }) : "nothing to see here"}
        </div>
    )
}

export default GradientInfo;
