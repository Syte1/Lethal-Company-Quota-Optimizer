const ResultDisplay = ({ result }) => {
    if (!result) return null;

    return (
        <div className="p-3 mt-3 rounded bg-green-700 text-white">
            <div>
                <strong>Optimal Selection:</strong> 
                {" " + result.selectedItems.map(item => `${item.name} ($${item.value})`).join(', ')}
            </div>
            <div>
                <strong>Total Value:</strong> ${result.totalValue}
            </div>
        </div>
    );
};

export default ResultDisplay