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
    src: "/assets/carousel/P6180043.png",
  },
  {
    src: "/assets/carousel/P6180343.JPG",
  },
];

const Compilation: React.FC = () => {
  return (
    <div className="px-8 my-16 flex flex-col gap-y-6">
      <h1 className="font-chonburi text-3xl md:text-6xl text-center text-radial">
        ภาพกิจกรรมปีที่แล้ว
      </h1>
      <Carousel
        // sx={{ maxWidth: 320 }}
        withControls
        slideGap={48}
        className="rounded-xl w-full max-w-xs md:max-w-4xl"
        mx="auto"
        withIndicators={true}
      >
        {carouselPictures.map((picture, index) => (
          <Carousel.Slide key={index} className="rounded-xl w-full">
            <Image
              {...picture}
              layout="responsive"
              className="rounded-xl w-full"
              width={4608}
              height={3456}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Compilation;
