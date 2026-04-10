/**
 * A serialisable WP post representation. All date fields are ISO 8601 strings.
 * Safe to pass across the RSC/client boundary as props or return from a React
 * Router loader without hitting serialisation errors.
 *
 * This type mirrors `SerializablePost` from `@devgateway/wp-react-lib/ssr`.
 */
export interface SerializablePost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string; raw?: string };
  content: { rendered: string; protected: boolean; block_version?: number };
  excerpt: { rendered: string; protected: boolean; raw?: string };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky?: boolean;
  template: string;
  format?: string;
  meta: Record<string, unknown>;
  categories?: number[];
  tags?: unknown[];
  bread_crumbs?: unknown[];
  class_list?: string[];
  acf?: unknown[];
  yoast_head?: string;
  yoast_head_json?: Record<string, unknown>;
  meta_fields?: Record<string, string[]>;
  meta_fields_2?: Record<string, string[]>;
  // Allow any additional fields from WP custom post types / ACF
  [key: string]: unknown;
}

/**
 * Mixin accepted by all layout container components for SSR data injection.
 *
 * @example
 * // Next.js App Router — RSC page
 * const { posts } = await fetchPostsSsr(client, { locale, slug });
 * return <SlugContainer initialData={posts} header={<Header />} />;
 */
export interface ContainerSSRProps {
  /**
   * Pre-fetched WP content from the API client (server-side).
   *
   * When provided:
   * - The Redux Provider/Consumer pair is bypassed entirely.
   * - No client-side WP API fetch is dispatched.
   * - Content renders synchronously from this value.
   *
   * When omitted:
   * - Existing Redux Provider/Consumer behaviour is used unchanged (SPA fallback).
   *
   * Value MUST be JSON-serialisable: ISO 8601 string dates, no class instances,
   * no Map, no Set.
   */
  initialData?: SerializablePost[];
}
