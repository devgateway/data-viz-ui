import * as Immutable from 'immutable';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Dropdown, Icon } from 'semantic-ui-react';
import { injectIntl, WrappedComponentProps} from 'react-intl';

const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },

]

interface PostsPaginationProps extends WrappedComponentProps {
    "data-group": string;
    "data-number-of-items-per-page": number;
}

const PostsPagination = (props: PostsPaginationProps) => {
    const {
        "data-group": group,
    } = props;
    const dispatch = useDispatch();
    const postsState: any = useSelector((state: Immutable.Map<string, any>) => state.getIn(['data', "postsPagination", group]));

    const totalPages: number = postsState && postsState?.totalPages ? postsState.totalPages : 1;
    const [currentPage, setCurrentPage] = useState(1);
    const [options, setOptions] = useState<any[]>([]);

    const generateOptions = () => {
        const options: any[] = [];
        for (let i = 1; i <= totalPages; i++) {
            options.push({ key: i, text: i, value: i });
        }
        setOptions(options);
    }

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);
        dispatch({
            type: "SET_POSTS_FILTER",
            group,
            ...postsState,
            page: page
        });
    }

    useEffect(() => {
        generateOptions();
    }, [postsState?.totalPages]);


    return (
        <Container fluid className="posts-pagination">
            <div className="posts-pagination-dropdown">
                <span>Page</span>
                <Dropdown
                    options={options}
                    placeholder='Select Item'
                    selection
                    compact
                    value={currentPage}
                    onChange={(e, data) => handlePageChange(Number(data.value))}
                />
                <div>
                    <span>of {postsState && postsState?.totalPages}</span>
                </div>
            </div>
            <div>
                <Icon
                    size="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    name='angle left'
                    disabled={currentPage === 1}
                />
                <Icon
                    size="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    name='angle right'
                    disabled={currentPage === totalPages}
                />
            </div>

        </Container>
    )
}

export default injectIntl(React.memo(PostsPagination));