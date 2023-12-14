export default function reduceData(arr){
    if(!Array.isArray(arr)){
        return arr;
    } else {
        const reduced = arr.filter((obj) => obj.iso_code.substring(0,4) !== "OWID" && ((!obj._max.total_vaccinations_per_hundred) || obj._max.total_vaccinations_per_hundred < 100)).reduce((a, v) => ({ ...a, [v["iso_code"]]: 
            v._max.total_cases_per_million ? 
                v._max.total_cases_per_million : 
                v._max.total_deaths_per_million ? v._max.total_deaths_per_million :
                v._max.total_vaccinations_per_hundred}), {})
        return reduced
    }
}