import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const slides = [
  'http://via.placeholder.com/900x450',
  'http://via.placeholder.com/900x450',
  'http://via.placeholder.com/900x450',
];

const Slider = (props) => (
  <Carousel showThumbs={false} showStatus={false} {...props}>
    {slides.map((item, i) => (
      <div key={i}>
        <img src={item} />
      </div>
    ))}
  </Carousel>
);

export default Slider;
