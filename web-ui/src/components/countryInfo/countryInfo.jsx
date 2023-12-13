import styles from "./countryInfo.module.css";

function Legend({selected}) {
    var noData = false
    if(selected.count === -1){
        noData = true
    }

    const displayFullInfo = () => {
        let rowArr = [2]

        rowArr[0] = (<div key="nameRow" className={styles.row}>{selected.name}</div>)
        rowArr[1] = (<div key="countRow" className={styles.row}>{selected.count}</div>)
        return rowArr
    }

    return (
        <div className={styles.hoverInfo}>
            { selected.name != null ? (displayFullInfo()) : (<div className={styles.row}>No country Selected</div>)}
            {/* {selected.ADMIN != null ? (<div className={styles.hoverInfo}> {selected.ADMIN} </div>) : (<div className={styles.hoverInfo}>nothing selected</div>)} */}
        </div>
    )
}

export default Legend;
