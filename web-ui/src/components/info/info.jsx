import styles from "./info.module.css";

function Info({gradientArr}) {
    console.log(gradientArr)
    return(
        <div className={styles.hoverInfo}>
            {gradientArr ? gradientArr.map((gradient) => {
                <div>
                    <i style={`background: ${gradient.color}`}></i>
                    {gradient.level}
                </div>
            }) : "nothing to see here"}
        </div>
    )
}

export default Info;
