/**
 * Build an accordion component that a displays a list of vertically stacked sections with each containing a title and content snippet
 */

import { useState } from "react";
import "./App.css";

export default function Accordion({ sections }) {
  const [openSections, setOpenSections] = useState(new Set());

  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);

        return (
          <div className="accordion-item" key={value}>
            <button
              className="accordion-item-title"
              type="button"
              onClick={() => {
                const newOpenSections = new Set(openSections);
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}
            >
              {title}
              <span
                aria-hidden={true}
                className={[
                  "accordion-icon",
                  isExpanded && "accordion-icon--rotated",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>
            <div className="accordion-item-contents" hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
