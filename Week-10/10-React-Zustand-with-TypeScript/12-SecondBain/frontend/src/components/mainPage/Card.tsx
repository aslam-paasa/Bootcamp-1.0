/**
 * In the main page, we will show cards for each content:
 * 1. Do the styles for the card first
 * 2. Fill the card with the content:
 *    - Card will contain:
 *      a. link
 *      b. title
 *      c. type (tweet, video, document, link)
 *      d. tags
 *      e. actions (edit, delete)
 * - Render the card in the main page, after the buttons
*/

import { NotebookIcon } from "../../icons/NotebookIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";


/**
 * Interface: Shape of the Card Component
*/
interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"; // currently only two types of link we support
}


export function Card({ title, link, type }: CardProps) {
    return (
        <div>
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-80 border min-h-72 min-w-80">

                {/* Card Content */}
                <div className="flex justify-between">
                    {/* a. First Child: Notebook Icon + Title */}
                    <div className="flex items-center text-md font-medium">
                        <div className="text-gray-500 pr-2">
                            <NotebookIcon />
                        </div>
                        {title}
                    </div>

                    {/* b. Second Child: Share Icon + Delete Icon */}
                    <div className="flex items-center gap-2">
                        <div className="pr-2 text-gray-500">
                            <a href={link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500">
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full aspect-video rounded-md"
                            src={link.replace("watch?v=", "embed/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    )}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    )
}