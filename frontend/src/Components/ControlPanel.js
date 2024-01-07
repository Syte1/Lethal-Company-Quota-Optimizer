const ControlPanel = ({ onOptimize, onRemoveHighlighted, onClearData, result }) => {
    return (
        <div className="flex flex-wrap justify-between">
            <div className="mt-2 sm:mt-0">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75"
                    onClick={onOptimize}
                >
                    Optimize
                </button>
            </div>

            {result && result.selectedItems && (
                <div className="mt-2 sm:mt-1">
                    <button
                        className="bg-amber-800 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75"
                        onClick={onRemoveHighlighted}
                    >
                        Delete Highlighted Items
                    </button>
                </div>
            )}

            <div className="mt-2 sm:mt-0">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75"
                    onClick={onClearData}
                >
                    Clear List
                </button>
            </div>
        </div>
    );
};

export default ControlPanel