interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

export const SelectBox = ({
  checked,
  onChange,
  label,
  id = 'checkbox',
  className,
}: SelectBoxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2 h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
      </label>
    </div>
  );
};
