import { gql } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import BlogCard from '../../components/card/BlogCard'
import { client } from '../../gql/gql-client'

const endpoint = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_CMS_DEV
  : process.env.NEXT_PUBLIC_CMD_PROD

const query = (page: number | string) => gql`
{
  blogs(pagination: {page: ${page}, pageSize:3}, sort: "id:desc") {
    meta {
      pagination {
        pageCount
      }
    }
    data {
      id
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

type Blog = {
  id: string,
  title: string,
  description: string,
  picture: string,
  author: string,
  slug: string,
}

type Props = {
  data: Blog[],
  totalPages: number,
  currentPage: number
}

const BlogPage: NextPage<Props> = ({ data, totalPages, currentPage }) => {
  const pagination: JSX.Element[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (i == currentPage) {
      pagination.push(
        <li className='underline cursor-pointer'>
          <a>{i}</a>
        </li>
      )
    } else {
      pagination.push(
        <li className='cursor-pointer'>
          <Link passHref href={`/blog?page=${i}`}>
            <a>{i}</a>
          </Link>
        </li>
      )
    }
  }

  return (
    <div className='bg-[#4BB0B1] min-h-screen w-full'>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-8 py-12">
        <h2 className='font-noto text-3xl md:text-6xl font-bold text-white drop-shadow'>เนื้อหาเพิ่มเติม</h2>

        <div className='w-full flex flex-col gap-4 items-center'>
          {data.map((blog, index) => (
            <BlogCard {...blog} key={index} />
          ))}
        </div>
        <ul className='font-bold text-white font-chonburi flex flex-row gap-1'>
          {pagination}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: reqQuery }) => {
  const page = reqQuery.page as string || 1

  const { data } = await client.query({
    query: query(page)
  })

  if (data.blogs.data.length == 0) {
    return {
      notFound: true
    }
  }

  const returnData: any[] = data.blogs.data.map((blog: any) => {
    const propsData = blog.attributes

    let picture = '/assets/carousel/IMG_0326.png'

    if (propsData.thumbnail.data) {
      picture = endpoint + propsData.thumbnail.data.attributes.url
    }
    
    return {
      id: blog.id,
      picture,
      description: propsData.description,
      title: propsData.title,
      author: propsData.author,
      content: propsData.content
    }
  })

  return {
    props: {
      data: returnData,
      totalPages: data.blogs.meta.pagination.pageCount,
      currentPage: Number(page)
    },
  }
}

export default BlogPage