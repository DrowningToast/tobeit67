import { gql } from "@apollo/client";
import { Pagination } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeft } from "tabler-icons-react";
import BlogCard from "../../components/card/BlogCard";
import { client } from "../../gql/gql-client";

const endpoint =
  process.env.NODE_ENV.trim() == "development"
    ? process.env.NEXT_PUBLIC_CMS_DEV
    : process.env.NEXT_PUBLIC_CMS_PROD;

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
`;

type Blog = {
  id: string;
  title: string;
  description: string;
  picture: string;
  author: string;
  slug: string;
};

type Props = {
  data: Blog[] | null;

  totalPages: number;
  currentPage: number;
};

const BlogPage: NextPage<Props> = ({ data, totalPages, currentPage }) => {
  const router = useRouter();

  return (
    <div className="bg-[#4BB0B1] min-h-screen w-full">
      <NextSeo
        title="ToBeIT'67 | Blogs"
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
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-8 py-12">
        <div className="flex justify-center gap-y-4 items-center">
          <Link passHref href="/">
            <a>
              <ChevronLeft size={38} strokeWidth={1} color="white" />
            </a>
          </Link>
          <h2 className="font-noto text-3xl md:text-6xl font-bold text-white drop-shadow">
            เนื้อหาเพิ่มเติม
          </h2>
        </div>
        {data ? (
          <>
            <div className="w-full flex flex-col gap-4 items-center">
              {data.map((blog, index) => (
                <BlogCard {...blog} key={index} />
              ))}
            </div>
            <ul className="font-bold text-white font-chonburi flex flex-row gap-1 items-center">
              <Pagination
                className="text-white"
                classNames={{
                  item: "bg-orange-300",
                }}
                total={totalPages}
                page={currentPage}
                color="orange"
                onChange={(page) => router.push(`/blog?page=${page}`)}
              />
            </ul>
          </>
        ) : (
          <div className="text-white font-noto text-xl">
            <p>ตอนนี้ยังไม่มี Blog</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query: reqQuery,
}) => {
  const page = (reqQuery.page as string) || 1;

  const { data } = await client.query({
    query: query(page),
  });

  if (data.blogs.data.length == 0) {
    return {
      props: {
        data: null,
        totalPages: data.blogs.meta.pagination.pageCount,
        currentPage: Number(page),
      },
    };
  }

  const returnData: any[] = data.blogs.data.map((blog: any) => {
    const propsData = blog.attributes;

    let picture = "/assets/carousel/IMG_0326.png";

    if (propsData.thumbnail.data) {
      picture = endpoint + propsData.thumbnail.data.attributes.url;
    }

    return {
      id: blog.id,
      picture,
      description: propsData.description,
      title: propsData.title,
      author: propsData.author,
      content: propsData.content,
    };
  });

  return {
    props: {
      data: returnData,
      totalPages: data.blogs.meta.pagination.pageCount,
      currentPage: Number(page),
    },
  };
};

export default BlogPage;
