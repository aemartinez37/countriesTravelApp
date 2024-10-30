import { Country } from "../types";

class ComplianceService {
  private accessLogs: { timestamp: string; user: string; action: string }[] = [];
  private complianceStatus: string = "Compliant";

  public logAccess(user: string, action: string) {
    const timestamp = new Date().toISOString();
    this.accessLogs.push({ timestamp, user, action });
  }

  public getAccessLogs() {
    return Promise.resolve(this.accessLogs);
  }

  public getComplianceStatus() {
    return Promise.resolve(this.complianceStatus);
  }

  public runComplianceChecks(countries: Country[]) {
    // Implement compliance checks here
    // For now, we'll just return a dummy result
    return Promise.resolve({
      status: "Compliant",
      details: "All checks passed",
    });
  }
}

export const complianceService = new ComplianceService();
