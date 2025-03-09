import Item from "../components/Item";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Page = ({
  data,
  isBookmarked,
  category,
  isTrending,
  title,
  className,
  slidesPerView,
}) => {
  const [render, setRender] = useState(true);
  const filterData = (data, isBookmarked, category, isTrending) => {
    return data.filter(
      (item) =>
        (isBookmarked === undefined || item.isBookmarked === isBookmarked) &&
        (category === undefined || item.category === category) &&
        (isTrending === undefined || item.isTrending === isTrending)
    );
  };

  const filteredData = filterData(data, isBookmarked, category, isTrending);
  const handleBookmarkToggle = (item) => {
    item.isBookmarked = !item.isBookmarked;
    setRender(!render);
  };

  return (
    <>
      {isTrending ? (
        <div className="flex flex-col gap-[25px]">
          <h1 className="text-white font-outfit text-2xl font-normal leading-normal tracking[-0.5px]">
            {title}
          </h1>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            modules={[Pagination, Navigation]}
            className={className}
            slidesPerView={slidesPerView}
          >
            {filteredData.map((item, index) => (
              <SwiperSlide key={index} className="w-[300px]">
                <Item
                  src={
                    item.isTrending
                      ? item.thumbnail.trending.small
                      : item.thumbnail.regular.small
                  }
                  year={item.year}
                  category={item.category}
                  rating={item.rating}
                  title={item.title}
                  isTrending={item.isTrending}
                  onClick={() => handleBookmarkToggle(item)}
                  isBookmarked={item.isBookmarked}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-col gap-[25px]">
          <h1 className="text-white font-outfit text-2xl font-normal leading-normal tracking[-0.5px]">
            {title}
          </h1>
          <div className={className}>
            {filteredData.map((item, index) => (
              <>
                <Item
                  src={
                    item.isTrending
                      ? item.thumbnail.trending.small
                      : item.thumbnail.regular.small
                  }
                  key={index}
                  year={item.year}
                  category={item.category}
                  rating={item.rating}
                  title={item.title}
                  isTrending={item.isTrending}
                  onClick={() => handleBookmarkToggle(item)}
                  isBookmarked={item.isBookmarked}
                />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
