import React from 'react';
import DataTableComponent from '../commons/table/DataTableComponent';

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
        }
    }

    onRemove(id) {
        console.log("Remove ", id);
    }

    onEdit(id) {
        console.log("Edit ", id);
    }

    render() {
        const { post, header } = this.state;
        return (
            <DataTableComponent
                data={post}
                header={header}
                onRemove={(id) => this.onRemove(id)}
                onEdit={(id) => this.onEdit(id)} />
        )
    }
}

export default DashboardComponent;