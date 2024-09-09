import { Check, Plus } from '@phosphor-icons/react';
import { KeywordBadge } from '../ui/KeywordBadge';
import { ToggleButton } from '../ui/ToggleButton';
interface KeywordToggleItemProps {
  variant: 'primary' | 'accent' | 'default' | 'assistive';
  label: string;
  isSelected: boolean;
  badgeNumber?: number | null;
  onClick: () => void;
}
const KeywordToggleItem = ({ variant, label, isSelected, badgeNumber, onClick }: KeywordToggleItemProps) => {
  const badgeIcon = isSelected ? <Check size={20} weight="bold" /> : <Plus size={20} weight="bold" />;
  return (
    <ToggleButton variant={variant} onClick={onClick}>
      {label}
      {badgeNumber ? (
        <KeywordBadge variant={variant}>{badgeNumber}</KeywordBadge>
      ) : (
        <KeywordBadge variant={variant}>{badgeIcon}</KeywordBadge>
      )}
    </ToggleButton>
  );
};

export default KeywordToggleItem;
