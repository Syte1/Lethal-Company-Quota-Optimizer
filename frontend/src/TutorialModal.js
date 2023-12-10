function TutorialModal({ isVisible, onClose, gifUrl }) {
    if (!isVisible) return null;
  
    return (
      <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={gifUrl} alt="Tutorial" style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </div>
    );
  }
  
  export default TutorialModal