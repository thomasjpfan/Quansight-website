import { FC } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Api, usePreviewMode } from '@quansight/shared/storyblok-sdk';
import {
  ISlugParams,
  TArticleProps,
  DomainVariant,
} from '@quansight/shared/types';
import { Layout, SEO } from '@quansight/shared/ui-components';

import { ARTICLES_DIRECTORY_SLUG } from '../../utils/getArticlesPaths/constants';
import { getArticlesPaths } from '../../utils/getArticlesPaths/getArticlesPaths';

const Article: FC<TArticleProps> = ({ data, footer, header, preview }) => {
  usePreviewMode(preview);
  const { content } = data;

  return (
    <Layout footer={footer} header={header} variant={DomainVariant.Quansight}>
      <SEO
        title={content.title}
        description={content.description}
        variant={DomainVariant.Quansight}
      />
      {/* TODO: hero */}
      {/* TODO: go back link */}
      {/* TODO: meta data */}
      <h1>{content.postTitle}</h1>
      {/* TODO: article */}
      {/* TODO: read more */}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Api.getLinks();
  return {
    paths: getArticlesPaths(data?.Links.items),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  TArticleProps,
  ISlugParams
> = async ({ params: { slug }, preview = false }) => {
  const { data } = await Api.getArticleItem({
    slug: `${ARTICLES_DIRECTORY_SLUG}${slug}`,
  });
  const { data: footer } = await Api.getFooterItem();
  const { data: header } = await Api.getHeaderItem();

  return {
    props: {
      data: data.ArticleItem,
      footer: footer ? footer.FooterItem : null,
      header: header ? header.HeaderItem : null,
      preview,
    },
  };
};

export default Article;
