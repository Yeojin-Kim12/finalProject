import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AccordionSection {
  title: string;
  items: string[];
}

interface AccordionMenuProps {
  sections: AccordionSection[];
  onItemSelect: (item: string) => void;
}

export default function AccordionMenu({ sections, onItemSelect }: AccordionMenuProps) {
  return (
    <Accordion type="multiple">
      {sections.map((section, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index} className={index > 0 ? 'mt-9' : ''}>
          <AccordionTrigger className="px-6 py-5 text-label-base font-bold text-static-default">
            {section.title}
          </AccordionTrigger>
          {section.items.map((item, itemIndex) => (
            <AccordionContent
              key={itemIndex}
              className="cursor-pointer text-label-sm font-normal text-static-default px-6 py-4"
              onClick={() => onItemSelect(item)} // Trigger onItemSelect when item is clicked
            >
              {item}
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
