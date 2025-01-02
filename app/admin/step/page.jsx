"use client";
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { toast } from "react-toastify";

const StepsComponent = () => {
    const [keyValuePairs, setKeyValuePairs] = useState({});
    const [selectedKey, setSelectedKey] = useState(null); // State for selected key
    const [stepData, setStepData] = useState();
    const [stepError, setStepError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stepType = "STAFF"; // Changed from "STUDENT" to "STAFF" or another relevant type
                const url = new URL("/api/steps");
                url.searchParams.append("stepType", stepType);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const updatedData = data.map((user) => ({
                    ...user,
                    id: user._id,
                }));
                setStepData(data);
            } catch (error) {
                setStepError(error);
            }
        };

        fetchData(); // Fetch data once when component mounts
    }, []);

    // Render loading state
    if (!stepData && !stepError) {
        return <p>Loading...</p>;
    }

    const addItem = (key, value) => {
        keyValuePairs[key].push(value);

        if (key !== value && key !== "Select a Step") {
            setKeyValuePairs(prevKeyValuePairs => {
                const updatedPairs = { ...prevKeyValuePairs };
                updatedPairs[key] = [...(updatedPairs[key] || []), value];
                return updatedPairs;
            });
        }
    };

    const removeItem = (key, value) => {
        keyValuePairs[key].pop(value);
        setKeyValuePairs(prevKeyValuePairs => {
            const updatedPairs = { ...prevKeyValuePairs };
            updatedPairs[key] = updatedPairs[key].filter(item => item !== value);
            return updatedPairs;
        });
    };

    const modifySteps = async (key, value) => {
        try {
            const response = await fetch("/api/steps", {
                method: "PATCH",
                body: JSON.stringify({
                    key,
                    value,
                    // stepType: "STAFF" // Ensure this is not hardcoded as "STUDENT"
                }),
            });
            if (response.ok) {
                toast.success("Steps updated successfully!");
            } else {
                console.error("Failed to update steps");
            }
        } catch (error) {
            console.error("Error updating steps:", error);
        }
    };

    const keys = Object.keys(keyValuePairs);

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
                    <h3 className="font-medium text-black dark:text-white"></h3>
                </div>
                <div className="p-4 sm:p-6 xl:p-10">
                    <div className="relative mb-50 inline-block">
                        <select
                            className="ml-7 bg-black text-black inline-flex items-center gap-2.5 rounded-md dark:bg-boxdark px-5.5 py-3 font-medium dark:border-strokedark dark:text-white"
                            value={selectedKey}
                            onChange={(e) => setSelectedKey(e.target.value)}
                        >
                            <option value={null}>Select a Step</option>
                            {stepData.map((data, key) => (
                                <option key={key} value={data.name}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex flex-col gap-15 md:flex-row">
                            {/* List of available values to add (Right Box - Minus) */}
                            <div className="mt-5">
                                <ul className="pl-5 py-3">
                                    {Object.entries(keyValuePairs).map(([key, value]) => (
                                        (key !== selectedKey && !keyValuePairs[selectedKey]?.includes(key)) && (
                                            <div key={key}>
                                                <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3">
                                                    <div className="justify-center">{key}</div>
                                                    <button className="flex flex-1 justify-end" onClick={() => addItem(selectedKey, key)}>
                                                        <AddIcon />
                                                    </button>
                                                </li>
                                            </div>
                                        )
                                    ))}
                                </ul>
                            </div>
                            {/* List of selected values to remove (Left Box - Minus) */}
                            <div className="mt-5">
                                <ul className="pl-5 py-3">
                                    {keyValuePairs[selectedKey]?.map((value) => (
                                        <li className="relative w-1/1.5 flex space-x-3 border rounded p-2 bg-gray-100 mb-5 mr-3" key={value}>
                                            <button className="flex flex-1 justify-start" onClick={() => removeItem(selectedKey, value)}>
                                                <HorizontalRuleIcon />
                                            </button>
                                            <div className="justify-center">{value}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-full px-1">
                            <button
                                onClick={() => modifySteps(selectedKey, keyValuePairs[selectedKey])}
                                className="ml-5 block w-60 rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepsComponent;