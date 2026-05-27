export interface EnquiryLead {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childDob: string;
  gradeApplied: string;
  academicYear: string;
  preferredTourDate: string;
  preferredTourSlot: 'morning' | 'afternoon';
  tourMode: 'physical' | 'virtual';
  additionalComments?: string;
  submittedAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
}

export interface Facility {
  id: string;
  title: string;
  category: 'Academics' | 'Sports' | 'Infrastructure' | 'Primary / Kindergarten';
  description: string;
  detailedDescription: string;
  imagePath: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'Campus Life' | 'Transport & Facilities';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
