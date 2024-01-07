const ItemForm = ({ onAddItem, newItemName, setNewItemName, newItemValue, setNewItemValue, itemNameInputRef, itemValueInputRef }) => {
    const handleItemNameKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
            itemValueInputRef.current.focus();
        }
    };

    const handleItemValueKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
            onAddItem(e);
            itemNameInputRef.current.focus();
        }
    };

    return (
        <form onSubmit={onAddItem} className="mb-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="form-label">
                        Item Name (optional)
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border-4 border-slate-900 rounded bg-gray-700 text-white"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onKeyDown={handleItemNameKeyDown}
                        ref={itemNameInputRef}
                        placeholder="Enter item name"
                    />
                    <p className="text-xs text-gray-300">
                        Pro Tip: Press Enter to move to the next field!
                    </p>
                </div>
                <div>
                    <label className="form-label">
                        Item Value
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border-4 border-slate-900 rounded bg-gray-700 text-white"
                        value={newItemValue}
                        onChange={(e) => setNewItemValue(e.target.value)}
                        onKeyDown={handleItemValueKeyDown}
                        ref={itemValueInputRef}
                        placeholder="Enter item value"
                    />
                    <p className="text-xs text-gray-300">
                        Pro Tip: Press Enter to add the item!
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 text-white py-2 px-4 rounded transform transition duration-150 ease-in-out active:scale-75 shadow-lg font-semibold"
                        type="submit"
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ItemForm;
