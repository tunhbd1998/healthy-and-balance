import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import './paging-control.scss';

export default function PagingControl({ onNext, onPrev, currentPage, maxPage }) {
    return (
        <div className="pg">
            <Button className="button-pg" onClick={onPrev}><FontAwesomeIcon  icon={faAngleLeft} /></Button>
            <span className="page-number">Trang {currentPage}/{maxPage}</span>
            <Button className="button-pg" onClick={onNext}><FontAwesomeIcon  icon={faAngleRight} /></Button>
        </div>
    );
}
