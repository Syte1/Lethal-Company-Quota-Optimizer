const ItemList = ({ items, onDeleteItem, result }) => {
    return (
        <ul className="flex mt-3 flex-col gap-2">
            {items.map((item, index) => {
                const isHighlighted = result && result.selectedItems.some(selectedItem => selectedItem.name === item.name);
                const itemClasses = `list-group-item transition-colors duration-300 ${isHighlighted ? 'border-4 border-green-900 bg-green-700' : 'border-4 border-slate-900 bg-gray-700 opacity-70'} text-white flex justify-between items-center rounded p-2`;

                return (
                    <li key={index} className={itemClasses}>
                        {item.name}: ${item.value}
                        <button
                            onClick={() => onDeleteItem(index)}
                            className="bg-red-500 text-white py-1 px-2 rounded text-xs transform transition duration-150 ease-in-out active:scale-75"
                        >
                            ✖
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default ItemList;
