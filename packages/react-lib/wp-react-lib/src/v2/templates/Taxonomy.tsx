import { Fragment } from 'react';
import type { WPTerm } from '../client/types';

export interface TaxonomyLinkProps {
    taxonomy: WPTerm;
    locale?: string;
}

export function TaxonomyLink({ taxonomy, locale }: TaxonomyLinkProps) {
    return (
        <div>
            <a href={'#' + (locale ?? '') + '/category/' + taxonomy.slug}>{taxonomy.name}</a>
        </div>
    );
}

export interface TaxonomyProps {
    taxonomies: WPTerm[] | null;
    locale?: string;
}

export function Taxonomy({ taxonomies, locale }: TaxonomyProps) {
    return <Fragment>{taxonomies?.map((taxonomy) => <TaxonomyLink key={taxonomy.id} taxonomy={taxonomy} locale={locale} />)}</Fragment>;
}
