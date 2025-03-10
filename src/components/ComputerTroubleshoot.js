import React, { useState } from 'react';
import '../styles/NetworkTroubleshoot.css'; // נשתמש באותם סגנונות
import { API_BASE_URL } from '../config/api';

const questions = {
  start: {
    id: 'start',
    text: '?האם המחשב נדלק',
    options: {
      yes: 'checkPowerConnection',
      no: 'checkElectricity'
    }
  },
  checkElectricity: {
    id: 'checkElectricity',
    text: '?האם המחשב מחובר לחשמל',
    options: {
      yes: 'success',
      no: 'checkPowerConnection'
    }
  },
  checkPowerConnection: {
    id: 'checkPowerConnection',
    text: 'אנא חבר את המחשב לחשמל',
    options: {
      working: 'success',
      notWorking: 'openTicket'
    },
    buttons: [
      { text: 'חיבור עובד', value: 'working' },
      { text: 'חיבור אך עדיין לא עובד', value: 'notWorking' }
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

function ComputerTroubleshoot({ onOpenTicket, onBack }) {
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
        <h2 className="main-title">פתרון תקלת מחשוב</h2>
        
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

export default ComputerTroubleshoot; 