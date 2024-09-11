import CustomFilterToggleList from '@/components/CustomFilterToggleList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import createToggleIcons from '@/constants/keywordIconMap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PropertySearch = () => {
  const location = useLocation();
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const { toggleIcon1, toggleIcon2, toggleIcon3, toggleIcon4 } = createToggleIcons();

  const handleToggle = (title: string) => {
    setActiveItems((prevState) =>
      prevState.includes(title) ? prevState.filter((item) => item !== title) : [...prevState, title],
    );
  };
  return (
    <div className="max-w-[1200px] m-auto">
      <Tabs defaultValue={location.state?.keyword || 'propertyType'}>
        <TabsList className="mb-[3px]">
          <TabsTrigger value="propertyType">분양유형</TabsTrigger>
          <TabsTrigger value="salesType">분양형태</TabsTrigger>
          <TabsTrigger value="benefit">혜택</TabsTrigger>
          <TabsTrigger value="infra">인프라</TabsTrigger>
        </TabsList>
        <TabsContent value="propertyType">
          <CustomFilterToggleList list={toggleIcon3} onToggle={handleToggle} activeItems={activeItems} />
        </TabsContent>
        <TabsContent value="salesType">
          <CustomFilterToggleList list={toggleIcon4} onToggle={handleToggle} activeItems={activeItems} />
        </TabsContent>
        <TabsContent value="benefit">
          <CustomFilterToggleList list={toggleIcon1} onToggle={handleToggle} activeItems={activeItems} />
        </TabsContent>
        <TabsContent value="infra">
          <CustomFilterToggleList list={toggleIcon2} onToggle={handleToggle} activeItems={activeItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertySearch;
