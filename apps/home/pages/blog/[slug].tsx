import { GetServerSideProps, NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import { client } from '../../gql/gql-client'
import { gql, useQuery } from '@apollo/client'

const query = gql`
{
  blog(id: 1) {
    data {
      attributes {
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

type Props = {
  title: string,
  description: string,
  picture: string,
  author: string,
  content: string
}

const BlogSlugPage: NextPage<Props> = (props) => {
  const { picture, author, content } = props

  const { data, loading, error } = useQuery(query)

  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>

  console.log(data);

  return (
    <div
      className='bg-[#4BB0B1] min-h-screen w-full'
    >
      <div
        className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-8"
      >
        <h2 className='font-noto text-6xl font-bold text-fresh-salmon drop-shadow'></h2>

        <div className='prose lg:prose-xl'>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  try {
    const data = await client.query({
      query
    })

    console.log(data);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      picture: '/assets/carousel/IMG_0326.png',
      description: 'รอเล็ม อิพซั่ม โคตรโหด โคตรอันตราย แบบสุดๆ นะโมนั้นมันโก้จริงๆ กินลิโพก็โก้ได้เช่นกัน อันนยองฮาโซโย ชางบินอปป้า ออกตอกเค',
      title: 'ช่วยพี่ด้วยยยยยย',
      author: 'IT20 พี่ซันนนนนนนนน',
      content: '## AWESOME \n\nThis is really getting interesting'
    },
  }
}

export default BlogSlugPage