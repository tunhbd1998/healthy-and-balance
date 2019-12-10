import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import './paging-control.scss';

export default function PagingControl({ onNext, onPrev, currentPage, maxPage }) {
    let buttonNext, buttonPrev;
    if (currentPage === 1) {
        buttonPrev = (<Button className="button-pg button-disable"><i><FontAwesomeIcon  icon={faAngleLeft}/></i></Button>);
    } else {
        buttonPrev = (<Button className="button-pg" onClick={onPrev}><i><FontAwesomeIcon  icon={faAngleLeft} /></i></Button>);
    }

    if (currentPage === maxPage) {
        buttonNext = (<Button className="button-pg button-disable"><i><FontAwesomeIcon  icon={faAngleRight} /></i></Button>);
    } else {
        buttonNext = (<Button className="button-pg" onClick={onNext}><i><FontAwesomeIcon  icon={faAngleRight} /></i></Button>);
    }

    return (
        <div className="pg">
            {buttonPrev}
            <span className="page-number">Trang {currentPage}/{maxPage}</span>
            {buttonNext}
            
        </div>
    );
}
