import { Image } from '@mantine/core'

type Props = {
  title: string,
  author: string,
  description: string,
  picture: string
}

const BlogCard: React.FC<Props> = ({ author, title, description, picture }) => {
  return (
    <div className='flex flex-row gap-2 w-3/5'>
      <Image
        className='mx-auto'
        src={picture}
        radius='md'
        sx={{ maxWidth: 220 }}
      />

      <div className='bg-fresh-salmon w-full text-white p-4 rounded-md'>
        <h4 className="font-chonburi text-4xl">{title}</h4>
        <h6 className='font-noto font-bold'>{author}</h6>
        <p className='font-noto'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default BlogCard