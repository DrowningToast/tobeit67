import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: string
  title: string,
  author: string,
  description: string,
  picture: string,
}



const BlogCard: React.FC<Props> = ({
  author, title, description, picture, id }) => {

  return (
    <div className='transition-all w-3/5 drop-shadow-md hover:-translate-y-2'>
      <Link href={`/blog/${id}`} passHref>
        <a className='w-full flex flex-col lg:flex-row gap-2'>
          <div className='mx-auto select-none w-[220px] relative'>
            <Image
              className='rounded-md'
              src={picture}
              layout='fill'
              objectFit='cover'
              quality={75}
              loading='eager'
            />
          </div>
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