import React, { useState } from 'react';
import '../styles/NetworkTroubleshoot.css'; // נשתמש באותם סגנונות
import { API_BASE_URL } from '../config/api';

const questions = {
  start: {
    id: 'start',
    text: '?האם המדפסת דלוקה',
    options: {
      yes: 'checkPaper',
      no: 'checkPowerConnection'
    }
  },
  checkPowerConnection: {
    id: 'checkPowerConnection',
    text: 'בדוק חיבור לחשמל ולחץ על כפתור ההדלקה',
    options: {
      working: 'success',
      notWorking: 'openTicket'
    },
    buttons: [
      { text: 'חיבור עובד', value: 'working' },
      { text: 'חיבור אך המדפסת עדיין לא עובדת', value: 'notWorking' }
    ]
  },
  checkPaper: {
    id: 'checkPaper',
    text: '?האם יש דפים במדפסת',
    options: {
      yes: 'checkInk',
      no: 'addPaper'
    }
  },
  addPaper: {
    id: 'addPaper',
    text: 'הכנס דפים למגירת המדפסת',
    options: {
      working: 'success',
      notWorking: 'openTicket'
    },
    buttons: [
      { text: 'המדפסת דפים', value: 'working' },
      { text: 'אין עדיין המדפסת לא מדפיסה', value: 'notWorking' }
    ]
  },
  checkInk: {
    id: 'checkInk',
    text: '?האם יש מספיק דיו במדפסת',
    options: {
      yes: 'checkConnection',
      no: 'openTicket'
    }
  },
  checkConnection: {
    id: 'checkConnection',
    text: '?האם המדפסת מחוברת לרשת או למחשב',
    options: {
      yes: 'success',
      no: 'checkConnectionType'
    }
  },
  checkConnectionType: {
    id: 'checkConnectionType',
    text: 'האם המדפסת מחוברת לרשת או למחשב?',
    options: {
      connected: 'success',
      notConnected: 'openTicket'
    },
    buttons: [
      { text: 'המדפסת מחוברת ועובדת', value: 'connected' },
      { text: 'המדפסת לא מחוברת או לא עובדת', value: 'notConnected' }
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

function PrinterTroubleshoot({ onOpenTicket, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState('start');
  const [showSuccess, setShowSuccess] = useState(false);
  const [responses, setResponses] = useState([]);

  const saveResponses = async (finalResponse) => {
    try {
      console.log('Attempting to save responses...');
      const allResponses = [
        ...responses,
        {
          question: questions[currentQuestion].text,
          answer: finalResponse,
          timestamp: new Date().toISOString()
        }
      ];

      const responseData = {
        type: 'printer_issue',
        path: allResponses.map(r => ({
          question: r.question,
          answer: r.answer,
          timestamp: r.timestamp
        })),
        final_status: finalResponse === 'openTicket' ? 'ticket_opened' : 'resolved'
      };

      console.log('Sending data:', responseData);
      
      const response = await fetch(`${API_BASE_URL}/api/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(responseData)
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      try {
        const data = JSON.parse(responseText);
        if (!response.ok) {
          console.error('Server error:', data);
          throw new Error(data.error || `Server responded with status: ${response.status}`);
        }
        console.log('Success:', data);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Server returned invalid JSON: ${responseText}`);
      }

    } catch (error) {
      console.error('Error saving responses:', error);
    }
  };

  const handleAnswer = async (answer) => {
    const current = questions[currentQuestion];
    const nextQuestion = current.options[answer];
    
    setResponses(prev => [...prev, {
      question: current.text,
      answer: answer,
      timestamp: new Date().toISOString()
    }]);
    
    if (nextQuestion) {
      if (questions[nextQuestion].type === 'result') {
        if (questions[nextQuestion].action === 'openTicket') {
          onOpenTicket(responses);
        } else {
          await saveResponses('success');
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
        <h2 className="main-title">פתרון תקלת מדפסת</h2>
        
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

export default PrinterTroubleshoot; 