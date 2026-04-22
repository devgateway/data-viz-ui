import React from 'react'
import FilteredPostContent from './FilteredPostsContent';

const FilteredPostIntro = (props: any) => {
    return <FilteredPostContent {...props} showIntro={true}></FilteredPostContent>
}

export default FilteredPostIntro;