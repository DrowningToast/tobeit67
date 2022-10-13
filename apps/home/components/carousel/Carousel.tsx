import { Carousel } from "@mantine/carousel";
import Image from "next/image";

const carouselPictures = [
  {
    src: "/assets/carousel/P6180043.png",
  },
  {
    src: "/assets/carousel/IMG_0326.png",
  },
  {
    src: "/assets/carousel/IMG_7392.png",
  },
  {
    src: "/assets/carousel/P6180343.JPG",
  },
  {
    src: "/assets/carousel/IMG_7357.png",
  },
  {
    src: "/assets/carousel/P6180299.JPG",
  },
];

const Compilation: React.FC = () => {
  return (
    <div className="px-8 my-16 flex flex-col gap-y-6 md:gap-y-10 md:w-full md:max-w-[1440px]">
      <h1 className="font-chonburi text-3xl md:text-6xl text-center text-radial">
        ภาพกิจกรรมปีที่แล้ว
      </h1>
      <Carousel
        // sx={{ maxWidth: 320 }}
        withControls
        controlSize={64}
        className="rounded-xl w-full max-w-xs md:max-w-none"
        align={"center"}
        slideGap={"lg"}
        withIndicators
        classNames={{
          indicator: "bg-white",
          control: "bg-white",
        }}
      >
        {carouselPictures.map((picture, index) => (
          <Carousel.Slide key={index} className="rounded-xl w-full">
            <Image
              {...picture}
              layout="responsive"
              className="rounded-xl w-full"
              width={4608}
              height={3456}
              priority
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Compilation;
