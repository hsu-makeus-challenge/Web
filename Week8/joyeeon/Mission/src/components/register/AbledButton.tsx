interface AbledButtonProps {
    label :string;
    disabled?:boolean;
    onClick?:() =>void;
    className?:string;
    type?:"button" | "submit" | "reset";
}

const AbledButton = ({label, disabled = false, onClick, className = "" , type = "button", }: AbledButtonProps) =>{
    return(
        <button type={type} className={`btn mt-5 ${disabled ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-sky-300 cursor-pointer'}`}
                disabled={disabled}
                onClick={type === "submit" ? undefined : onClick}
                >
                {label}
        </button>
    )
}

export default AbledButton;