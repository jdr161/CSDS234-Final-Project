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
  const [date, setDate] = useState((new Date()).toISOString().split('T')[0]);

  return (
    <>
      <Header dataType={dataType} setDataType={(val) => setDataType(val)} date={date} setDate={(val) => setDate(val)} />
      <Map mapData={geoJSON} dataType={dataType} date={date}/>
    </>
  )
}