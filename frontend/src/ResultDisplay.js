const ResultDisplay = ({ result }) => {
    if (!result) return null;

    return (
        <div className="text-center p-3 mt-3 rounded bg-green-700 text-white">
            {/* <div>
                <strong>Optimal Selection:</strong> 
                {" " + result.selectedItems.map(item => `${item.name} ($${item.value})`).join(', ')}
            </div> */}
            <div>
                <strong>Sell value:</strong> ${result.totalValue}
            </div>
        </div>
    );
};

export default ResultDisplay