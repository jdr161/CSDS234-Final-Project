import styles from "./header.module.css"

function Header({dataType, setDataType, date, setDate}){
    return (
        <div className={styles.header}>
            hello world!
        </div>
    )
}

export default Header;