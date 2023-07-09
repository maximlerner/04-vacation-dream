import {FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";

import classes from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    onChangePage: Function;
    lastPage:number;

}
function Pagination(props: PaginationProps):JSX.Element {

    const firstPage = 1;

    function handleArrowLeft() {
        if(firstPage < props.currentPage) props.onChangePage(props.currentPage - 1);
    }
    function handleArrowRight() {
        if(props.lastPage > props.currentPage) props.onChangePage(props.currentPage + 1);
    }
    
    function handleButtons(e: string) {
        if(e === "First") props.onChangePage(1);
        if(e === "Last") props.onChangePage(props.lastPage);
    }
    return <div className={classes.paginaion}>
        <FaArrowAltCircleLeft key="left" className={props.currentPage > firstPage ? classes.arrows:classes.hide} onClick={handleArrowLeft} />
        <button className={classes.btn} value="First" onClick={(e) => handleButtons(e.currentTarget.value)}>First page</button>
        <p className={classes.pageIndicator}>{props.currentPage} / {props.lastPage}</p>
        <button className={classes.btn} value="Last" onClick={(e) => handleButtons(e.currentTarget.value)}>Last page</button>
        <FaArrowAltCircleRight key="right" className={props.currentPage < props.lastPage ? classes.arrows:classes.hide} onClick={handleArrowRight} />
    </div>
}

export default Pagination;