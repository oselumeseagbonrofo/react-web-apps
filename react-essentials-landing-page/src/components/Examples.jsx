import { useState } from "react";
import { EXAMPLES } from "../data";
import TabButton from "./TabButton";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples() {
  const [concept, setConcept] = useState("");

  let selectedConcept = "Select a concept";
  if (concept) {
    selectedConcept = (
      <div id="tab-content">
        <h3>{EXAMPLES[concept].title}</h3>
        <p>{EXAMPLES[concept].description}</p>
        <pre>
          <code>{EXAMPLES[concept].code}</code>
        </pre>
      </div>
    );
  }

  const handleSelect = (selectedButton) => {
    console.log(`You have just clicked ${selectedButton}`);
    setConcept(selectedButton);
  };

  return (
    <Section title="Examples" id="examples">
      <Tabs
    //   ButtonsWrapper={"menu"} optional as default value set
        buttons={
          <>
              <TabButton
                isSelected={concept === "components"}
                onClick={() => handleSelect("components")}
              >
                Components
              </TabButton>
              <TabButton
                isSelected={concept === "jsx"}
                onClick={() => handleSelect("jsx")}
              >
                JSX
              </TabButton>
              <TabButton
                isSelected={concept === "props"}
                onClick={() => handleSelect("props")}
              >
                Props
              </TabButton>
              <TabButton
                isSelected={concept === "state"}
                onClick={() => handleSelect("state")}
              >
                State
              </TabButton>
          </>
        }
      >
        {selectedConcept}
      </Tabs>
    </Section>
  );
}
