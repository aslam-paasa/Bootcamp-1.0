import { CDN_URL } from "../utils/constants";

const RestaurantCategory = ({ title, items, showItems, setShowIndex }) => {

    const handleClick = () => {
        setShowIndex();
    }

    return (
        <div>
            {/* Accordion Header */}
            <div onClick={handleClick} className="flex justify-between items-center p-4 bg-slate-50 border-b mb-4 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-lg font-semibold text-gray-800">
                    {title} ({items.length})
                </div>
                <div>
                    {showItems ? (
                        <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>  
                        </button>
                    ) : (
                        <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    )}

                </div>
            </div>

            {/* Accordion Body */}
            {showItems && (
                <div className="border-b pb-8 last:border-0">
                    <div className="grid gap-6">
                        {items.map((item) => {
                            const info = item?.card?.info;
                            return (
                                <div key={info?.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex-1 pr-4">
                                        {/* 2.1.2.a. Item Name */}
                                        <h4 className="font-medium text-gray-800 mb-1">
                                            {info?.name}
                                        </h4>

                                        {/* 2.1.2.b. Item Price */}
                                        <div className="text-green-600 font-medium mb-2">
                                            ₹{info?.price / 100 || info?.defaultPrice / 100}
                                        </div>

                                        {/* 2.1.2.c. Item Description */}
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {info?.description}
                                        </p>
                                    </div>

                                    {/* 2.1.2.d. Item Image */}
                                    {info?.imageId && (
                                        <div className="w-28 h-28 flex-shrink-0 relative">
                                            <button className="p-2 bg-black text-white rounded-lg shadow-lg absolute m-auto top-18 cursor-pointer">Add +</button>
                                            <div className="w-28 h-28">
                                                <img
                                                    src={CDN_URL + info?.imageId}
                                                    alt={info?.name}
                                                    className="w-full h-full object-cover rounded-lg "
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RestaurantCategory
