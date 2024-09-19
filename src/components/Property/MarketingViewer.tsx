import useResponsive from '@/hooks/useResponsive';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '../ui/button';
import { CaretDown, CaretUp } from '@phosphor-icons/react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface MarketingViewerProps {
  marketingFiles: { name: string; url: string; type: string };
}

const MarketingViewer = ({ marketingFiles }: MarketingViewerProps) => {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [isExpanded, setIsExpanded] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <p className="text-title-2xl tablet:text-title-lg mobile:text-title-lg-m font-bold mb-3 mobile:mb-8">
        상세정보
      </p>
      <div>
        <div className="relative">
          <Document
            file={marketingFiles.url}
            onLoadError={console.error}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)} // 전체 페이지 수
          >
            <div
              className={`${isExpanded ? 'max-h-full' : isDesktop ? 'max-h-[300px]' : isTablet ? 'max-h-[194px]' : 'max-h-[88px]'} overflow-hidden`}>
              {numPages &&
                Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={isDesktop ? 1200 : isTablet ? 720 : 328}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))}
            </div>
          </Document>
          {!isExpanded && <div className="absolute top-0 left-0 w-full h-full white-gradient-overlay"></div>}
        </div>
      </div>
      <Button variant="assistive" size={isDesktop ? 'xl' : 'sm'} onClick={toggleExpansion} className="w-full">
        {isExpanded ? '상세정보 닫기' : '상세정보 더보기'}
        {isExpanded ? (
          <CaretUp size={isMobile ? 16 : 24} weight="bold" className="ml-4 text-assistive-strong" />
        ) : (
          <CaretDown size={isMobile ? 16 : 24} weight="bold" className="ml-4 text-assistive-strong" />
        )}
      </Button>
    </>
  );
};

export default MarketingViewer;
