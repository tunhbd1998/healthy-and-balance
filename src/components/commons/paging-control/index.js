import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import './paging-control.scss';

export default function PagingControl({ onNext, onPrev, currentPage, maxPage }) {
    let buttonNext, buttonPrev;
    if (currentPage === 1) {
        buttonPrev = (<Button className="button-pg button-disable"><icon><FontAwesomeIcon  icon={faAngleLeft}/></icon></Button>);
    } else {
        buttonPrev = (<Button className="button-pg" onClick={onPrev}><icon><FontAwesomeIcon  icon={faAngleLeft} /></icon></Button>);
    }

    if (currentPage === maxPage) {
        buttonNext = (<Button className="button-pg button-disable"><icon><FontAwesomeIcon  icon={faAngleRight} /></icon></Button>);
    } else {
        buttonNext = (<Button className="button-pg" onClick={onNext}><icon><FontAwesomeIcon  icon={faAngleRight} /></icon></Button>);
    }

    return (
        <div className="pg">
            {buttonPrev}
            <span className="page-number">Trang {currentPage}/{maxPage}</span>
            {buttonNext}
            
        </div>
    );
}
