import React from 'react';
import { Card, Divider, Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;

const SalarySummary = ({ basicSalary, earnings, deductions }) => {
    const totalEarnings = basicSalary + earnings.reduce((sum, earning) => sum + earning.amount, 0);
    // const totalEarningsForEPF = basicSalary + earnings.filter(earning => earning.epf).reduce((sum, earning) => sum + earning.amount, 0);
    const totalEarningsForEPF = basicSalary + earnings.filter(earning => earning.epf).reduce((sum, earning) => sum + earning.amount, 0);


    const grossDeduction = deductions.reduce((sum, deduction) => sum + deduction.amount, 0);

    const grossEarnings = totalEarnings - grossDeduction;


    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;

    const employeeEPF = totalEarningsForEPF * 0.08;
    const employerEPF = totalEarningsForEPF * 0.12;
    const employerETF = totalEarningsForEPF * 0.03;

    const apit = (grossEarnings * 0.18) - 25500;
    const netSalary = grossEarnings - employeeEPF - apit;

    const costToCompany = grossEarnings + employerEPF + employerETF;

    return (
        <Card
            title={<Title level={3}>Your Salary</Title>}
            style={{
                maxWidth: '500px',
                margin: 'auto',
                backgroundColor: 'rgba(224, 224, 224, 1)',
                padding: '20px',
                borderRadius: '10px',
            }}
        >
            <Row style={{ marginBottom: '20px' }}>
                <Col span={12}><Text strong>Items</Text></Col>
                <Col span={12}><Text strong>Amount</Text></Col>
            </Row>
            <Divider />
            <div style={{ marginBottom: '20px' }}>
                <Row>
                    <Col span={12}>Basic Salary:</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>{basicSalary.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col span={12}>Gross Earning:</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>{totalEarnings.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col span={12}>Gross Deduction:</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>- {grossDeduction.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col span={12}>Employee EPF (8%):</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>- {employeeEPF.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col span={12}>APIT:</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>- {apit.toFixed(2)}</Col>
                </Row>
                <Divider />
                <Card
                    bordered={true}
                    style={{ backgroundColor: 'rgba(224, 224, 224, 1)', borderColor: 'gray',height: '65px'}}
                >
                    <Row>
                        <Col span={12}><Text strong>Net Salary (Take Home):</Text></Col>
                        <Col span={12} style={{ textAlign: 'right' }}>{netSalary.toFixed(2)}</Col>
                    </Row>
                </Card>
            </div>
            <Divider />

                <Text style={{color: "Gray"}}>Contribution from the Employer</Text>
                <Row>
                    <Col span={12}>Employer EPF (12%):</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>{employerEPF.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col span={12}>Employer ETF (3%):</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>{employerETF.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col span={12}><Text strong>CTC (Cost to Company):</Text></Col>
                    <Col span={12} style={{ textAlign: 'right' }}>{costToCompany.toFixed(2)}</Col>
                </Row>

        </Card>
    );
};

export default SalarySummary;

