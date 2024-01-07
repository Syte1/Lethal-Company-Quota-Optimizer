function TutorialModal({ isVisible, onClose, gifUrl }) {
  if (!isVisible) return null;

  return (
      <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      >
          <img 
              src={gifUrl} 
              alt="Tutorial" 
              className="max-w-90p max-h-90p"
          />
      </div>
  );
}

export default TutorialModal;
