import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const projectsDirectory = path.join(process.cwd(), 'projects')

function findIdFromFileName(fileName: string): string {
  return fileName.match(/(?<=\d-).*(?=\.md$)/)[0] || '';
}

export function getSortedProjectsData() {
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectData: any[] = fileNames.map(fileName => {
    const id = findIdFromFileName(fileName)
    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  return allProjectData;
}

export function getAllProjectIds() {
  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames.map(fileName => {
    const id = findIdFromFileName(fileName);
    return {
      params: {
        id
      }
    }
  })
}

export async function getProjectData(id) {
  const fileNames = fs.readdirSync(projectsDirectory)
  const file = fileNames.find((file: string) => file.match(id))
  const fullPath = path.join(projectsDirectory, file)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
