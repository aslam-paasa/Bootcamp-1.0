/**
 * Accordion-III:
 * This is an adavanced version of Accordion-II, you should complete that
 * question first before attempting this question.
 * 
 * In Accordion-II, we built a functional accordion component that has the
 * necessary WAI-ARIA roles, states and properties, which is actually pretty
 * accessible. However, we can go one step further and add some optional
 * keyboard interactions.
 * 
 * Requirements:
 * We'll be followed a modified subset of the necessary keyboard interactions
 * for accordions:
 * 1. When Enter or Space is hit and focus is on the accordion header:
 *    a. For a collapsed panel, expands the associated panel.
 *    b. For an expanded panel, collapses the associated panel.
 * 2. Tab: Moves focus to the next focusable element; all focusable elements
 *    in the accordion are included in the page 'Tab' sequence.
 * 3. Shift + Tab: Moves focus to the previous focusable element; all focusable
 *    elements in teh accordion are included in the page Tab sequence.
 * 4. Down Arrow: If focus is on an accordion header, moves focus to the next
 *    header. If focus is on the last accordion header, either does nothing
 *    or moves focus to the first accordion header. 
 * 5. Up Arrow: If focus is on an accordion header, moves focus to the 
 *    previous accordion header. If focus is on the first accordion header, 
 *    either does nothing or moves focus to the last accordion header.
 * 6. Home: When focus is on an accordion header, moves focus to the first 
 *    accordion header.
 * 7. End: When focus is on an accordion header, moves focus to the last 
 *    accordion header.
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
