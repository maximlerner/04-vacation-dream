import VacationModel from "../Models/VacationModel";

// That function will filter by price
function filterPrice(e: any,onFilter: any,onFilterVacations: any,vacations: VacationModel[]) {
    //Will update fillteredVacations to vacation with higher price then $1500
    if(e.target.value === "1500+") {
        const fillteredVacations = vacations.slice().filter((vacation) => Number(vacation.price) > 1500);
        onFilter(true);
        onFilterVacations(fillteredVacations);
    }
    //Will update fillteredVacations to vacation price between $500 and $1500
    if(e.target.value === "500-1500") {
        const fillteredVacations = vacations.slice().filter((vacation) => Number(vacation.price) >= 500 && Number(vacation.price) <= 1500);
        onFilter(true);
        onFilterVacations(fillteredVacations);
    };
    //Will update fillteredVacations to vacation with lower price then $500
    if(e.target.value === "1-500") {
        const fillteredVacations = vacations.slice().filter((vacation) => Number(vacation.price) < 500);
        onFilter(true);
        onFilterVacations(fillteredVacations);         
    };
    
}

function filterAlfabet(e: any,onFilter: any,onFilterVacations: any,vacations: VacationModel[]) {
    
    //Will update fillteredVacations descending alfabet order
    if(e.target.value === "descending") {
        const fillteredVacations = vacations.slice().sort((a,b) => a.destination.localeCompare(b.destination));
        onFilter(true);
        onFilterVacations(fillteredVacations);
    }
    //Will update fillteredVacations ascending alfabet order
    if(e.target.value === "ascending") {
        const fillteredVacations = vacations.slice().sort((a,b) => b.destination.localeCompare(a.destination));
        onFilter(true);
        onFilterVacations(fillteredVacations);
    }
}

export default {
    filterPrice,
    filterAlfabet
}