import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Checkbox, Typography, Divider } from 'antd';
import { ReloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const SalaryForm = ({ onCalculate }) => {

    const [basicSalary, setBasicSalary] = useState(0);
    const [earnings, setEarnings] = useState([]);
    const [deductions, setDeductions] = useState([]);

    useEffect(() => {
        onCalculate(basicSalary, earnings, deductions);
    }, [basicSalary, earnings, deductions, onCalculate]);

    const handleBasicSalaryChange = (e) => {
        setBasicSalary(Number(e.target.value));
    };

    const handleEarningChange = (index, field, value) => {
        const newEarnings = [...earnings];
        newEarnings[index][field] = field === 'epf' ? !newEarnings[index][field] : value;
        setEarnings(newEarnings);
    };

    const handleDeductionChange = (index, field, value) => {
        const newDeductions = [...deductions];
        newDeductions[index][field] = value;
        setDeductions(newDeductions);
    };

    const addEarning = () => setEarnings([...earnings, { title: '', amount: 0, epf: false }]);
    const addDeduction = () => setDeductions([...deductions, { title: '', amount: 0 }]);

    const deleteEarning = (index) => {
        const newEarnings = earnings.filter((_, i) => i !== index);
        setEarnings(newEarnings);
    };

    const deleteDeduction = (index) => {
        const newDeductions = deductions.filter((_, i) => i !== index);
        setDeductions(newDeductions);
    };

    const resetForm = () => {
        setBasicSalary(0);
        setEarnings([]);
        setDeductions([]);
    };

    return (
        <Card title={<Title level={3}>Calculate Your Salary</Title>}
              extra={<Button icon={<ReloadOutlined/>} onClick={resetForm}>Reset</Button>}
              style={{maxWidth: '680px', maxHeight: '890px',margin: "auto", left: '128px', backgroundColor: 'rgba(224, 224, 224, 1)'}}>



            <Text strong>Basic Salary</Text><br/>
            <Input
                type="number"
                value={basicSalary}
                onChange={handleBasicSalaryChange}
                style={{width: '50%', MozAppearance: 'textfield' }}
            />


            <Divider/>


            <Title level={4}>Earnings</Title>
            <Text type="secondary">Allowance, Fixed Allowance, Bonus and etc.</Text>
            {earnings.map((earning, index) => (
                <Space key={index} direction="horizontal" size="middle"
                       style={{display: 'flex', marginTop: '10px'}}>
                    <Input
                        type="text"
                        placeholder="Pay Details (Title)"
                        value={earning.title}
                        onChange={(e) => handleEarningChange(index, 'title', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={earning.amount}
                        onChange={(e) => handleEarningChange(index, 'amount', Number(e.target.value))}
                    />
                    <Checkbox
                        checked={earning.epf}
                        onChange={() => handleEarningChange(index, 'epf')}
                    >
                        EPF/ETF
                    </Checkbox>
                    <Button danger icon={<DeleteOutlined/>} onClick={() => deleteEarning(index)}/>
                </Space>
            ))}
            <Button type="dashed" icon={<PlusOutlined/>} onClick={addEarning} style={{marginTop: '10px'}}>
                Add New Allowance
            </Button>


            <Divider/>


            <Title level={4}>Deductions</Title>
            <Text type="secondary">Salary Advances, Loan Deductions and all.</Text>
            {deductions.map((deduction, index) => (
                <Space key={index} direction="horizontal" size="middle"
                       style={{display: 'flex', marginTop: '10px'}}>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={deduction.title}
                        onChange={(e) => handleDeductionChange(index, 'title', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={deduction.amount}
                        onChange={(e) => handleDeductionChange(index, 'amount', Number(e.target.value))}
                    />
                    <Button danger icon={<DeleteOutlined/>} onClick={() => deleteDeduction(index)}/>
                </Space>
            ))}
            <Button type="dashed" icon={<PlusOutlined/>} onClick={addDeduction} style={{marginTop: '10px'}}>
                Add New Deduction
            </Button>

            {/*</Space>*/}
        </Card>


    );

};

export default SalaryForm;




