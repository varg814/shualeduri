import React from "react";
import Button from "./Button";

export default function Item({
  src,
  year,
  category,
  rating,
  title,
  isTrending,
  onClick,
  isBookmarked,
}) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Movie":
        return "../src/assets/icon-category-movie.svg";
      case "TV Series":
        return "../src/assets/icon-category-tv.svg";
      default:
        return null;
    }
  };

  const getBookmarkIcon = (isBookmarked) => {
    switch (isBookmarked) {
      case true:
        return "../src/assets/icon-bookmark-full.svg";
      case false:
        return "../src/assets/icon-bookmark-empty.svg";
      default:
        return null;
    }
  };

  return (
    <>
      {!isTrending ? (
        <div className="flex flex-col gap-[8px] w-full max-w-[280px]">
          <div className=" w-full max-w-[280px] max-h-[174px] relative">
            <img
              src={src}
              alt={`${title} thumbnail`}
              className="rounded-[8px] w-full h-full object-cover"
            />
          <Button
            style={{ backgroundImage: `url(${getBookmarkIcon(isBookmarked)})`,  backgroundColor: 'rgba(16, 20, 30, 0.5) '}}
            onClick={onClick}
            className="w-[32px] h-[32px] absolute top-4 right-6 bg-no-repeat bg-center rounded-[100%]"
          />
          </div>
          <div className="flex gap-[10px] items-center">
            <p className="text-white font-outfit text-xs font-normal leading-normal tracking-normal ligatures-none opacity-75">
              {year}
            </p>
            <div className="h-[2px] w-[2px] rounded bg-[#fff] opacity-75"></div>
            <div className="flex items-center gap-[5px]">
              <img
                src={getCategoryIcon(category)}
                alt={`${category} icon`}
                className="w-[12px] h-[12px]"
              />
              <p className="text-white font-outfit text-xs font-normal leading-normal tracking-normal ligatures-none opacity-75">
                {category}
              </p>
            </div>
            <div className="h-[2px] w-[2px] rounded bg-[#fff] opacity-75"></div>
            <p className="text-white font-outfit text-xs font-normal leading-normal tracking-normal ligatures-none opacity-75">
              {rating}
            </p>
          </div>
          <div>
            <h1 className="text-white font-outfit text-lg font-normal leading-normal ligatures-none">
              {title}
            </h1>
          </div>
        </div>
      ) : (
        <div
          className={`bg-cover py-4 px-6 flex justify-end flex-col gap-[8px] w-full max-w-[470px] max-h-[230px] h-[230px] relative rounded-[8px]`}
          style={{ backgroundImage: `url(${src})` }}
        >
          <Button
            style={{ backgroundImage: `url(${getBookmarkIcon(isBookmarked)})`,  backgroundColor: 'rgba(16, 20, 30, 0.5) '}}
            onClick={onClick}
            className="w-[32px] h-[32px] absolute top-4 right-6 bg-no-repeat bg-center rounded-[100%]"
          />

          <div className="flex gap-[10px] items-center">
            <p className="text-white font-outfit text-xs font-normal leading-normal tracking-normal ligatures-none opacity-75">
              {year}
            </p>
            <div className="h-[2px] w-[2px] rounded bg-[#fff] opacity-75"></div>
            <div className="flex items-center gap-[5px]">
              <img
                src={getCategoryIcon(category)}
                alt={`${category} icon`}
                className="w-[12px] h-[12px]"
              />
              <p className="text-white font-outfit text-xs font-normal leading-normal tracking-normal ligatures-none opacity-75">
                {category}
              </p>
            </div>
            <div className="h-[2px] w-[2px] rounded bg-[#fff] opacity-75"></div>
            <p className="text-white font-outfit text-xs font-normal leading-normal tracking-normal ligatures-none opacity-75">
              {rating}
            </p>
          </div>
          <div>
            <h1 className="text-white font-outfit text-lg font-normal leading-normal ligatures-none">
              {title}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}