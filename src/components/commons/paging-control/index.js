import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import './paging-control.scss';

export default function PagingControl({ onNext, onPrev, currentPage, maxPage }) {
    let buttonNext, buttonPrev;
    if (currentPage === 1) {
        buttonPrev = (<Button className="button-pg button-disable"><FontAwesomeIcon  icon={faAngleLeft}/></Button>);
    } else {
        buttonPrev = (<Button className="button-pg" onClick={onPrev}><FontAwesomeIcon  icon={faAngleLeft} /></Button>);
    }

    if (currentPage === maxPage) {
        buttonNext = (<Button className="button-pg button-disable"><FontAwesomeIcon  icon={faAngleRight} /></Button>);
    } else {
        buttonNext = (<Button className="button-pg" onClick={onNext}><FontAwesomeIcon  icon={faAngleRight} /></Button>);
    }

    return (
        <div className="pg">
            {buttonPrev}
            <span className="page-number">Trang {currentPage}/{maxPage}</span>
            {buttonNext}
            
        </div>
    );
}
