import { useRef, useEffect, Ref, MutableRefObject } from 'react';

export default function useScroll(
    childRef: MutableRefObject<any>,
    callback: () => void
) {
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        const options = {
            rootMargin: '0px',
            threshold: 0,
        };

        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                console.log('intersected');
                callback();
            }
        }, options);

        observer.current.observe(childRef.current);

        const unobserve = childRef.current;

        return function () {
            observer.current?.unobserve(unobserve);
        };
    }, [callback]);
}
