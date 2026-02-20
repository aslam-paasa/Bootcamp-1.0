/**
 * Tabs:
 * Build a tabs component that displays one panel of a content at a time
 * depending on the active tab element. 
 * 
 * Requirements:
 * 1. Clicking on a tab makes it the active tab. Add a visual indication
 *    (e.g., using blue text color) for the active tab to differentiate it
 *    from the non-active tabs.
 * 2. At all times, only one panel's content should be displayed - the one
 *    corresponding to the active tab's.
*/

import Tabs from './Tabs';

export default function App() {
  return (
    <div className="wrapper">
      <Tabs
        items={[
          {
            value: 'html',
            label: 'HTML',
            panel:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            label: 'CSS',
            panel:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            label: 'JavaScript',
            panel:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          },
        ]}
      />
    </div>
  );
}
