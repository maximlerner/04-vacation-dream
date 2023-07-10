import {FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";

import classes from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    onChangePage: Function;
    lastPage:number;

}
function Pagination({currentPage,onChangePage,lastPage}: PaginationProps):JSX.Element {

    const firstPage = 1;

    function handleArrowLeft() {
        if(firstPage < currentPage) onChangePage(currentPage - 1);
    }
    function handleArrowRight() {
        if(lastPage > currentPage) onChangePage(currentPage + 1);
    }
    
    function handleButtons(e: string) {
        if(e === "First") onChangePage(1);
        if(e === "Last") onChangePage(lastPage);
    }
    return <div className={classes.paginaion}>
        <FaArrowAltCircleLeft key="left" className={currentPage > firstPage ? classes.arrows:classes.hide} onClick={handleArrowLeft} />
        <button className={classes.btn} value="First" onClick={(e) => handleButtons(e.currentTarget.value)}>First page</button>
        <p className={classes.pageIndicator}>{currentPage} / {lastPage}</p>
        <button className={classes.btn} value="Last" onClick={(e) => handleButtons(e.currentTarget.value)}>Last page</button>
        <FaArrowAltCircleRight key="right" className={currentPage < lastPage ? classes.arrows:classes.hide} onClick={handleArrowRight} />
    </div>
}

export default Pagination;