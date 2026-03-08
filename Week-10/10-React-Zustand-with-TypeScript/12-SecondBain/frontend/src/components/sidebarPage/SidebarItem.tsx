import { ReactElement } from "react";


/**
 * Interface: Designing Sidebar Item
*/
interface SidebarItemProps {
    text: string;
    icon: ReactElement;
}

/**
 * SidebarItem Component:
 * a. icon: It will be the icon of the sidebar item.
 * b. text: It will be the text of the sidebar item.
*/
export function SidebarItem({ text, icon }: SidebarItemProps) {
    return (
        <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-56 pl-3 transition-all duration-100">
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}