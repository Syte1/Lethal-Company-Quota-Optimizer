const TotalValueDisplay = ({ items }) => {
    const totalValue = items.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="text-center p-1 mt-3 mb-3 rounded bg-gray-700 border-4 border-slate-800 text-white">
            <h3 className="text-lg font-semibold">Total value of items: ${totalValue.toFixed(2)}</h3>
        </div>
    );
};

export default TotalValueDisplay;