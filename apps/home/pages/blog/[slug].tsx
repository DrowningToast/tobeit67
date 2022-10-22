import { GetServerSideProps, NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { client } from "../../gql/gql-client";
import { gql } from "@apollo/client";
import { ChevronLeft } from "tabler-icons-react";
import Link from "next/link";
import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description: string;
  picture: string;
  author: string;
  content: string;
};

const BlogSlugPage: NextPage<Props> = (props) => {
  const { author, content, title } = props;

  return (
    <div className={"bg-white min-h-screen min-w-fit relative"}>
      <NextSeo
        title={title}
        description="ToBeIT'67 เสริมความคิด ติดความรู้ ก้าวเข้าสู่ เด็กไอที กิจกรรมที่จะพาน้องๆ ผ่านกิจกรรมการเรียนรู้ผ่านบนโลกออนไลน์และภายในคณะไอที เพื่อเสริมความรู้วิชาการเทคโนโลยีสารสนเทศให้แก่ส้งคม"
        canonical="https://tobeit.it.kmitl.ac.th"
        openGraph={{
          url: "https://tobeit.it.kmitl.ac.th",
          title: "ค่าย ToBeIT'67",
          description:
            "กิจกรรมที่จะพาน้องๆ ผ่านกิจกรรมการเรียนรู้ผ่านบนโลกออนไลน์และภายในคณะไอที เพื่อเสริมความรู้วิชาการเทคโนโลยีสารสนเทศให้แก่สังคม",
          images: [
            {
              url: "/assets/tobe-logo.svg",
              width: 327,
              height: 327,
              alt: "ToBeIT Logo",
              type: "image/svg",
            },
          ],
        }}
      />
      <div className="p-4 lg:pt-8 container lg:w-3/5 mx-auto flex flex-col items-start justify-start min-h-screen gap-4">
        <div className="w-full flex flex-row items-center">
          <Link passHref href="/blog">
            <a>
              <ChevronLeft size={38} strokeWidth={1} color="orange" />
            </a>
          </Link>
          <div className="max-w-full text-glossy-coral font-chonburi">
            <h3 className="text-2xl font-bold">{title}</h3>
            <h6>โดย {author}</h6>
          </div>
        </div>
        <hr className="border-black w-full mx-auto" />
        <div className="prose lg:prose-xl font-noto min-w-full flex flex-col items-center relative">
          <ReactMarkdown className="w-full ">{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

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
`;

  try {
    const { data } = await client.query({
      query,
    });

    const propsData = data.blog.data.attributes;

    return {
      props: {
        description: propsData.description,
        title: propsData.title,
        author: propsData.author,
        content: propsData.content,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      notFound: true,
    };
  }
};

export default BlogSlugPage;
