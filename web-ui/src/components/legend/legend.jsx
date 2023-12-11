import styles from "./legend.module.css";

function Legend({selected}) {

    return (
        <>
            {selected.ADMIN != null ? (<div className={styles.hoverInfo}> {selected.ADMIN} </div>) : (<div className={styles.hoverInfo}>nothing selected</div>)}
        </>
    )
}

export default Legend;
