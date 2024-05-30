import React, { useState } from 'react';
import SalaryForm from './components/salaryForm';
import SalarySummary from './components/salarySummary';
import './App.css';

const App = () => {
    const [salaryData, setSalaryData] = useState({
        basicSalary: 0,
        earnings: [],
        deductions: []
    });

    const handleCalculate = (basicSalary, earnings, deductions) => {
        setSalaryData({ basicSalary, earnings, deductions });
    };

    return (
        <div className="App">
            <div className="left-column">
                <SalaryForm onCalculate={handleCalculate} />
            </div>
            <div className="right-column">
                <SalarySummary
                    basicSalary={salaryData.basicSalary}
                    earnings={salaryData.earnings}
                    deductions={salaryData.deductions}
                />
            </div>
        </div>
    );
};


export default App;

