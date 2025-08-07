import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export type Props = {
  options: {
    label: string;
    value: string;
  }[];
  setItem: (valor: string) => void;
  className?: string;
};

export function RadioGroupSettings({ setItem, options, className }: Props) {
  return (
    <RadioGroup
      defaultValue="basicOnlyWords"
      onValueChange={(item) => setItem(item)}
      className={`${className}`}
    >
      {options.map((option, idx) => (
        <>
          <div className="flex items-center gap-2">
            <RadioGroupItem value={option.value} id={`r${idx}`} className="cursor-pointer" />
            <Label htmlFor={`r${idx}`} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
          <Separator />
        </>
      ))}
    </RadioGroup>
  );
}
