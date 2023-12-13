import styles from "./header.module.css"
import Title from '../title'
import MapOptions from "../mapOptions";

function Header({dataType, setDataType, date, setDate}){
    return (
        <div className={styles.header}>
            <Title />
            <MapOptions dataType={dataType} setDataType={setDataType} date={date} setDate={setDate}/>
        </div>
    )
}

export default Header;