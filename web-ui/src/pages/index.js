import Header from '../components/header'
import Map from '../components/map'

export async function getStaticProps() {
  const res = await fetch('https://raw.githubusercontent.com/jdr161/CSDS234-Final-Project/main/static-data/countries(5MB).json')
  const geoJSON = await res.json()
  return { props: { geoJSON } }
}

export default function Home({ geoJSON }) {
  return (
    <>
    <Header></Header>
    <Map
    mapData={geoJSON}
    ></Map>
    </>
  )
}