interface InputProps {
    placeholder: string;
    onRef?: (el: HTMLInputElement | null) => void;
}

export function Input({ placeholder, onRef }: InputProps) {
    return (
        <div>
            <input ref={onRef} placeholder={placeholder} type={"text"} className="px-4 py-2 m-2 border rounded" />
        </div>
    )
}