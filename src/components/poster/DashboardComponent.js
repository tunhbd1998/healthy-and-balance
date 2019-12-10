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
            categories: [],
            status: [],
            maxItems: 10,
            currentPage: 1,
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
            status: [
                {
                    id: 1,
                    title: "Tất cả"
                },
                {
                    id: 2,
                    title: "Bị từ chối"
                },
                {
                    id: 3,
                    title: "Chờ duyệt"
                },
                {
                    id: 4,
                    title: "Đã duyệt"
                },
            ]
        })
    }

    onRemove(id) {
        console.log("Remove ", id);
    }

    onEdit(id) {
        console.log("Edit ", id);
    }

    nextPage() {
        const { state } = this;
        this.setState({
            currentPage: state.currentPage++,
            ...state,
        });
    }

    prevPage() {
        const { state } = this;
        this.setState({
            currentPage: state.currentPage--,
            ...state,
        });
    }

    render() {
        const { posts, header, categories, status, maxItems, currentPage } = this.state;
        console.log(this.state)
        return (
            <MainLayout haveLeftSidebar={false} menuItems={[]}>
                <>
                    <div className="dashboard">
                        <div>
                            <div className="title">
                                Quản lý bài viết
                            </div>
                            <div className="search-input">
                                <SearchInput placeHolder="Tìm kiếm" />
                            </div>
                            <div className="control-tool">
                                <div className="group-one">
                                    <ComboBox items={status} label={"Trạng thái"} />
                                    <ComboBox items={categories} label={"Chuyên mục"} />
                                </div>
                                <div>
                                    <Button2 children={<><Image src={ic_add} disable />Thêm bài viết</>} />
                                </div>
                            </div>
                            <DataTableComponent
                                maxItems={maxItems}
                                currentPage={currentPage}
                                posts={posts}
                                header={header}
                                categories={categories}
                                onRemove={(id) => this.onRemove(id)}
                                onEdit={(id) => this.onEdit(id)} />
                        </div>
                        <div className="footer">
                            <PagingControl
                                onNext={() => this.nextPage()}
                                onPrev={() => this.prevPage()}
                                maxPage={Math.floor(posts.length / maxItems) + 1}
                                currentPage={currentPage} />
                        </div>
                    </div>
                </>
            </MainLayout>
        )
    }
}

export default DashboardComponent;