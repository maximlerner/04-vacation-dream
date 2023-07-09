import VacationModel from "../../../Models/VacationModel";
import SortingHelpers from "../../../Utils/SortingAndFilterHelpers";
import classes from "./Sorting.module.css";

interface SortingProps {
    vacations: VacationModel[];
    // filteredVacations: VacationModel[];
    // filtered: boolean;
    onFilter: Function;
    onFilterVacations: Function;
}

// function Sorting({vacations,filteredVacations,filtered,onFilter,onFilterVacations}: SortingProps ):JSX.Element {
function Sorting({vacations,onFilter,onFilterVacations}: SortingProps ):JSX.Element {

    // Filter by price
    function handleFilterPrice(e: any) {
        SortingHelpers.filterPrice(e, onFilter ,onFilterVacations ,vacations);
    }

    // Sort by destination
    function handleSortByDestination(e: any) {
        SortingHelpers.filterAlfabet(e, onFilter ,onFilterVacations ,vacations);
    }

    return <div className={classes.sort}>
        <p>Sort by</p>
        {/* Select Filter for price */}
        <select defaultValue="Price" className={classes.filter} onChange={(e) => handleFilterPrice(e)}>
            <option  disabled>Price</option>
            <option value="1500+">$1500 + </option>
            <option value="500-1500">$500 - $1500</option>
            <option value="1-500">$1 - $500</option>
        </select>

        {/* Select Sorting for destination */}
        <select defaultValue="Destination" className={classes.filter} onChange={(e) => handleSortByDestination(e)}>
            <option  disabled>Destination</option>
            <option value="descending">Descending order</option>
            <option value="ascending">Ascending order</option>
        </select>
        <button className={classes.btn}>Remove all filters</button>
    </div>
}

export default Sorting;