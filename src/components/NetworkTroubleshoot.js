import React, { useState } from 'react';
import '../styles/NetworkTroubleshoot.css';
import { API_BASE_URL } from '../config/api';

const questions = {
  start: {
    id: 'start',
    text: '?האם הכבל רשת מחובר למחשב ולקיר',
    options: {
      yes: 'checkIndicator',
      no: 'checkCableConnection'
    }
  },
  checkIndicator: {
    id: 'checkIndicator',
    text: '?האם מופיע חיווי חיבור תקין בשורת ה"התחל" בפינה הימנית',
    options: {
      yes: 'success',
      no: 'checkCableConnection'
    }
  },
  checkCableConnection: {
    id: 'checkCableConnection',
    text: 'בדוק חיבורי כבל רשת',
    options: {
      connected: 'success',
      notConnected: 'openTicket'
    },
    buttons: [
      { text: 'הכל מחובר תקין', value: 'connected' },
      { text: 'אין עדיין אין רשת', value: 'notConnected' }
    ]
  },
  success: {
    id: 'success',
    type: 'result',
    text: 'שמחנו לעזור מצוות פלחי"ק 358 😊'
  },
  openTicket: {
    id: 'openTicket',
    type: 'result',
    text: 'נפתח פניה למחלקת מחשוב',
    action: 'openTicket'
  }
};

function NetworkTroubleshoot({ onOpenTicket, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState('start');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswer = (answer) => {
    const current = questions[currentQuestion];
    const nextQuestion = current.options[answer];
    
    if (nextQuestion) {
      if (questions[nextQuestion].type === 'result') {
        if (questions[nextQuestion].action === 'openTicket') {
          onOpenTicket();
        } else {
          setShowSuccess(true);
          setCurrentQuestion(nextQuestion);
        }
      } else {
        setCurrentQuestion(nextQuestion);
      }
    }
  };

  const current = questions[currentQuestion];

  return (
    <div className="page-content">
      <div className="troubleshoot-container">
        <h2 className="main-title">פתרון תקלת רשת</h2>
        
        <div className="question-box">
          {!showSuccess ? (
            <>
              <p className="question-text">{current.text}</p>
              
              <div className="answer-buttons">
                {current.buttons ? (
                  current.buttons.map((button) => (
                    <button
                      key={button.value}
                      className="answer-button"
                      onClick={() => handleAnswer(button.value)}
                    >
                      {button.text}
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      className="answer-button"
                      onClick={() => handleAnswer('yes')}
                    >
                      כן
                    </button>
                    <button
                      className="answer-button"
                      onClick={() => handleAnswer('no')}
                    >
                      לא
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="success-container">
              <div className="success-message">
                <p className="success-text">{current.text}</p>
                <span className="success-emoji">😊</span>
              </div>
              <button className="back-button" onClick={onBack}>
                חזרה לתפריט הראשי
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NetworkTroubleshoot; 