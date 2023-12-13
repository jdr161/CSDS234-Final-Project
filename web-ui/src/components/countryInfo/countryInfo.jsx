import styles from "./countryInfo.module.css";

function Legend({selected}) {
    const displayFullInfo = () => {
        let rowArr = [2]
        rowArr[0] = (<div key="nameRow" className={styles.row}>{selected.name}</div>)

        if (selected.count === -1){
            rowArr[1] = (<div key="countRow" className={styles.row}>No data available for this location</div>)
        } else {
            rowArr[1] = (<div key="countRow" className={styles.row}>{selected.count}</div>)
        }
        return rowArr
    }

    return (
        <div className={styles.hoverInfo}>
            { selected.name != null ? (displayFullInfo()) : (<div className={styles.row}>No country Selected</div>)}
        </div>
    )
}

export default Legend;
