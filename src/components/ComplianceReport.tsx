import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ComplianceService } from "../services/ComplianceService";

const ComplianceReport: React.FC = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    const reportData = await ComplianceService.generateComplianceReport();
    setReport(reportData);
    setLoading(false);
  };

  return (
    <div>
      <h1>Compliance Report</h1>
      <Button onClick={generateReport} disabled={loading}>
        {loading ? "Generating..." : "Generate Report"}
      </Button>
      {report && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(report).map(([field, value], index) => (
              <tr key={index}>
                <td>{field}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ComplianceReport;
