import { Image } from '@mantine/core'
import Link from 'next/link'

type Props = {
  id: string
  title: string,
  author: string,
  description: string,
  picture: string,
}

const endpoint = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_CMS_DEV
    : process.env.NEXT_PUBLIC_CMD_PROD

const BlogCard: React.FC<Props> = ({
  author, title, description, picture, id }) => {
  const pictureUrl = endpoint + picture

  return (
    <div className='transition-all w-3/5 drop-shadow-md hover:-translate-y-2'>
      <Link href={`/blog/${id}`} passHref>
        <a className='w-full flex flex-col lg:flex-row gap-2'>
          <Image
            className='mx-auto select-none'
            src={pictureUrl}
            radius='md'
            sx={{ maxWidth: 220 }}
          />

          <div className='bg-fresh-salmon w-full text-white p-4 rounded-md'>
            <h4 className="font-chonburi text-xl lg:text-4xl">{title}</h4>
            <h6 className='font-noto font-bold'>{author}</h6>
            <p className='font-noto'>
              {description}
            </p>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default BlogCard