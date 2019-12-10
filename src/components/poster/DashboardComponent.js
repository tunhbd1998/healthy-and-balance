import React from 'react';
import DataTableComponent from '../commons/table/DataTableComponent';
import ComboBox from '../commons/combo-box';
import Button2 from '../commons/button-style2';
import './poster.scss';
import ic_add from './ic_add.svg';
import Image from '../commons/image';
import SearchInput from '../commons/search';
import PagingControl from '../commons/paging-control';

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [{
                id: 1,
                name: "test 1",
                createdate: "22/12/2019",
                category: "Sức khỏe",
                status: 0
            },
            {
                id: 2,
                name: "test 2",
                createdate: "22/12/2019",
                category: "Sức khỏe",
                status: -1
            },
            {
                id: 3,
                name: "test 3",
                createdate: "22/12/2019",
                category: "Sức khỏe",
                status: 1
            }],
            header: ["Tên bài viết", "Ngày tạo", "Chuyên mục", "Trạng thái", "Thao tác"],
            categories: ["Tất cả", "Sức khỏe", "Sống khỏe", "Theo mùa", "Khỏe đẹp"]
        }
    }

    onRemove(id) {
        console.log("Remove ", id);
    }

    onEdit(id) {
        console.log("Edit ", id);
    }

    render() {
        const { post, header, categories } = this.state;
        return (
            <>
                <div className="dashboard">
                    <div>
                        <div className="title">
                            Quản lý bài viết
                    </div>
                        <div className="search-input">
                            <SearchInput />
                        </div>
                        <div className="control-tool">
                            <div className="group-one">
                                <ComboBox items={categories} label={"Chuyên mục"} />
                                <ComboBox items={categories} label={"Chuyên mục"} />
                            </div>
                            <div>
                                <Button2 children={<><Image src={ic_add} disable />Thêm bài viết</>} />
                            </div>
                        </div>
                        <DataTableComponent
                            data={post}
                            header={header}
                            onRemove={(id) => this.onRemove(id)}
                            onEdit={(id) => this.onEdit(id)} />
                    </div>
                    <div className="footer">
                        <PagingControl />
                    </div>
                </div>
            </>
        )
    }
}

export default DashboardComponent;