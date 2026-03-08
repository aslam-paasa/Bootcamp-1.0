/**
 * When Use clicks on the "Add Content" button, the modal should open.
 * It will take two things:
 * 1. Title
 * 2. Link
 * Note: It is a state variable i.e. modal open or closed.
*/

import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";


const ContentType = {
    YOUTUBE: "youtube",
    TWITTER: "twitter"
}

/**
 * Controlled Component:
 * - Here, we are controlling the state of the modal by clicking on
 *   "Add Content" button.
 *   a. If we click on the "Add Content" button, then the modal will open.
 *   b. If we click on "CrossIcon", tell the parent component to set the
 *      "open" to false.
*/



export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.YOUTUBE);

    /**
     * When user clicks on the overlay, the modal should close.
     * 1. Take a full screen container.
     * 2. If user clicks on the overlay, then the modal should close.
     *    a. Take a container with white background.
     *    b. If user clicks on the overlay, then the modal should close.
     *    c. Take a container with white background.
    */
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    /**
     * Send content to the backend
    */
    const handleAddContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title, 
            type
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
        })
    }

    return (
        /**
         * 1. Take full screen container.
         * 2. If open, render UI modal on top of existing UI.
         *    a. Take a full screen container.
         *    b. Take a container with white background.
         *       - Cross Icon
         *       - Input for Title
         *       - Input for Link
        */
        <div>
            {open && (
                <div>

                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                    </div>

                    {/* Modal */}
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 flex justify-center" onClick={handleOverlayClick}>
                        <div className="flex flex-col justify-center">

                            <span className="bg-white opacity-100 p-4 rounded">
                                {/* Cross Icon */}
                                <div className="flex justify-end">
                                    <div className="cursor-pointer" onClick={onClose}>
                                        <CrossIcon />
                                    </div>
                                </div>

                                {/* Inputs & Submit Button */}
                                <div>
                                    <div>
                                        <Input placeholder="Title" onRef={titleRef} />
                                        <Input placeholder="Link" onRef={linkRef} />
                                    </div>
                                    <div>
                                        <h1>Type</h1>
                                        <div className="flex gap-1 justify-center pb-2">
                                            <Button text={'Youtube'} variant={type === ContentType.YOUTUBE ? "primary" : "secondary"} onClick={() => setType(ContentType.YOUTUBE)} />
                                            <Button text={'Twitter'} variant={type === ContentType.TWITTER ? "primary" : "secondary"} onClick={() => setType(ContentType.TWITTER)} />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <Button variant="primary" text="Submit" onClick={handleAddContent} />
                                    </div>
                                </div>

                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
