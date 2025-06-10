import { ButtonHTMLAttributes, JSX } from "react";

interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SearchButton = ({ children, className = "", ...props }: SearchButtonProps): JSX.Element => (
  <button
    className={
      "w-full cursor-pointer px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

export default SearchButton;