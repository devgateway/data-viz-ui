import type { WpApiClient } from '../api/client';
import type { Post } from '../post-type';
import type { DgSettings } from '../types';
import type { GetPostsParams, GetPagesParams, GetSettingsParams } from '../api/index';

/**
 * Post with all Date fields normalised to ISO 8601 strings.
 * Safe to pass as Next.js RSC props or React Router loader data.
 */
export type SerializablePost = Omit<Post, 'date' | 'date_gmt' | 'modified' | 'modified_gmt'> & {
    date: string;
    date_gmt: string;
    modified: string;
    modified_gmt: string;
};

export interface PostsPayload {
    posts: SerializablePost[];
    total: number;
    totalPages: number;
}

export interface PagePayload {
    page: SerializablePost | null;
    total: number;
    totalPages: number;
}

function toSerializable(p: Post): SerializablePost {
    return {
        ...p,
        date:         p.date ?? '',
        date_gmt:     p.date_gmt ?? '',
        modified:     p.modified ?? '',
        modified_gmt: p.modified_gmt ?? '',
    };
}

export async function fetchPostsSsr(
    client: WpApiClient,
    params: GetPostsParams
): Promise<PostsPayload> {
    const { data, meta } = await client.getPosts(params);
    return {
        posts: data.map(toSerializable),
        total: Number(meta['x-wp-total'] ?? 0),
        totalPages: Number(meta['x-wp-totalpages'] ?? 0),
    };
}

export async function fetchPageSsr(
    client: WpApiClient,
    params: GetPagesParams
): Promise<PagePayload> {
    const { data, meta } = await client.getPages(params);
    return {
        page: data[0] ? toSerializable(data[0]) : null,
        total: Number(meta['x-wp-total'] ?? 0),
        totalPages: Number(meta['x-wp-totalpages'] ?? 0),
    };
}

export async function fetchSettingsSsr(
    client: WpApiClient,
    params: GetSettingsParams
): Promise<DgSettings> {
    const { data } = await client.getSettings(params);
    return data;
}
