import Accordion from "./Accordion";
import { accordionData } from "./utils/content";

const App = () => {

  /**
   * 1. Return:
   *    - return the accordion component with the accordion data
   *      a. title
   *      b. content
   */
  return (
    <div>
      <div className="accordion">
        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}
      </div>
    </div>
  );
};

export default App;