import React from 'react';
import { Table } from 'react-bootstrap';
import './table.css';
import ic_trash from './ic_trash.svg';
import ic_edit from './ic_edit.svg';
import Image from '../image';

class DataTableComponent extends React.Component {

    render() {
        const { header, categories, onRemove, onEdit, maxItems, currentPage } = this.props;
        const categorieParse = Object.keys(categories).map(i => categories[i])
        let categoriesArr = [];
        for (let i = (currentPage - 1) * maxItems; (i < currentPage * maxItems && i < categorieParse.length); i += 1) {
            categoriesArr.push(categorieParse[i]);
        }
        return (
            <>
                <Table>
                    <thead>
                        <tr>
                            {
                                header.map((v, idx) => (
                                    <th key={idx}><div className="center-cell">{v}</div></th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categoriesArr.map((v, idx) => (
                                <tr key={idx}>
                                    <td><div className="center-cell">{v.id}</div></td>
                                    <td><div className="center-cell">{v.title}</div></td>
                                    {
                                        <td><div className="center-cell">
                                            <Image
                                                src={ic_edit}
                                                onClick={e => onEdit(e, v.id)}
                                            />
                                            <Image
                                                src={ic_trash}
                                                onClick={e => onRemove(e, v.id)}
                                            />
                                        </div></td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </>
        )
    }
}

export default DataTableComponent;