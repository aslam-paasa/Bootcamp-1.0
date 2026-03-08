import { useState, useEffect } from "react";

const Report = () => {
    const [data, setData] = useState({
        score: "",
        positives: [],
        negatives: [],
        analysis: ""
    });

    const extract = () => {
        let input = localStorage.getItem("input");

        /* check if exists */
        if (!input) {
            console.error("No data found in localStorage");
            return;
        }

        /* remove markdown formatting if exists */
        input = input.replace(/```json/g, '').replace(/```/g, "").trim();

        /* parse once */
        let parsed = JSON.parse(input);

        /* parse second time only if string */
        if (typeof parsed === "string") {
            parsed = JSON.parse(parsed);
        }

        setData({
            score: parsed.score || "",
            positives: parsed.positives || [],
            negatives: parsed.negatives || [],
            analysis: parsed.analysis || ""
        });
    };


    useEffect(() => {
        extract();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="bg-white shadow-lg rounded-2xl py-6 text-center border">
                    <h1 className="text-4xl font-bold text-blue-700">
                        AI Resume Report
                    </h1>
                </div>
            </div>


            {/* Score + Lists */}
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">

                {/* Score Card */}
                <div className="col-span-1 bg-white shadow-lg rounded-2xl flex flex-col justify-center items-center p-6 border">

                    <h2 className="text-lg font-semibold text-gray-600 mb-2">
                        Total Score
                    </h2>

                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-inner">

                        <span className="text-white text-4xl font-bold">
                            {data.score}/100
                        </span>

                    </div>

                </div>


                {/* Positives + Negatives */}
                <div className="col-span-2 bg-white shadow-lg rounded-2xl p-6 border flex flex-col gap-4">

                    {/* Positives */}
                    <div className="flex flex-col flex-1 min-h-0">

                        <h2 className="text-lg font-semibold text-blue-700 mb-2">
                            Positives
                        </h2>

                        <ul className="flex-1 overflow-auto space-y-2 pr-2">

                            {data?.positives.map((value, idx) => (
                                <li
                                    key={idx}
                                    className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                                >
                                    {value}
                                </li>
                            ))}

                        </ul>

                    </div>


                    {/* Negatives */}
                    <div className="flex flex-col flex-1 min-h-0">

                        <h2 className="text-lg font-semibold text-red-600 mb-2">
                            Improvements Needed
                        </h2>

                        <ul className="flex-1 overflow-auto space-y-2 pr-2">

                            {data?.negatives.map((value, idx) => (
                                <li
                                    key={idx}
                                    className="bg-red-50 border border-red-100 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                                >
                                    {value}
                                </li>
                            ))}

                        </ul>

                    </div>

                </div>

            </div>


            {/* Analysis Card */}
            <div className="max-w-5xl mx-auto mt-8">

                <div className="bg-white shadow-lg rounded-2xl p-6 border">

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Detailed Analysis
                    </h2>

                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {data.analysis}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Report;
