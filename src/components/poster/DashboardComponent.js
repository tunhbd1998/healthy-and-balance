import React from 'react';
import DataTableComponent from '../commons/table/DataTableComponent';
import ComboBox from '../commons/combo-box';
import Button2 from '../commons/button-style2';
import './poster.scss';
import ic_add from './ic_add.svg';
import Image from '../commons/image';
import SearchInput from '../commons/search';
import PagingControl from '../commons/paging-control';
import MainLayout from '../layouts/main-layout';
import { getDataFromLocalStorage } from '../../utils';

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            header: ["Tên bài viết", "Ngày tạo", "Chuyên mục", "Trạng thái", "Thao tác"],
            categories: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        console.log(getDataFromLocalStorage("posts"));
        console.log(getDataFromLocalStorage("categories"));
        this.setState({
            posts: JSON.parse(getDataFromLocalStorage("posts")),
            categories: JSON.parse(getDataFromLocalStorage("categories")),
        })
    }

    onRemove(id) {
        console.log("Remove ", id);
    }

    onEdit(id) {
        console.log("Edit ", id);
    }

    render() {
        const { posts, header, categories } = this.state;
        return (
            <MainLayout haveLeftSidebar={false} menuItems={[]}>
                <>
                    <div className="dashboard">
                        <div>
                            <div className="title">
                                Quản lý bài viết
                            </div>
                            <div className="search-input">
                                <SearchInput placeHolder="Tìm kiếm"/>
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
                                posts={posts}
                                header={header}
                                categories={categories}
                                onRemove={(id) => this.onRemove(id)}
                                onEdit={(id) => this.onEdit(id)} />
                        </div>
                        <div className="footer">
                            <PagingControl />
                        </div>
                    </div>
                </>
            </MainLayout>
        )
    }
}

export default DashboardComponent;