const QuotaInput = ({ quota, setQuota }) => {
    const handleQuotaChange = (e) => {
        const quotaValue = parseFloat(e.target.value);
        setQuota(quotaValue);
    };

    return (
        <div className="mb-3 w-1/4"> {/* Adjust width here */}
            <label className="form-label text-white">Quota</label>
            <input
                type="number"
                className="w-full p-2 border-4 border-slate-900 rounded bg-gray-700 text-white"
                value={quota}
                onChange={handleQuotaChange}
                placeholder="Enter quota value"
            />
            <p className="text-xs text-gray-300">
                Enter the quota value here
            </p>
        </div>
    );
};

export default QuotaInput;