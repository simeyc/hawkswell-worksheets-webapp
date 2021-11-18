import { FC } from 'react';
import { createMedia } from '@artsy/fresnel';

const AppMedia = createMedia({
    breakpoints: {
        MOBILE: 320,
        TABLET: 768,
        DESKTOP: 992,
    },
});
const mediaStyles = AppMedia.createMediaStyle();
const { MediaContextProvider } = AppMedia;

export const ResponsiveMedia = AppMedia.Media;

export const withResponsiveMedia = <T,>(Component: FC<T>) => {
    return (props: T) => (
        <>
            <style>{mediaStyles}</style>
            <MediaContextProvider>
                <Component {...props} />
            </MediaContextProvider>
        </>
    );
};
