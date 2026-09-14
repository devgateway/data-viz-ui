import type { ImgHTMLAttributes } from 'react';
import type { Media } from '../../types';

export interface PostIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    media?: Media | null;
}

export function PostIcon({ media, ...imgProps }: PostIconProps) {
    if (!media?.guid?.rendered) {
        return null;
    }
    return <img {...imgProps} src={media.guid.rendered} alt={imgProps.alt ?? ''} />;
}
