/**
 * Sidebar Component:
 * - It will contains sidebar items (component):
 *   a. Tweets Section
 *   b. Videos Section
 *   c. Documents Section
 *   d. Links Section
 *   e. Tags Section
*/

import { LogoIcon } from "../../icons/LogoIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return (
        <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-4 text-purple-600">
                    <LogoIcon />
                </div>
                    Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarItem text="Tweets" icon={<TwitterIcon />} />
                <SidebarItem text="Videos" icon={<YoutubeIcon />} />
            </div>
        </div>
    )
}