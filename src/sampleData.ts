import { StatementData } from "./types";

export const SAMPLE_STATEMENT_DATA: StatementData = {
  student: {
    name: "Dhembre Prathamesh Sandeep",
    studentId: "12317429",
    programme: "B.Tech. (Computer Science and Engineering)",
    admissionSession: "2023-1",
    studentStatus: "A",
    faculty: "Lovely Faculty of Technology and Sciences",
    overallBalance: 102900,
    academicBalance: 102900,
    residentialBalance: 0
  },
  summary: {
    totalDue: 1305839, // Total Debits (sum of all Fee Dues + Compounding)
    totalPaid: 1047339, // Total credits except scholarships
    totalScholarship: 155600, // Total SV entries
    totalHostel: 366000, // Residential Charges due
    totalExam: 24000, // Examination fees due
    pendingBalance: 102900 // Current Outstanding
  },
  transactions: [
    // --- 2023-2024 ---
    {
      date: "17-06-2023",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:1, Term:1",
      debit: 120000,
      credit: 0,
      balance: 120000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "17-06-2023",
      vNo: "243-RV LFTS",
      narration: "Fee,B.Tech. (Electronics and Communication Engineering),1/1,R.No:62221,Online,PNB-28091",
      debit: 0,
      credit: 10000,
      balance: 110000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "19-06-2023",
      vNo: "FEE DUE LFTS",
      narration: "Residential Charges (RD), Year:1, Term:1",
      debit: 80000,
      credit: 0,
      balance: 190000,
      balanceType: "DR",
      feeCategory: "Residential Charges",
      transactionType: "Debit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "19-06-2023",
      vNo: "239-SV LFTS",
      narration: "Being Residential charges (RD) EDB Credit for Term 1",
      debit: 0,
      credit: 10000,
      balance: 180000,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "23-06-2023",
      vNo: "2138-RV LFTS",
      narration: "RESIDENTIAL CHARGES (RD) Payment 1/1,R.No:67741,Online,PNB-13652",
      debit: 0,
      credit: 10000,
      balance: 170000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "27-06-2023",
      vNo: "176-SV LFTS",
      narration: "Scholarship: Type-LPU NEST,SubType:Top N Percent, Slab:3.00-3.01",
      debit: 0,
      credit: 45600,
      balance: 124400,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "08-08-2023",
      vNo: "1006-RV LFTS",
      narration: "RESIDENTIAL CHARGES (RD) Payment 1/1,R.No:137688,Online,PNB-13652",
      debit: 0,
      credit: 60000,
      balance: 64400,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "16-08-2023",
      vNo: "1912-RV LFTS",
      narration: "Tuition Fee Payment,R.No:150316,Online,PNB-13652",
      debit: 0,
      credit: 64400,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "03-10-2023",
      vNo: "FEE DUE LFTS",
      narration: "Residential Charges (MC), Year:1, Term:1",
      debit: 30000,
      credit: 0,
      balance: 30000,
      balanceType: "DR",
      feeCategory: "Residential Charges",
      transactionType: "Debit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "03-10-2023",
      vNo: "24-SV LFTS",
      narration: "Being Proportionate Deduction of Residential Charges (MC)",
      debit: 0,
      credit: 6000,
      balance: 24000,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "03-10-2023",
      vNo: "137-RV LFTS",
      narration: "RESIDENTIAL CHARGES (MC) Payment,R.No:171076,Online,PNB-13652",
      debit: 0,
      credit: 24000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 1"
    },
    {
      date: "09-11-2023",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:1, Term:2",
      debit: 120000,
      credit: 0,
      balance: 120000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2023-2024",
      termNumber: "Term 2"
    },
    {
      date: "09-11-2023",
      vNo: "FEE DUE LFTS",
      narration: "Examination Fee, Year:1, Term:2",
      debit: 8000,
      credit: 0,
      balance: 128000,
      balanceType: "DR",
      feeCategory: "Exam Fee",
      transactionType: "Debit",
      academicYear: "2023-2024",
      termNumber: "Term 2"
    },
    {
      date: "09-11-2023",
      vNo: "10828-SV LFTS",
      narration: "Scholarship Base:LPU NEST,3.00 To 3.01,Bracket-N,Top N Percent,Term:2",
      debit: 0,
      credit: 45600,
      balance: 82400,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 2"
    },
    {
      date: "09-12-2023",
      vNo: "213-RV LFTS",
      narration: "Fee,B.Tech. (CSE) Payment,1/2,R.No:180818,Online,HDFC-1411",
      debit: 0,
      credit: 74400,
      balance: 8000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 2"
    },
    {
      date: "09-12-2023",
      vNo: "213-RV LFTS",
      narration: "Examination Fee,B.Tech (CSE) Payment,1/2,R.No:180818,Online,HDFC-1411",
      debit: 0,
      credit: 8000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2023-2024",
      termNumber: "Term 2"
    },

    // --- 2024-2025 ---
    {
      date: "01-04-2024",
      vNo: "FEE DUE LFTS",
      narration: "Residential Charges (RD), Year:2, Term:3, Remarks:Residential Booking Feedue",
      debit: 90000,
      credit: 0,
      balance: 90000,
      balanceType: "DR",
      feeCategory: "Residential Charges",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "01-04-2024",
      vNo: "8794-SV LFTS",
      narration: "RESIDENTIAL CHARGES (RD) EDB Credit Regd No.12317429 EDB Voucher, Term:3",
      debit: 0,
      credit: 10000,
      balance: 80000,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "04-04-2024",
      vNo: "727-RV LFTS",
      narration: "RESIDENTIAL CHARGES (RD) Payment,R.No:2178,Online,HDFC-44001",
      debit: 0,
      credit: 10000,
      balance: 70000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "06-04-2024",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:2, Term:3",
      debit: 120000,
      credit: 0,
      balance: 190000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "06-04-2024",
      vNo: "FEE DUE LFTS",
      narration: "Examination Fee, Year:2, Term:3",
      debit: 4000,
      credit: 0,
      balance: 194000,
      balanceType: "DR",
      feeCategory: "Exam Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "06-04-2024",
      vNo: "5016-SV LFTS",
      narration: "Scholarship Base:LPU NEST,3.00 To 3.01,Bracket-N,Top N Percent,Term:3",
      debit: 0,
      credit: 45600,
      balance: 148400,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "14-06-2024",
      vNo: "Due LFTS",
      narration: "Fee and Other Charges, Year:2, Term:3, Remarks:Late Fee Charges",
      debit: 500,
      credit: 0,
      balance: 148900,
      balanceType: "DR",
      feeCategory: "Fine/Late Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "14-06-2024",
      vNo: "84259-RV LFTS",
      narration: "Fee and Other Charges Late Fee Payment",
      debit: 0,
      credit: 500,
      balance: 148400,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "14-06-2024",
      vNo: "4864-RV LFTS",
      narration: "RESIDENTIAL CHARGES (RD) Payment,2/3,R.No:LPU/14.1/RECT,HDFC-44001",
      debit: 0,
      credit: 40000,
      balance: 108400,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "30-06-2024",
      vNo: "919-RV LFTS",
      narration: "Fee,B.Tech. (CSE) Payment,2/3,R.No:LPU/14.1/RECT,Online,HDFC-44001",
      debit: 0,
      credit: 74400,
      balance: 34000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "07-08-2024",
      vNo: "672-RV LFTS",
      narration: "RESIDENTIAL CHARGES (RD) Payment,2/3,R.No:LPU/14.1/RECT,Online,HDFC-44001",
      debit: 0,
      credit: 30000,
      balance: 4000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "07-08-2024",
      vNo: "672-RV LFTS",
      narration: "Examination Fee,B.Tech Payment,2/3,R.No:LPU/14.1/RECT,Online,HDFC-44001",
      debit: 0,
      credit: 4000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "12-08-2024",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:2, Term:3, Remarks:cumulative fee",
      debit: 48000,
      credit: 0,
      balance: 48000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "12-08-2024",
      vNo: "1668-RV LFTS",
      narration: "Fee,B.Tech Payment,2/3,R.No:LPU/14.1/RECT,Online,HDFC-44001",
      debit: 0,
      credit: 48000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "20-08-2024",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:2, Term:3",
      debit: 24000,
      credit: 0,
      balance: 24000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "29-08-2024",
      vNo: "176-RV LFTS",
      narration: "Fee and Other Charges Payment, Year:2, Term:3, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 24000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "15-09-2024",
      vNo: "FEE DUE LFTS",
      narration: "Residential Charges (MC), Year:2, Term:3",
      debit: 38000,
      credit: 0,
      balance: 38000,
      balanceType: "DR",
      feeCategory: "Residential Charges",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "15-09-2024",
      vNo: "66-RV LFTS",
      narration: "Residential Charges (MC), Year:2, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 34200,
      balance: 3800,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "23-09-2024",
      vNo: "210-RV LFTS",
      narration: "Residential Charges (MC), Year:2, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 3800,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 3"
    },
    {
      date: "07-11-2024",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:2, Term:4",
      debit: 120000,
      credit: 0,
      balance: 120000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },
    {
      date: "07-11-2024",
      vNo: "FEE DUE LFTS",
      narration: "Examination Fee, Year:2, Term:4",
      debit: 4000,
      credit: 0,
      balance: 124000,
      balanceType: "DR",
      feeCategory: "Exam Fee",
      transactionType: "Debit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },
    {
      date: "07-11-2024",
      vNo: "15841-SV LFTS",
      narration: "Scholarship Type:LPU NEST,3.00 To 3.01, Bracket-N,Term:4",
      debit: 0,
      credit: 21600,
      balance: 102400,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },
    {
      date: "29-12-2024",
      vNo: "489-RV LFTS",
      narration: "Fee and Other Charges, Year:2, Term:4, R.No:LPU/14.1/RECT, Online, HDFC-44001",
      debit: 0,
      credit: 98400,
      balance: 4000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },
    {
      date: "29-12-2024",
      vNo: "489-RV LFTS",
      narration: "Examination Fee, Year:2, Term:4, R.No:LPU/14.1/RECT, Online, HDFC-44001",
      debit: 0,
      credit: 4000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },
    {
      date: "25-01-2025",
      vNo: "16-SV LFTS",
      narration: "Being Proportionate Deduction of Residential Charges (MC)",
      debit: 0,
      credit: 3800,
      balance: 3800,
      balanceType: "CR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },
    {
      date: "11-02-2025",
      vNo: "FEE CR LFTS",
      narration: "Fee and Other Charges, Year:2, Term:4, Remarks:Fee and Other Charges credited Year: 2 Term: 4",
      debit:  0,
      credit: 2160,
      balance: 5960,
      balanceType: "CR",
      feeCategory: "Adjustment",
      transactionType: "Credit",
      academicYear: "2024-2025",
      termNumber: "Term 4"
    },

    // --- 2025-2026 ---
    {
      date: "01-04-2025",
      vNo: "LFTS",
      narration: "Opening Balance",
      debit: 0,
      credit: 5960,
      balance: 5960,
      balanceType: "CR",
      feeCategory: "Opening Balance",
      transactionType: "Settlement",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "01-04-2025",
      vNo: "FEE DUE LFTS",
      narration: "Residential Charges (RD), Year:3, Term:5, Remarks:Residential Booking Feedue",
      debit: 90000,
      credit: 0,
      balance: 84040,
      balanceType: "DR",
      feeCategory: "Residential Charges",
      transactionType: "Debit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "01-04-2025",
      vNo: "7015-SV LFTS",
      narration: "Residential Charges (RD) EDB Credit Regd No.12317429 EDB Voucher, Term:5",
      debit: 0,
      credit: 10000,
      balance: 74040,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "03-04-2025",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:3, Term:5",
      debit: 120000,
      credit: 0,
      balance: 194040,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "03-04-2025",
      vNo: "FEE DUE LFTS",
      narration: "Examination Fee, Year:3, Term:5",
      debit: 4000,
      credit: 0,
      balance: 198040,
      balanceType: "DR",
      feeCategory: "Exam Fee",
      transactionType: "Debit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "03-04-2025",
      vNo: "9806-SV LFTS",
      narration: "Scholarship Type:LPU NEST,3.00 To 3.01, Bracket-N,Term:5",
      debit: 0,
      credit: 21600,
      balance: 176440,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "06-04-2025",
      vNo: "2936-RV LFTS",
      narration: "Residential Charges (RD), Year:3, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 10000,
      balance: 166440,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "26-05-2025",
      vNo: "1740-RV LFTS",
      narration: "Fee and Other Charges, Year:3, Term:5, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 92440,
      balance: 74000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "26-05-2025",
      vNo: "1740-RV LFTS",
      narration: "Examination Fee, Year:3, Term:5, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 4000,
      balance: 70000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "15-06-2025",
      vNo: "3739-RV LFTS",
      narration: "Residential Charges (RD), Year:3, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 40000,
      balance: 30000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "10-08-2025",
      vNo: "1506-RV LFTS",
      narration: "Residential Charges (RD), Year:3, R.No:LPU/14.1/RECT, Online, HDFC-44001",
      debit: 0,
      credit: 30000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "30-10-2025",
      vNo: "FEE CR LFTS",
      narration: "Fee and Other Charges, Year:3, Term:5, Remarks:Fee and Other Charges credited Year: 3 Term: 5",
      debit: 0,
      credit: 16000,
      balance: 16000,
      balanceType: "CR",
      feeCategory: "Adjustment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 5"
    },
    {
      date: "07-11-2025",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:3, Term:6",
      debit: 120000,
      credit: 0,
      balance: 104000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "07-11-2025",
      vNo: "FEE DUE LFTS",
      narration: "Examination Fee, Year:3, Term:6",
      debit: 4000,
      credit: 0,
      balance: 108000,
      balanceType: "DR",
      feeCategory: "Exam Fee",
      transactionType: "Debit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "07-11-2025",
      vNo: "9169-SV LFTS",
      narration: "Scholarship Type:LPU NEST,3.00 To 3.01, Bracket-N,Term:6",
      debit: 0,
      credit: 21600,
      balance: 86400,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "01-12-2025",
      vNo: "FEE DUE LFTS",
      narration: "Residential Charges (MC), Year:3, Term:6",
      debit: 38000,
      credit: 0,
      balance: 124400,
      balanceType: "DR",
      feeCategory: "Residential Charges",
      transactionType: "Debit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "01-12-2025",
      vNo: "821-SV LFTS",
      narration: "Residential Charges (MC)-Proportionate Discount credited Year:3",
      debit: 0,
      credit: 15200,
      balance: 109200,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "01-12-2025",
      vNo: "279-RV LFTS",
      narration: "Residential Charges (MC), Year:3, R.No:LPU/14.1/RECT, Online, HDFC-44001",
      debit: 0,
      credit: 22800,
      balance: 86400,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "30-12-2025",
      vNo: "5624-RV LFTS",
      narration: "Fee and Other Charges, Year:3, Term:6, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 82400,
      balance: 4000,
      balanceType: "DR",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },
    {
      date: "30-12-2025",
      vNo: "5624-RV LFTS",
      narration: "Examination Fee, Year:3, Term:6, Mode:Online, HDFC-44001",
      debit: 0,
      credit: 4000,
      balance: 0,
      balanceType: "NIL",
      feeCategory: "Payment",
      transactionType: "Credit",
      academicYear: "2025-2026",
      termNumber: "Term 6"
    },

    // --- 2026-2027 ---
    {
      date: "06-04-2026",
      vNo: "FEE DUE LFTS",
      narration: "Fee and Other Charges, Year:4, Term:7",
      debit: 120000,
      credit: 0,
      balance: 120000,
      balanceType: "DR",
      feeCategory: "Tuition Fee",
      transactionType: "Debit",
      academicYear: "2026-2027",
      termNumber: "Term 7"
    },
    {
      date: "06-04-2026",
      vNo: "FEE DUE LFTS",
      narration: "Examination Fee, Year:4, Term:7",
      debit: 4000,
      credit: 0,
      balance: 124000,
      balanceType: "DR",
      feeCategory: "Exam Fee",
      transactionType: "Debit",
      academicYear: "2026-2027",
      termNumber: "Term 7"
    },
    {
      date: "06-04-2026",
      vNo: "14067-SV LFTS",
      narration: "Scholarship Type:LPU NEST,3.00 To 3.01, Bracket-N,Term:7, for ID:12317429",
      debit: 0,
      credit: 21600,
      balance: 102400,
      balanceType: "DR",
      feeCategory: "Scholarship",
      transactionType: "Credit",
      academicYear: "2026-2027",
      termNumber: "Term 7"
    },
    {
      date: "06-04-2026",
      vNo: "LFTS",
      narration: "Compounding Fee Debit",
      debit: 5339,
      credit: 0,
      balance: 107739,
      balanceType: "DR",
      feeCategory: "Fine/Late Fee",
      transactionType: "Debit",
      academicYear: "2026-2027",
      termNumber: "Term 7"
    },
    {
      date: "06-04-2026",
      vNo: "LFTS",
      narration: "Compounding Fee Credit",
      debit: 0,
      credit: 4839,
      balance: 102900,
      balanceType: "DR",
      feeCategory: "Adjustment",
      transactionType: "Credit",
      academicYear: "2026-2027",
      termNumber: "Term 7"
    }
  ],
  semesterAnalytics: [
    {
      term: "Term 1",
      academicYear: "2023-2024",
      totalDue: 230000, // 120k tuition + 80k hostel + 30k hostel MC
      totalPaid: 168400, // Payments 10k + 10k + 60k + 64.4k + 24k
      totalScholarship: 61600 // SV 10k + 45.6k + 6k
    },
    {
      term: "Term 2",
      academicYear: "2023-2024",
      totalDue: 128000, // 120k + 8k exam
      totalPaid: 82400, // 74.4k + 8k
      totalScholarship: 45600 // SV 45.6k
    },
    {
      term: "Term 3",
      academicYear: "2024-2025",
      totalDue: 276500, // 90k hostel + 120k tuition + 4k exam + 500 late + 48k tuition + 24k tuition + 38k hostel MC
      totalPaid: 212500, // 10k + 500 + 40k + 74.4k + 30k + 4k + 48k + 24k + 34.2k + 3.8
      totalScholarship: 65600 // 10k EDB + 45.6k Nest
    },
    {
      term: "Term 4",
      academicYear: "2024-2025",
      totalDue: 124000, // 120k tuition + 4k exam
      totalPaid: 102400, // 98.4k + 4k
      totalScholarship: 27560 // 21.6k Nest + 3.8k + 2160
    },
    {
      term: "Term 5",
      academicYear: "2025-2026",
      totalDue: 214000, // 90k hostel + 120k tuition + 4k exam
      totalPaid: 176400, // 10k + 92.4k + 4k + 40k + 30k
      totalScholarship: 47600 // 10k SV + 21.6 SV + 16k SV Adjustment
    },
    {
      term: "Term 6",
      academicYear: "2025-2026",
      totalDue: 162000, // 120k tuition + 4k exam + 38k hostel MC
      totalPaid: 109200, // 22.8k + 82.4k + 4k
      totalScholarship: 36800 // 21.6 Nest + 15.2k MC discount
    },
    {
      term: "Term 7",
      academicYear: "2026-2027",
      totalDue: 129339, // 120k tuition + 4k exam + 5339 Compounding
      totalPaid: 4839, // 4839 Compounding Credit
      totalScholarship: 21600 // 21.6 Nest
    }
  ],
  scholarships: [
    { name: "LPU NEST (Term 1)", amount: 45600, term: "Term 1", date: "27-06-2023" },
    { name: "Residential EDB (Term 1)", amount: 10000, term: "Term 1", date: "19-06-2023" },
    { name: "LPU NEST (Term 2)", amount: 45600, term: "Term 2", date: "09-11-2023" },
    { name: "Residential EDB (Term 3)", amount: 10000, term: "Term 3", date: "01-04-2024" },
    { name: "LPU NEST (Term 3)", amount: 45600, term: "Term 3", date: "06-04-2024" },
    { name: "LPU NEST (Term 4)", amount: 21600, term: "Term 4", date: "07-11-2024" },
    { name: "Residential EDB (Term 5)", amount: 10000, term: "Term 5", date: "01-04-2025" },
    { name: "LPU NEST (Term 5)", amount: 21600, term: "Term 5", date: "03-04-2025" },
    { name: "LPU NEST (Term 6)", amount: 21600, term: "Term 6", date: "07-11-2025" },
    { name: "LPU NEST (Term 7)", amount: 21600, term: "Term 7", date: "06-04-2026" }
  ],
  insights: [
    {
      type: "success",
      category: "Scholarship",
      message: "You saved ₹1,55,600 through LPU NEST and EDB residential grants, reducing total fees by 11.9%."
    },
    {
      type: "info",
      category: "Accommodation",
      message: "Hostel & residential charges account for 28.0% of your total college expenditure (₹3,66,000)."
    },
    {
      type: "warning",
      category: "Term 7",
      message: "An outstanding balance of ₹1,02,900 is detected for Term 7 (Academic Year 2026-2027)."
    },
    {
      type: "alert",
      category: "Late Fees",
      message: "Compounding fee of ₹5,339 was partially offset by a concession of ₹4,839 in April 2026."
    }
  ]
};
