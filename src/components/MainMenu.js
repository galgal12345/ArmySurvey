import React from 'react';
import '../styles/MainMenu.css';

function MainMenu({ onOpenTicket, onNetworkIssue, onComputerIssue, onPrinterIssue }) {
  return (
    <div className="page-content">
      <div className="header">
        <h1 className="main-title">פלחי"ק 358 - מערכת פתירת תקלות מחשוב</h1>
        <p className="subtitle">אנא בחר את סוג התקלה הרלוונטית עבורך, המערכת תנחה אותך בתהליך הפתרון</p>
      </div>
      
      <div className="buttons-container">
        <div className="button-wrapper">
          <button className="menu-button" onClick={onPrinterIssue}>תקלת מדפסות</button>
          <p className="button-description">מעבר לרצף שאלות בנושא מדפסות</p>
        </div>

        <div className="button-wrapper">
          <button className="menu-button" onClick={onComputerIssue}>תקלת מחשוב</button>
          <p className="button-description">מעבר לרצף שאלות בנושא מחשב</p>
        </div>

        <div className="button-wrapper">
          <button className="menu-button" onClick={onNetworkIssue}>תקלת רשת</button>
          <p className="button-description">מעבר לרצף שאלות בנושא רשת</p>
        </div>

        <div className="button-wrapper">
          <button className="menu-button" onClick={onOpenTicket}>פתיחת פנייה</button>
          <p className="button-description">מעבר למסך פתיחת תקלה</p>
        </div>
      </div>
    </div>
  );
}

export default MainMenu; 