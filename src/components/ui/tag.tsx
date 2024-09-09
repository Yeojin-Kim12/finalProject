import { X } from '@phosphor-icons/react';
interface TagProps {
  label: string;
  onClick?: () => void;
}
const Tag = ({ label, onClick }: TagProps) => {
  return (
    <div className="w-fit flex items-center justify-center gap-3 px-6 py-3 rounded-10 bg-assistive-base text-assistive-default">
      <span className="text-label-lg text-static-default">{label}</span>
      <X size={20} onClick={onClick} weight="bold" className="cursor-pointer" />
    </div>
  );
};
Tag.displayName = 'Tag';
export { Tag };
