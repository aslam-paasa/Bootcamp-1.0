import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function InPageNavigaion({ teams, children }) {
  const [index, setIndex] = useState(0);

  let tabLineRef = useRef();
  let btnRef = useRef();

  function togleBtn(btn, i) {
    let { offsetWidth, offsetLeft } = btn;
    tabLineRef.current.style.width = offsetWidth + "px";
    tabLineRef.current.style.left = offsetLeft + "px";
    setIndex(i);
  }

  useEffect(() => {
    togleBtn(btnRef.current, 0);
  }, []);

  return (
    <div className="w-full ">
      {/* Tab Navigation = CSS + JS Logic */}
      <div
        className={
          "bg-blue-800 w-full  flex justify-between items-end " +
          (teams.length > 2 ? " h-[100px] " : "h-[50px]")
        }
      >
        {teams.length > 2
          ? teams.map(({ path, title }, i) => (
              <Link to={path} key={path || i}>
                <button
                  ref={i == 0 ? btnRef : null}
                  key={i}
                  className={
                    " mr-1 font-bold px-7 py-5 lg:px-16  text-sm hover:bg-gray-200/20 " +
                    (index == i
                      ? "text-white bg-gray-200/20 "
                      : " text-gray-200 ")
                  }
                  onClick={(e) => togleBtn(e.target, i)}
                >
                  {title}
                </button>
              </Link>
            ))
          : teams.map((data, i) => (
              <button
                ref={i == 0 ? btnRef : null}
                key={i}
                className={
                  "bg-black border border-gray-500  w-[50%] h-full   px-10 " +
                  (index == i ? "text-white " : " text-gray-400 ")
                }
                onClick={(e) => togleBtn(e.target, i)}
              >
                {data}
              </button>
            ))}
        {/**
         * b. Sliding Underline Effect - DOM Manipulation
         *    a. Create a box to hold the width and left of the button
         *       - const tabLineRef = useRef(null);
         *    b. Target the <hr> element (effect line)
         *       - ref={tabLineRef}
         *    c. Read & set the width and left of the box
         *       - const { offsetWidth, offsetLeft } = btn;
         *       - tabLineRef.current.style.width = offsetWidth + "px";
         *       - tabLineRef.current.style.left = offsetLeft + "px";
         *       - className="border-white absolute border-2 duration-300"
         *    d. The effect line will move smoothly to the clicked button
         * */}
        <hr
          ref={tabLineRef}
          className="border-white absolute border-2 duration-300"
        />
      </div>

      {teams.length > 2 ? "" : children[index]}
    </div>
  );
}

InPageNavigaion.propTypes = {
  teams: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
};

export default InPageNavigaion;
