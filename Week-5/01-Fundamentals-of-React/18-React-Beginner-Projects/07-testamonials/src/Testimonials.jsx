import { useState } from "react";
import "./App.css";

function Testimonials() {
  /**
   * 1. State:
   *    - currentIndex: number
   *    - testimonials: array of objects
  */
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      quote: "This is the best product I've ever used!",
      author: "Jane Doe",
    },
    {
      quote: "I highly recommend this product to everyone!",
      author: "John Smith",
    },
    {
      quote: "This product has completely changed my life!",
      author: "Bob Johnson",
    },
  ];

  /**
   * 2. Function:
   *    - handlePrevClick: function to handle the previous click
   *    - handleNextClick: function to handle the next click
  */

  const handlePrevClick = () => {
    setCurrentIndex(
      (currentIndex + testimonials.length - 1) % testimonials.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  /**
   * 3. Return:
   *    - return the testimonials component
   *      a. testimonials-quote
   *      b. testimonials-author
   *      c. testimonials-nav
  */
  return (
    <div className="testimonials">
      <div className="testimonials-quote">
        {testimonials[currentIndex].quote}
      </div>
      <div className="testimonials-author">
        - {testimonials[currentIndex].author}
      </div>
      <div className="testimonials-nav">
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}

export default Testimonials;
