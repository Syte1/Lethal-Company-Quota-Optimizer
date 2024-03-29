import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import TutorialModal from './Components/TutorialModal';
import ItemForm from './Components/ItemForm';
import ItemList from './Components/ItemList';
import ControlPanel from './Components/ControlPanel';
import ConfirmationModal from './Components/ConfirmationModal';
import ResultDisplay from './Components/ResultDisplay';
import TotalValueDisplay from './Components/TotalValueDisplay';
import TutorialHint from './Components/TutorialHint';
import QuotaInput from './Components/QuotaInput';
import GitHubLink from './Components/GitHubLink';
import PortfolioLink from './Components/PortfolioLink';
// import animationGif from "./lethal-company-dance.gif";

function App() {
	// Initialize state with values from cookies or default to empty array / null
	const [items, setItems] = useState(() => {
		const savedItems = Cookies.get("items");
		return savedItems ? JSON.parse(savedItems) : [];
	});
	const [cost, setCost] = useState(() => {
		const savedCost = Cookies.get("cost");
		return savedCost ? parseFloat(savedCost) : 0;
	});
	const [result, setResult] = useState(null);

    const toggleTutorialModal = () => {
        if (!isTutorialVisible) {
          Cookies.set('hasClickedTutorial', 'true', { expires: 365 });
          setHasClickedTutorial(true);
        }
        setIsTutorialVisible(!isTutorialVisible);
      };
  
	const itemNameInputRef = useRef(null);
	const itemValueInputRef = useRef(null);

    const [hasClickedTutorial, setHasClickedTutorial] = useState(() => {
        return Cookies.get('hasClickedTutorial') === 'true';
      });
    const [isLoading, setIsLoading] = useState(false);
	const [isClearConfirmVisible, setIsClearConfirmVisible] = useState(false);
	const [newItemName, setNewItemName] = useState("");
	const [newItemValue, setNewItemValue] = useState("");
  	const [isTutorialVisible, setIsTutorialVisible] = useState(false);

    useEffect(() => {
        // Update cookies whenever items or cost change
        Cookies.set("items", JSON.stringify(items));
        Cookies.set("cost", cost);
    }, [items, cost]);


	const handleAddItem = (e) => {
		e.preventDefault();
		if (newItemValue) {
			const newItem = {
				name: newItemName || `Item ${items.length + 1}`,
				value: parseFloat(newItemValue),
			};
			setItems([...items, newItem]);
			setNewItemName("");
			setNewItemValue("");
			itemNameInputRef.current.focus();
		} else {
			alert("Please enter a value for the item.");
		}
	};

	const handleDeleteItem = (index) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
		setResult(null);
	};

	const handleSubmit = async () => {
		if (cost) {
			try {
                setIsLoading(true);
				const response = await axios.post(
					"https://lethal-company-quota-optimizer-backend.onrender.com/optimize",
					{ items: items, cost }
				);
				setResult(response.data);
                setIsLoading(false);
			} catch (error) {
				console.error("Error in optimization request", error);
                setIsLoading(false);
			}
		}
		else {
			alert("Please enter a quota value.")
		}

	};

    const handleClearData = () => {
        setIsClearConfirmVisible(true);
    };
	
    const confirmClearData = () => {
        Cookies.remove("items");
        Cookies.remove("cost");
        Cookies.remove("result");
        setItems([]);
        setCost(0);
        setResult(null);
        setIsClearConfirmVisible(false); // Close the modal after clearing
    };

	const cancelClearData = () => {
        setIsClearConfirmVisible(false); // Close the modal without clearing
    };

    const handleRemoveHighlightedItems = () => {
        if (result && result.selectedItems) {
            const highlightedNames = result.selectedItems.map(item => item.name);
            const remainingItems = items.filter(item => !highlightedNames.includes(item.name));
            setItems(remainingItems);
			setResult(null);
        }
    };

    return (
        <div className="min-h-screen  bg-cover bg-center"  style={{ background: "black" }}>
            <div className="container mx-auto max-w-xl p-4 text-white">
				<div className="flex justify-center items-center gap-5 opacity-30">
					<h1 className="text-center text-4xl mb-4">Belal's Quota Optimizer</h1>
                    <GitHubLink url="https://github.com/Syte1/Lethal-Company-Quota-Optimizer" />
                    <PortfolioLink url="https://syte1.github.io/" />
                </div>
                
                {!hasClickedTutorial && (
                    <TutorialHint onTutorialClick={toggleTutorialModal} />
                )}
                    <TutorialModal isVisible={isTutorialVisible} onClose={toggleTutorialModal} gifUrl="/Tutorial.gif" />
                <div className="text-center">
                    <button onClick={toggleTutorialModal} className="bg-blue-500 text-white py-2 px-4 rounded mb-3 transform transition duration-150 ease-in-out active:scale-75">Tutorial</button>
                </div>
                <ItemForm
                    onAddItem={handleAddItem}
                    newItemName={newItemName}
                    setNewItemName={setNewItemName}
                    newItemValue={newItemValue}
                    setNewItemValue={setNewItemValue}
                    itemNameInputRef={itemNameInputRef}
                    itemValueInputRef={itemValueInputRef}
                />
				<QuotaInput
                quota={cost}
                setQuota={setCost}
            	/>
				<TotalValueDisplay items={items} />
				
                <ControlPanel
                    onOptimize={handleSubmit}
                    onRemoveHighlighted={handleRemoveHighlightedItems}
                    onClearData={handleClearData}
                    result={result}
                    isLoading={isLoading}
                />

                <ItemList
                    items={items}
                    onDeleteItem={handleDeleteItem}
                    result={result}
                />

                <ConfirmationModal
                    isVisible={isClearConfirmVisible}
                    onConfirm={confirmClearData}
                    onCancel={cancelClearData}
                />

                {result && <ResultDisplay result={result} />}

            </div>
        </div>
    );
}

export default App;