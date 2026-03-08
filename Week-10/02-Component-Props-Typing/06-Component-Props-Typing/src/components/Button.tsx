/**
 * Button Component with TypeScript Props
 * 
 * Props ka explanation:
 * 1. label (string type):
 *    - Button pe dikhne wala text
 *    - Example: "Click Me", "Submit", etc.
 * 
 * 2. onClick (function type): 
 *    - Button click hone par call hone wala function
 *    - () => void matlab ye function kuch return nahi karta
 * 
 * 3. disabled (boolean type):
 *    - Button enabled hai ya disabled
 *    - true = button disabled
 *    - false = button enabled
 * 
 * Do tarike se props define kar sakte hain:
 * 
 * Tarika 1 - Direct props object:
 * const Button = (props: {
 *   label: string;
 *   onClick: () => void;
 *   disabled: boolean;
 * })
 * 
 * Tarika 2 - Destructuring (niche use kiya hai):
 * Values direct use kar sakte hain props.label ki jagah label
*/

const Button = ({
    label,
    onClick, 
    disabled,
}: {
    label: string;
    onClick: () => void;
    disabled: boolean;
}) => {
    return (
        <div>
            <button onClick={onClick} disabled={disabled}>
                {label}
            </button>
        </div>
    );
};

export default Button;