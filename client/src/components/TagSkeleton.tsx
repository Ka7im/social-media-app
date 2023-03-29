import React from 'react';
import ContentLoader from 'react-content-loader';

const TagSkeleton = () => (
    <ContentLoader
        speed={2}
        width={250}
        height={30}
        viewBox='0 0 250 30'
        backgroundColor='#424242'
        foregroundColor='#ecebeb'
    >
        <rect x='2' y='6' rx='10' ry='10' width='150' height='18' />
    </ContentLoader>
);

export default TagSkeleton;
