import React from 'react';

const SliderImage = ({ slide, subtitle }) => {
  if (!slide)
    return null;

  return (
    <li className="slide">
      <img
        alt="View example"
        src={slide}
        className="materialboxed"
        data-caption={subtitle || ''}
      />
        {/*<div className="caption center-align">*/}
          {/*<h3>This is our big Tagline!</h3>*/}
          {/*<h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>*/}
        {/*</div>*/}
    </li>
  )
};

export default SliderImage;