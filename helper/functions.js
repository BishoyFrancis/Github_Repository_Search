//difference between ISO 8601 Format
const elapsedTime = (prevDate , current)=>{
    let previousDate = new Date(`${prevDate}`)
    let currentDate = new Date(`${current}`)
    let difference = currentDate - previousDate
    return Math.floor(difference / 3600)
}

//Fri Aug 21 01:15:30 2020
const dateFormat = (date)=>{
    let dateFormated = {
    year:'',
    month:'',
    day:''
}
    dateFormated.year = parseInt(date.slice(-2));
    dateFormated.month = date.slice(4,7) 
    dateFormated.day = parseInt(date.slice(8,11))

return `${dateFormated.day} ${dateFormated.month} ${dateFormated.year}`
}


const starsFormat = (number)=>{
    // number = Math.floor(number / 1000)
    return number < 1000 ? number : `${Math.floor(number / 1000)}K`
}




export {elapsedTime , dateFormat , starsFormat }
