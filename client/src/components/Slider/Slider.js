import React, { useEffect } from 'react';
import SliderImage from './SliderImage';

const Slider = ({ slides, subtitle }) => {
  useEffect(() => {
    const sliders = document.querySelectorAll('.slider');
    window.M.Slider.init(sliders, {originalHeight: true});
    const slides = document.querySelectorAll('.materialboxed');
    window.M.Materialbox.init(slides, {});
  }, []);

  if (!slides || slides.length <= 0)
    return null;

  return (
    <div className="slider">
      <ul className="slides">
        {slides.map((slide, index) => (
          <SliderImage key={index} slide={slide} subtitle={subtitle} />
        ))}
      </ul>
    </div>
  )
};

export default Slider;