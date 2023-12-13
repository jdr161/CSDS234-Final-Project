export default function reduceData(arr){
    if(!Array.isArray(arr)){
        return arr;
    } else {
        const reduced = arr.filter((obj) => obj.iso_code.substring(0,4) !== "OWID").reduce((a, v) => ({ ...a, [v["iso_code"]]: 
            v._sum.new_cases ? 
                v._sum.new_cases : 
                v._sum.new_deaths ? v._sum.new_deaths :
                v._sum.new_vaccinations}), {})
        return reduced
    }
}