import * as Immutable from 'immutable';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Icon } from '@devgateway/ui';
import { injectIntl, WrappedComponentProps} from 'react-intl';

export interface PostsPaginationProps extends WrappedComponentProps {
    "data-group": string;
    "data-number-of-items-per-page": number;
}

const PostsPagination = (props: PostsPaginationProps) => {
    const {
        "data-group": group,
    } = props;
    const dispatch = useDispatch();
    const postsState: any = useSelector((state: Immutable.Map<string, any>) => state.getIn(['data', "postsPagination", group]));
    const postsFilters: any = useSelector((state: Immutable.Map<string, any>) => state.getIn(['data', 'posts', group]));

    const totalPages: number = postsState && postsState?.totalPages ? postsState.totalPages : 1;
    const [currentPage, setCurrentPage] = useState(postsFilters?.page ?? 1);
    const [options, setOptions] = useState<any[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

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
            ...postsFilters,
            page: page
        });

        const target = document.getElementById(`filtered-posts-${group}`);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 50;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        generateOptions();
    }, [postsState]);

    useEffect(() => {
        const pageFromState = postsFilters?.page ?? 1;
        if (pageFromState !== currentPage) {
            setCurrentPage(pageFromState);
        }
    }, [postsFilters?.page]);


    return (
        <div ref={wrapperRef}>
            <Container fluid className="posts-pagination">
            <div className="posts-pagination-dropdown">
                <span>Page</span>
                <select
                    value={currentPage}
                    onChange={(e) => handlePageChange(parseInt(e.target.value))}
                    className="border border-sui-border rounded-sui px-2 py-1 text-sm"
                >
                    {options.map(opt => <option key={opt.key} value={opt.value}>{opt.text}</option>)}
                </select>
                <div>
                    <span>of {postsState && postsState?.totalPages}</span>
                </div>
            </div>
            <div>
                <Icon
                    size="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    name='chevron-left'
                    disabled={currentPage === 1}
                />
                <Icon
                    size="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    name='chevron-right'
                    disabled={currentPage === totalPages}
                />
            </div>

        </Container>
        </div>
    )
}

export default injectIntl(React.memo(PostsPagination));