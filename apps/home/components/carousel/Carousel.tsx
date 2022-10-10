import { Carousel } from "@mantine/carousel";

const Compilation = () => {
  return (
    <div className="px-8 my-16 flex flex-col gap-y-6">
      <h1 className="font-chonburi text-3xl text-center text-radial">
        ภาพกิจกรรมปีที่แล้ว
      </h1>
      <Carousel
        sx={{ maxWidth: 320 }}
        className="bg-indigo-100 rounded-xl w-full"
        mx="auto"
        withIndicators
        height={200}
      >
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    </div>
  );
};

export default Compilation;
