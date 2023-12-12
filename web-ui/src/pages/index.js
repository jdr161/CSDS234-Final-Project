import Header from '../components/header'
import Map from '../components/map'
import { useState } from 'react'

export async function getStaticProps() {
  const res = await fetch('https://raw.githubusercontent.com/jdr161/CSDS234-Final-Project/main/static-data/countries(5MB).json')
  const geoJSON = await res.json()
  return { props: { geoJSON } }
}

export default function Home({ geoJSON }) {
  const [dataType, setDataType] = useState("cases");
  const [date, setDate] = useState(null);

  return (
    <>
      <Header dataType={dataType} setDataType={setDataType} date={date} setDate={setDate} />
      <Map mapData={geoJSON} dataType={dataType} date={date}/>
    </>
  )
}