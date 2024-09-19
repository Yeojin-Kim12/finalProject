interface PageHeaderProps {
  title: string;
}
const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <h1 className="text-heading-lg font-bold px-6 py-3 mobile:py-5 mobile:text-heading-sm-m">{title}</h1>
  );
};

export default PageHeader;
