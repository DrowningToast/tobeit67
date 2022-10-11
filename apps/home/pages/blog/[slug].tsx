import { GetServerSideProps, NextPage } from 'next'
import ReactMarkdown from 'react-markdown'

type Props = {
  title: string,
  description: string,
  picture: string,
  author: string,
  content: string
}

const BlogSlugPage: NextPage<Props> = (props) => {
  const { picture, author, content } = props

  return (
    <div
      className='bg-[#4BB0B1] min-h-screen w-full'
    >
      <div
        className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-8"
      >
        <h2 className='font-noto text-6xl font-bold text-fresh-salmon drop-shadow'></h2>

        <div style={{ all: 'revert' }}>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      picture: '/assets/carousel/IMG_0326.png',
      description: 'รอเล็ม อิพซั่ม โคตรโหด โคตรอันตราย แบบสุดๆ นะโมนั้นมันโก้จริงๆ กินลิโพก็โก้ได้เช่นกัน อันนยองฮาโซโย ชางบินอปป้า ออกตอกเค',
      title: 'ช่วยพี่ด้วยยยยยย',
      author: 'IT20 พี่ซันนนนนนนนน',
      content: '## AWESOME This is really getting interesting'
    },
  }
}

export default BlogSlugPage