import React, { Component } from 'react'
import {Dropdown} from 'react-bootstrap'
import './list-cmt.scss'
import ItemComment from './item-comment'

const options = [{key:1,label:'Mới nhất'},
{key:2,label:'Nổi bật nhất'},
{key:3,label:'Phù hợp nhất'},
{key:4,label:'Tất cả'},]
const ListComment = () => {
    const [filter,setFilter] = React.useState(options[0])
    const handleSelect = (item,obj) => {
        
        const selected = options.filter(i => i.key === +item);
        console.log(selected)
        setFilter(selected[0])
    }
    return (
        <div className='group-list-comment'>
            <div className='filter-comment'>
                Lọc theo 
                <Dropdown size='sm' onSelect= {handleSelect} className='filter-item'>
                    <Dropdown.Toggle size='sm' className='custom-btn-filter'>
                        {filter.label}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                    {options.map(i => {
                        return (<Dropdown.Item eventKey={i.key}>{i.label}</Dropdown.Item>)
                    })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <hr className='line-through'/>
            <div className='comment-item'>
                    <ItemComment/>
            </div>
        </div>
    )
}

export default ListComment;