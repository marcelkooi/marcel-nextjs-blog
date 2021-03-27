import Layout from '../../components/layout';
import { getAllProjectIds, getProjectData } from '../../lib/projects';
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head'

export default function Project({ projectData, id }) {
  const canonicalUrl = `https://marcelkooi.com/projects/${id}`

  return (
    <Layout home={null}>
      <Head>
        <title>{projectData.title}</title>
        <link rel="canonical" href={canonicalUrl}/>
      </Head>
      <div className="text-3xl font-semibold mb-5">
        {projectData.title}
      </div>
      { projectData.url && (
        <div className={utilStyles.lightText}>
          <a href={projectData.url} target="_blank" rel="noopener noreferrer">{projectData.url}</a>
        </div>)
      }
      <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}  className="markdown mt-3" />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id)
  return {
    props: {
      projectData,
      id: params.id
    }
  }
}
