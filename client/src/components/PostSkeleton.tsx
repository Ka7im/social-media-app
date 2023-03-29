import ContentLoader from 'react-content-loader';

const PostSkeleton = () => (
    <ContentLoader
        speed={2}
        width={580}
        height={600}
        viewBox='0 0 580 600'
        backgroundColor='#424242'
        foregroundColor='#ecebeb'
    >
        <rect x='17' y='14' rx='10' ry='10' width='551' height='349' />
        <circle cx='50' cy='417' r='33' />
        <rect x='95' y='427' rx='10' ry='10' width='138' height='17' />
        <rect x='95' y='394' rx='10' ry='10' width='170' height='17' />
        <rect x='95' y='463' rx='15' ry='15' width='364' height='35' />
        <rect x='274' y='467' rx='0' ry='0' width='3' height='1' />
        <rect x='95' y='523' rx='10' ry='10' width='50' height='20' />
        <rect x='155' y='523' rx='10' ry='10' width='50' height='20' />
        <rect x='215' y='523' rx='10' ry='10' width='50' height='20' />
        <circle cx='107' cy='573' r='12' />
        <rect x='125' y='562' rx='10' ry='10' width='50' height='20' />
        <circle cx='197' cy='573' r='12' />
        <rect x='215' y='562' rx='10' ry='10' width='50' height='20' />
    </ContentLoader>
);

export default PostSkeleton;
