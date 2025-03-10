import { useState } from 'react';
import MainMenu from './components/MainMenu';
import TicketForm from './components/TicketForm';
import NetworkTroubleshoot from './components/NetworkTroubleshoot';
import ComputerTroubleshoot from './components/ComputerTroubleshoot';
import PrinterTroubleshoot from './components/PrinterTroubleshoot';
import './styles/App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [previousResponses, setPreviousResponses] = useState(null);

  const handleOpenTicket = (responses) => {
    setPreviousResponses(responses);
    setCurrentScreen('ticket');
  };

  const handleSubmitTicket = () => {
    alert('הטופס נשלח בהצלחה!');
    setCurrentScreen('main');
  };

  const handleBack = () => {
    setCurrentScreen('main');
  };

  const handleNetworkIssue = () => {
    setCurrentScreen('network');
  };

  const handleComputerIssue = () => {
    setCurrentScreen('computer');
  };

  const handlePrinterIssue = () => {
    setCurrentScreen('printer');
  };

  return (
    <div className="App">
      {currentScreen === 'main' && (
        <MainMenu 
          onOpenTicket={handleOpenTicket}
          onNetworkIssue={handleNetworkIssue}
          onComputerIssue={handleComputerIssue}
          onPrinterIssue={handlePrinterIssue}
        />
      )}
      {currentScreen === 'ticket' && (
        <TicketForm 
          previousResponses={previousResponses}
          onSubmit={handleSubmitTicket} 
          onBack={handleBack}
        />
      )}
      {currentScreen === 'network' && (
        <NetworkTroubleshoot 
          onOpenTicket={handleOpenTicket}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'computer' && (
        <ComputerTroubleshoot 
          onOpenTicket={handleOpenTicket}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'printer' && (
        <PrinterTroubleshoot 
          onOpenTicket={handleOpenTicket}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
