/**
 * Accordion-II:
 * In Accordion, we built a functional accordion component that can 
 * expand/collapse each section's contents. However, building good UI 
 * components goes beyong functionality and we have to ensure our components
 * have great accessibility as well by adding the right ARIA roles, states,
 * and properties to the DOM elements.
 * 
 * Requirements:
 * The ARIA Authority Practice has a long list of guidelines for the ARIA
 * roles, states and properties to add the various elements of an accordion.
 * We should implement the following (improvised) guidelines for this
 * question:
 * a. The title of each accordion header is container in a <button> element.
 * b. If the accordion panel associated with an accordion header is visible,
 *    the header button element has 'aria-expanded' set to 'true'. If the
 *    panel is not visible, 'aria-expanded' is set to 'false'.
 * c. The accordion header button element has 'aria-controls' set to the ID
 *    of the element containing the accordion panel content.
 * d. Each 'region' and 'aria-labelledby' with a value that refers to the
 *    button that controls display of the panel.
*/

import Accordion from './Accordion';

export default function App() {
  return (
    <div className="wrapper">
      <Accordion
        sections={[
          {
            value: 'html',
            title: 'HTML',
            contents:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            title: 'CSS',
            contents:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            title: 'JavaScript',
            contents:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          },
        ]}
      />
    </div>
  );
}
