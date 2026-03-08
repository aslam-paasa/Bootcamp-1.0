/**
 * Button Component:
 * - It will be used in the main page:
 *   a. Add Content
 *   b. Share Content
*/

import { ReactElement } from "react";

/**
 * Interface: Designing Shape of the buttons
 * It will contain:
 * a. variant  : Color of the button
 * b. text     : Text of the button
 * c. startIcon: Icon to be shown on the button (ReactElement)
 * d. onClick  : Function to be called when the button is clicked
*/
interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

/**
 * Custom Global Button Colors:
 * a. Primary Button
 * b. Secondary Button
*/
const variantClasses = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"

/**
 * Create the Button component with some styles:
 * a. Button Color: 
 *    - Primary or Secondary
 *    - Default Styles (padding, margin, border-radius)
*/
export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
    return (
        <button className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}`} onClick={onClick} disabled={loading}>
            <div className="pr-2">
                {startIcon}
            </div>
            {text}
        </button>
    )
}