import {
  defineDocumentType,
  defineNestedType,
  makeSource,
  ComputedFields,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from 'rehype-slug'
import remarkMath from 'remark-math'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => {
      // Split the flattenedPath by '/' and take the last part
      const pathParts = doc._raw.flattenedPath.split('/');
      return pathParts[pathParts.length - 1];
    },
  },
  path: {
    type: 'string',
    resolve: (doc) => {
      // Split the flattenedPath by '/' and take the last part
      const pathParts = doc._raw.flattenedPath.split('/');
      return `/blog/${pathParts[pathParts.length - 1]}`
    },
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
};

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    facebook: { type: 'string' },
    github: { type: 'string' },
  },
  computedFields,
}))

export const PrivacyPolicy = defineDocumentType(() => ({
  name: 'PrivacyPolicy',
  filePathPattern: 'privacy-policy/privacy-policy.mdx',
  contentType: 'mdx',
  computedFields,
}))

export const Serie = defineNestedType(() => ({
  name: 'Serie',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    order: {
      type: 'number',
      required: true,
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    series: { type: 'nested', of: Serie },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    summary: { type: 'string' },
    image: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    layout: { type: 'string' },
  },
  computedFields
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Author, PrivacyPolicy],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkMath,
    ],
    rehypePlugins: [
      rehypeSlug,
      // @ts-ignore
      [rehypePrettyCode, {theme: "dracula"}],
      // @ts-ignore
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: ["anchor-icon"],
              'data-pagefind-ignore': true,
            },
            children: [
              {
                type: "text",
                value: "#",
              },
            ],
          },
        },
      ],
    ]
  }
})
