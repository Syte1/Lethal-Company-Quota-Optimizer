import Spinner from "./Spinner";
const ControlPanel = ({ onOptimize, onRemoveHighlighted, onClearData, result, isLoading }) => {
    return (
        <div className="flex justify-between flex-nowrap">
            <button
                className="bg-blue-500 text-sm sm:text-base py-2 px-2 sm:px-4 rounded transform transition duration-150 ease-in-out active:scale-75 mt-2"
                onClick={onOptimize}
                disabled={isLoading}
            >
                {isLoading ? <Spinner /> : "Optimize"}
            </button>

            

            {result && result.selectedItems && (
                <button
                    className="bg-yellow-500 text-sm sm:text-base py-2 px-2 sm:px-4 rounded transform transition duration-150 ease-in-out active:scale-75 mt-2"
                    onClick={onRemoveHighlighted}
                >
                    Delete Highlighted Items
                </button>
            )}

            <button
                className="bg-red-500 text-sm sm:text-base py-2 px-2 sm:px-4 rounded transform transition duration-150 ease-in-out active:scale-75 mt-2"
                onClick={onClearData}
            >
                Clear List
            </button>
        </div>
    );
};

export default ControlPanel;
