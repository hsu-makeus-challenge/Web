interface LpPublishCheckboxProps {
  published: boolean;
  onPublishedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LpPublishCheckbox = ({
  published,
  onPublishedChange,
}: LpPublishCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="published"
        checked={published}
        onChange={onPublishedChange}
        className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded transition-colors duration-200"
      />
      <label
        htmlFor="published"
        className="block text-sm text-gray-300 select-none"
      >
        공개 여부
      </label>
    </div>
  );
};

export default LpPublishCheckbox;
