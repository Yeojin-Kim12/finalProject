import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AccordionSection {
  title: string;
  items: { id: number; name: string }[];
}

interface AccordionMenuProps {
  sections: AccordionSection[];
  onItemSelect: (id: number) => void;
  selectedProperty: number | undefined;
}

export default function AccordionMenu({ sections, onItemSelect, selectedProperty }: AccordionMenuProps) {
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
              className={`px-6 py-4 cursor-pointer ${selectedProperty === item.id && 'bg-primary-base'}`}
              onClick={() => onItemSelect(item.id)}>
              <div className="cursor-pointer text-label-sm font-normal text-static-default">{item.name}</div>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
