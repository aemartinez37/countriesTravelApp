import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ComplianceService } from "../services/ComplianceService";

const ComplianceDashboard: React.FC = () => {
  const [accessLogs, setAccessLogs] = useState([]);
  const [complianceStatus, setComplianceStatus] = useState("");

  useEffect(() => {
    // Fetch access logs and compliance status from the ComplianceService
    ComplianceService.getAccessLogs().then((logs) => setAccessLogs(logs));
    ComplianceService.getComplianceStatus().then((status) =>
      setComplianceStatus(status)
    );
  }, []);

  return (
    <div>
      <h1>Compliance Dashboard</h1>
      <h2>Compliance Status: {complianceStatus}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accessLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ComplianceDashboard;
