
import BaseFAQ, { FAQ } from './shared/BaseFAQ';

const faqs: FAQ[] = [
  {
    question: "What are named entities?",
    answer: "Named entities are real-world objects like people, organizations, locations, dates, and other proper nouns that can be identified in text. They help understand what or who a piece of content is about."
  },
  {
    question: "How is entity relevance calculated?",
    answer: "Entity relevance (salience) is calculated based on factors like mention frequency, position in the text, contextual importance, and relationships with other entities. Higher scores indicate more central entities to the content."
  },
  {
    question: "What entity types are recognized?",
    answer: "Our tool recognizes various entity types including people (PERSON), organizations (ORGANIZATION), locations (LOCATION), dates (DATE), and other miscellaneous entities. Each type is color-coded for easy identification."
  },
  {
    question: "How can I use entity analysis for SEO?",
    answer: "Entity analysis helps understand content topics, improve semantic SEO, identify key subjects for internal linking, and ensure proper coverage of related entities. This helps search engines better understand your content's context."
  },
  {
    question: "Can I analyze content in other languages?",
    answer: "Yes, our entity analyzer supports multiple languages and can identify entities across different languages. The tool automatically detects the content language and applies appropriate entity recognition models."
  }
];

export default function EntityFAQ() {
  return <BaseFAQ faqs={faqs} />;
}
