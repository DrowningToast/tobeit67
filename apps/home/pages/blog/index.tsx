import { GetServerSideProps, NextPage } from 'next'
import BlogCard from '../../components/card/BlogCard'

type Blog = {
  title: string,
  description: string,
  picture: string,
  author: string
}

type Props = {
  data: Blog[]
}

const BlogPage: NextPage<Props> = ({ data }) => {
  return (
    <div className='bg-[#4BB0B1] min-h-screen w-full'>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-8 py-12">
        <h2 className='font-noto text-6xl font-bold text-fresh-salmon drop-shadow'>เนื้อหาเพิ่มเติม</h2>

        <div className='w-full flex flex-col gap-4 items-center'>
          {data.map((blog, index) => (
            <BlogCard {...blog} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      data: [
        {
          picture: '/assets/carousel/IMG_0326.png',
          description: 'วอดชูทไอดู​ พี่จะตายห่าแล้วครับน้อน ๆ ช่วยพี่ด้วย',
          title: 'ช่วยพี่ด้วยยยยยย',
          author: 'IT20 พี่ซันนนนนนนนน'
        },
        {
          picture: '/assets/carousel/IMG_0326.png',
          description: 'รอเล็ม อิพซั่ม โคตรโหด โคตรอันตราย แบบสุดๆ นะโมนั้นมันโก้จริงๆ กินลิโพก็โก้ได้เช่นกัน อันนยองฮาโซโย ชางบินอปป้า ออกตอกเค',
          title: 'ช่วยพี่ด้วยยยยยย',
          author: 'IT20 พี่ซันนนนนนนนน'
        },
        {
          picture: '/assets/carousel/IMG_0326.png',
          description: 'รอเล็ม อิพซั่ม โคตรโหด โคตรอันตราย แบบสุดๆ นะโมนั้นมันโก้จริงๆ กินลิโพก็โก้ได้เช่นกัน อันนยองฮาโซโย ชางบินอปป้า ออกตอกเค',
          title: 'ช่วยพี่ด้วยยยยยย',
          author: 'IT20 พี่ซันนนนนนนนน'
        },
        
      ]
    }
  }
}

export default BlogPage