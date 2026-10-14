export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent bg-[#24231f] px-4 py-2.5 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-[#49463e] focus:bg-[#49463e] focus:outline-none focus:ring-2 focus:ring-[#8d543f] focus:ring-offset-2 active:bg-[#39372f] ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}