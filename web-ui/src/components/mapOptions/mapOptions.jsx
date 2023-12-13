
function MapOptions({ dataType, setDataType, date, setDate }) {
    const onDataTypeChange = (e) => {
        setDataType(e.target.value)
    }

    const onDateChange = (e) => {
        setDate(e.target.value)
    }

    return (
        <div>
            <div>
                <input type="radio" value="cases" name="dataType" checked={dataType === "cases"} onChange={onDataTypeChange} /> Cases
                <input type="radio" value="deaths" name="dataType" checked={dataType === "deaths"} onChange={onDataTypeChange} /> Deaths
                <input type="radio" value="vaccinations" name="dataType" checked={dataType === "vaccinations"} onChange={onDataTypeChange} /> Vaccinations
            </div>
            <div>
                <input type="date" value={date ? date : new Date()} onChange={onDateChange} />
            </div>
        </div>
    )

} export default MapOptions;