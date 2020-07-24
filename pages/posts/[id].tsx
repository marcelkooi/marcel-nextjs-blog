import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date'
import Head from 'next/head'

export default function Post({ postData, id }) {
  const canonicalUrl = `https://marcelkooi.com/posts/${id}`

  return (
    <Layout home={null}>
      <Head>
        <title>{postData.title}</title>
        <link rel="canonical" href={canonicalUrl}/>
      </Head>
      <div className="text-3xl font-semibold mb-5">
        {postData.title}
      </div>
      <div className="text-lg mb-5 text-gray-600">
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}  className="markdown mt-3" />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
      id: params.id
    }
  }
}
