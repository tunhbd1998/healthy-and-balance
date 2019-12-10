import React from "react";
import "./search.scss";
import Image from "../image";
import ic_search from './ic_search.svg';

export default function SearchInput({ onChange, children, onSearch, placeHolder, searchText }) {
    return (
        <form className="ip-se" onSubmit={onSearch}>
            <input
                multiple
                onChange={onChange}
                placeholder={placeHolder}
                value={searchText}>
                {children}
            </input>
            <Image src={ic_search} onClick={onSearch}/> 
        </form>
    );
}
