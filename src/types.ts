/**
 * Shared Type Definitions for the Student Statement Parser & Dashboard
 */

export interface StudentDetails {
  name: string;
  studentId: string;
  programme: string;
  admissionSession: string;
  studentStatus: string;
  faculty: string;
  overallBalance: number;
  academicBalance: number;
  residentialBalance: number;
}

export interface FinancialSummary {
  totalDue: number;
  totalPaid: number;
  totalScholarship: number;
  totalHostel: number;
  totalExam: number;
  pendingBalance: number;
}

export interface LedgerTransaction {
  date: string;
  vNo: string;
  narration: string;
  debit: number;
  credit: number;
  balance: number;
  balanceType: 'DR' | 'CR' | 'NIL';
  feeCategory: 'Tuition Fee' | 'Residential Charges' | 'Exam Fee' | 'Scholarship' | 'Payment' | 'Refund' | 'Fine/Late Fee' | 'Adjustment' | 'Opening Balance' | 'Other';
  transactionType: 'Debit' | 'Credit' | 'Settlement';
  academicYear: string; // e.g. "2023-2024"
  termNumber: string; // e.g. "Term 1"
}

export interface SemesterAnalytics {
  term: string; // e.g. "Year 1, Term 1"
  academicYear: string;
  totalDue: number;
  totalPaid: number;
  totalScholarship: number;
}

export interface ScholarshipItem {
  name: string;
  amount: number;
  term: string;
  date: string;
}

export interface AIInsight {
  type: 'info' | 'success' | 'warning' | 'alert';
  message: string;
  category: string;
}

export interface StatementData {
  student: StudentDetails;
  summary: FinancialSummary;
  transactions: LedgerTransaction[];
  semesterAnalytics: SemesterAnalytics[];
  scholarships: ScholarshipItem[];
  insights: AIInsight[];
}
