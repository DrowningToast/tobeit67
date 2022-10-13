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
    <div className="w-full px-8 my-16 flex flex-col justify-center items-center gap-y-6 md:gap-y-10 md:w-full md:max-w-[1440px]">
      <h1 className="font-chonburi text-3xl md:text-6xl text-center text-white">
        ภาพกิจกรรม
      </h1>
      <Carousel
        withControls
        controlSize={64}
        className="rounded-xl w-full max-w-lg md:max-w-xl lg:max-w-3xl"
        align={"center"}
        slideGap={"lg"}
        withIndicators
        classNames={{
          indicator: "bg-white",
          control: "bg-white hidden md:flex",
        }}
      >
        {carouselPictures.map((picture, index) => (
          <Carousel.Slide key={index} className="rounded-xl w-full">
            <Image
              {...picture}
              layout="responsive"
              className="rounded-xl w-full"
              width={1152}
              height={864}
              priority={true}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Compilation;
