import React from 'react';
import { Table } from 'react-bootstrap';
import './table.css';
import Label from '../label';
import ic_trash from './ic_trash.svg';
import ic_trash_disable from './ic_trash_disable.svg';
import ic_edit from './ic_edit.svg';
import ic_cancel from './ic_cancel.svg';
import ic_accept from './ic_accept.svg';
import ic_wating from './ic_wating.svg';
import ic_edit_disable from './ic_edit_disable.svg';
import Image from '../image';

// props = {
//     header: []string,
//     data: danh sách bài viết mỗi bài viết gôm {
//          id, title, createdDate, category, status (status 1: đã suyệt, 0 chờ duyệt, -1 bị từ chối)
//      }
//     onRemove: function(id Bài viết),
//     onEdit: function(id Bài viết)
// }
class DataTableComponent extends React.Component {
    // getCategory(id) {
    //     const { categories } = this.props;
    //     let category;
    //     // eslint-disable-next-line array-callback-return
    //     categories.map((v) => {
    //         if (v.id === id) {
    //             category = v.title;
    //             return category;
    //         }
    //     });
    //     return category;
    // }

    render() {
        const { header, users, onToggleActive, maxItems, currentPage } = this.props;
        const userParse =  Object.keys(users).map(i=>users[i])
        console.log(userParse)
        let usersArr = [];
        console.log(maxItems,currentPage)
        for (let i = (currentPage - 1) * maxItems; (i < currentPage * maxItems && i < userParse.length); i += 1) {
            usersArr.push(userParse[i]);
        }
        console.log(usersArr)
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
                            usersArr.map((v, idx) => (
                                <tr key={idx}>
                                    <td><div className="center-cell">{v.username}</div></td>
                                    <td><div className="center-cell">12/1/2019</div></td>
                                    <td><div className="center-cell">{v.isActive ? 'Đang hoạt động': 'Đã khóa'}</div></td>
                                    <td><div className="center-cell">10</div></td>
                                    {
                                        v.isActive === true ?
                                            (<td><div className="center-cell">
                                                <div style={{
                                                    display:'flex',alignItems:'cetner',fontSize:14,padding:'5px 10px',backgroundColor:'#ef3b3b',
                                                    color:'white',borderRadius:10,fontWeight:'bold',cursor:'pointer'
                                                    }} onClick = {()=>{onToggleActive(v.username)}}>

                                                    <Image src={ic_cancel} />
                                                    Khóa tài khoản
                                                </div>
                                            </div></td>)
                                            :
                                            (<td><div className="center-cell">
                                                <div style={{
                                                    display:'flex',alignItems:'cetner',fontSize:14,padding:'5px 10px',backgroundColor:'#4aa113',
                                                    color:'white',borderRadius:10,fontWeight:'bold',cursor:'pointer'
                                                    }} onClick = {()=>{onToggleActive(v.username)}}>
                                                    <Image src={ic_accept} />
                                                    Kích hoạt tài khoản
                                                </div>    
                                            </div></td>)
                                    }
                                    {/* <td><div className="center-cell">{v.createdDate}</div></td>
                                    <td><div className="center-cell">{this.getCategory(v.category)}</div></td>
                                    <td><div className="center-cell">
                                        {
                                            v.status === -1 ?
                                                (<Label type={"danger"} children={<><Image src={ic_cancel} disable />Bị từ chối</>} />)
                                                : v.status === 0 ?
                                                    (<Label type={"warning"} children={<><Image src={ic_wating} disable />Chờ duyệt</>} />)
                                                    :
                                                    <Label type={"primary"} children={<><Image src={ic_accept} disable />Đã duyệt</>} />
                                        }
                                    </div></td>
                                    {
                                        v.status === 1 ?
                                            (<td><div className="center-cell"><Image src={ic_edit_disable} disable /><Image src={ic_trash_disable} disable /></div></td>)
                                            :
                                            (<td><div className="center-cell"><Image src={ic_edit} onClick={() => onEdit(v.id)} /><Image src={ic_trash} onClick={() => onRemove(v.id)} /></div></td>)
                                    } */}
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