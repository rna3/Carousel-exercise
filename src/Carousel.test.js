import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function() {
  render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing"/>);
});

it("matches snapshot", function() {
  const testPhotos = [
    { src: "image1.jpg", caption: "Photo 1" },
    { src: "image2.jpg", caption: "Photo 2" }
  ];
  const { asFragment } = render(<Carousel photos={testPhotos} title="Test Carousel" />);

  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it("works when you click on the the left arrow", function (){
    const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the 3rd image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
});
