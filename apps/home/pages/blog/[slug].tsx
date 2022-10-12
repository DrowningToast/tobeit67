import { GetServerSideProps, NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import { client } from '../../gql/gql-client'
import { gql } from '@apollo/client'

type Props = {
  title: string,
  description: string,
  picture: string,
  author: string,
  content: string
}

const BlogSlugPage: NextPage<Props> = (props) => {
  const { author, content, title } = props

  return (
    <div className={'bg-white min-h-screen w-full'}>
      <div className="p-4 lg:pt-8 container lg:w-3/5 mx-auto flex flex-col items-start justify-start min-h-screen gap-8">
        <div className='w-full'>
          <h3 className='text-2xl font-bold'>{title}</h3>
          <h6>โดย {author}</h6>
        </div>
        <hr className='border-black w-full mx-auto' />
        <div className='prose lg:prose-xl'>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = gql`
{
  blog(id: ${params!.slug}) {
    data {
      attributes {
        thumbnail {
          data {
            attributes {
              url
            }
          }
        }
        title
        publishedAt
        author
        description
        content
      }
    }
  }
}
`

  try {
    const { data } = await client.query({
      query
    })

    const propsData = data.blog.data.attributes


    return {
      props: {
        description: propsData.description,
        title: propsData.title,
        author: propsData.author,
        content: propsData.content
      },
    }
  } catch (err) {
    console.log(err);

    return {
      notFound: true
    }
  }
}

export default BlogSlugPage