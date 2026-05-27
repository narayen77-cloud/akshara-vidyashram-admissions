import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Award, Calendar, Clock, Map, CheckCircle2, Ticket, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { EnquiryLead } from '../types';
import { trackAdmissionsLead } from './AnalyticsAndMetaPixel';
import { TRANSLATIONS } from '../translations';

interface EnquiryFormProps {
  prefilledGrade: string;
  lang: 'en' | 'ta';
}

export default function EnquiryForm({ prefilledGrade, lang }: EnquiryFormProps) {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childDob: '',
    gradeApplied: '',
    academicYear: '2026-2027',
    preferredTourDate: '',
    preferredTourSlot: 'morning' as 'morning' | 'afternoon',
    tourMode: 'physical' as 'physical' | 'virtual',
    additionalComments: ''
  });

  const [ticketData, setTicketData] = useState<EnquiryLead | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync pre-filled grade from calculator
  useEffect(() => {
    if (prefilledGrade) {
      setFormData(prev => ({ ...prev, gradeApplied: prefilledGrade }));
    }
  }, [prefilledGrade]);

  const gradesOptions = [
    'Pre-KG', 'LKG', 'UKG',
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const mockupId = 'AV' + Date.now().toString().slice(-6).toUpperCase();
    const newLead: EnquiryLead = {
      id: mockupId,
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    };

    try {
      // Post to our server endpoint so the backend records the telemetry
      await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });

      // Save to client local state storage for Admin dashboard
      const stored = localStorage.getItem('akshara_enquiry_leads');
      const leadsList = stored ? JSON.parse(stored) : [];
      leadsList.unshift(newLead);
      localStorage.setItem('akshara_enquiry_leads', JSON.stringify(leadsList));

      // Track lead conversion
      trackAdmissionsLead('Parent Admissions Enquiry', {
        grade: formData.gradeApplied,
        mode: formData.tourMode
      });

      setTimeout(() => {
        setIsLoading(false);
        setTicketData(newLead);
        setStep(4);
      }, 1200);

    } catch (err) {
      console.error("Failed to post enquiry", err);
      setIsLoading(false);
      // Fallback save locally anyway
      const stored = localStorage.getItem('akshara_enquiry_leads');
      const leadsList = stored ? JSON.parse(stored) : [];
      leadsList.unshift(newLead);
      localStorage.setItem('akshara_enquiry_leads', JSON.stringify(leadsList));
      setTicketData(newLead);
      setStep(4);
    }
  };

  const handleResetForm = () => {
    setStep(1);
    setFormData({
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childDob: '',
      gradeApplied: '',
      academicYear: '2026-2027',
      preferredTourDate: '',
      preferredTourSlot: 'morning',
      tourMode: 'physical',
      additionalComments: ''
    });
    setTicketData(null);
  };

  // Prevent selecting past dates for visits
  const getMinDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <section id="booking-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-600">
            {lang === 'en' ? 'Apply & Schedule' : 'விண்ணப்பம் & முன்பதிவு'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
            {t.enquiryTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-500">
            {t.enquirySub}
          </p>
        </div>

        {/* Step-by-Step Lead Form Card Container */}
        <div className="bg-white border text-left border-gray-150 rounded-2xl shadow-xl overflow-hidden" id="enquiry-form-card">
          
          {/* Form Progress Header */}
          {step <= 3 && (
            <div className="bg-gray-50 border-b border-gray-150 px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-navy-800 uppercase tracking-widest">
                {lang === 'en' ? `Step ${step} of 3` : `படி ${step}/3`}
              </span>
              <div className="flex gap-2">
                <div className={`h-1.5 w-10 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-[#9c1e22]' : 'bg-gray-200'}`} />
                <div className={`h-1.5 w-10 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-[#9c1e22]' : 'bg-gray-200'}`} />
                <div className={`h-1.5 w-10 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-[#9c1e22]' : 'bg-gray-200'}`} />
              </div>
            </div>
          )}

          {/* Actual Form Body */}
          <div className="p-6 sm:p-10">
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-heading text-lg font-bold text-navy-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-gold-600" /> {lang === 'en' ? 'Parent Information' : 'பெற்றோர் தகவல்கள்'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'en' 
                      ? 'Please enter correct callback and postal parameters.' 
                      : 'தொடர்பு கொள்ள வேண்டிய விவரங்களைச் சரியாக உள்ளிடவும்.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {lang === 'en' ? 'Parent Full Name:' : 'பெற்றோர் / பாதுகாவலர் முழுப்பெயர்:'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="parentName"
                        required
                        placeholder="e.g. Anand Murugan"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {lang === 'en' ? 'Active Phone Number:' : 'கைபேசி எண் (Active Phone Number):'}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {lang === 'en' ? 'Email Address:' : 'மின்னஞ்சல் முகவரி (Email Address):'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. anand@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-navy-800 text-white font-heading text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-1 hover:bg-navy-900 cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Next: Child Details' : 'அடுத்து: குழந்தை விவரம்'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-heading text-lg font-bold text-navy-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-600" /> Admission Parameters
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Specify academic pathways and candidate dates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Child Full Name:</label>
                    <input
                      type="text"
                      name="childName"
                      required
                      placeholder="Candidate's Name"
                      value={formData.childName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Child Date of Birth:</label>
                    <input
                      type="date"
                      name="childDob"
                      required
                      value={formData.childDob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Academic Year Applied:</label>
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm bg-white"
                    >
                      <option value="2026-2027">2026-2027 Academic Year</option>
                      <option value="2027-2028">2027-2028 Academic Year</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Grade Applied For:</label>
                    <select
                      name="gradeApplied"
                      required
                      value={formData.gradeApplied}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm bg-white"
                    >
                      <option value="">-- Choose Grade Level --</option>
                      {gradesOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    {prefilledGrade && (
                      <p className="text-[11px] text-green-700 font-medium">
                        * Pre-filled with eligible grade from Age Calculator!
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="border border-gray-300 text-gray-600 font-heading text-sm font-bold px-5 py-3 rounded-lg flex items-center gap-1 hover:bg-gray-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="bg-navy-800 text-white font-heading text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-1 hover:bg-navy-900 cursor-pointer"
                  >
                    <span>Next: Walkthrough scheduling</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-heading text-lg font-bold text-navy-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold-600" /> Camp Tour and Walkthrough Schedule
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Book physical slots or request online consultancy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-3 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Tour / Consultation Format:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className={`border p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${formData.tourMode === 'physical' ? 'border-gold-500 bg-gold-50/25 ring-1 ring-gold-200' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type="radio"
                          name="tourMode"
                          value="physical"
                          checked={formData.tourMode === 'physical'}
                          onChange={() => setFormData(prev => ({ ...prev, tourMode: 'physical' }))}
                          className="mt-1 text-[#9c1e22] focus:ring-[#9c1e22]"
                        />
                        <div className="text-left">
                          <span className="block font-heading text-sm font-bold text-navy-900">Physical Campus Tour</span>
                          <span className="block text-xs text-gray-500 mt-1">Guide walkthrough of 25-Acre woodlands, swimming pool, science labs, and CBSE structures.</span>
                        </div>
                      </label>

                      <label className={`border p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${formData.tourMode === 'virtual' ? 'border-gold-500 bg-gold-50/25 ring-1 ring-gold-200' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                          type="radio"
                          name="tourMode"
                          value="virtual"
                          checked={formData.tourMode === 'virtual'}
                          onChange={() => setFormData(prev => ({ ...prev, tourMode: 'virtual' }))}
                          className="mt-1 text-[#9c1e22] focus:ring-[#9c1e22]"
                        />
                        <div className="text-left">
                          <span className="block font-heading text-sm font-bold text-navy-900">Virtual Consultation</span>
                          <span className="block text-xs text-gray-500 mt-1">One-on-one live zoom discussion with our chief education coordinator.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Preferred Booking Date:</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        name="preferredTourDate"
                        required
                        min={getMinDateString()}
                        value={formData.preferredTourDate}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Time Window:</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <select
                        name="preferredTourSlot"
                        value={formData.preferredTourSlot}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm bg-white"
                      >
                        <option value="morning">Morning Session (9:30 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon Session (2:00 PM - 4:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Specific Requests (Optional):</label>
                    <textarea
                      name="additionalComments"
                      rows={3}
                      placeholder="e.g. Please arrange for transport details or specify host interests"
                      value={formData.additionalComments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-150">
                  <span className="flex items-center gap-1.5 text-xs text-navy-800 font-semibold font-mono uppercase">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> Guaranteed Security
                  </span>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="border border-gray-300 text-gray-600 font-heading text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-1 hover:bg-gray-50 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-green-700 hover:bg-green-800 disabled:bg-green-600 text-white font-heading text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Ticket</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 4: Success Dialogue Ticket */}
            {step === 4 && ticketData && (
              <div className="space-y-8 animate-fadeIn" id="success-ticket-layout">
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-navy-900">Tour Booking Secured</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    A personalized admissions ticket is generated on our servers. Our coordination officer will call you back within 1 hour.
                  </p>
                </div>

                {/* Golden/Slate Ticket component */}
                <div className="border border-gold-300 rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-[#102d4f] text-white overflow-hidden shadow-2xl relative">
                  
                  {/* Watermark decorations */}
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gold-400/10 rounded-full blur-2xl" />
                  
                  <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-bold block">Admissions Ticket</span>
                      <h4 className="font-heading text-base font-bold mt-1 text-white">AKSHARAA VIDYAASHRAM</h4>
                    </div>
                    <div className="bg-gold-500 text-navy-950 px-4 py-1.5 rounded-lg font-mono text-xs font-black tracking-widest">
                      ID: {ticketData.id}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-sm text-left font-sans">
                    <div>
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">Parent Visitor:</span>
                      <strong className="block text-white font-semibold mt-0.5">{ticketData.parentName}</strong>
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">Candidate Student:</span>
                      <strong className="block text-white font-semibold mt-0.5">{ticketData.childName}</strong>
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">Class & Grade Path:</span>
                      <strong className="block text-gold-400 font-bold mt-0.5">{ticketData.gradeApplied} ({ticketData.academicYear})</strong>
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">Tour Format:</span>
                      <strong className="block text-white font-semibold mt-0.5 capitalize">{ticketData.tourMode} Gateway</strong>
                    </div>
                    <div className="sm:col-span-2 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">Walkthrough Date:</span>
                        <div className="flex items-center gap-1.5 mt-0.5 font-bold text-white">
                          <Calendar className="w-4 h-4 text-gold-400" />
                          <span>{ticketData.preferredTourDate}</span>
                        </div>
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono uppercase tracking-wider text-gray-400">Window Selected:</span>
                        <div className="flex items-center gap-1.5 mt-0.5 font-semibold text-white capitalize">
                          <Clock className="w-4 h-4 text-gold-400" />
                          <span>{ticketData.preferredTourSlot} Session</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#1b355a] border-t border-white/10 text-center text-xs text-gold-300 font-mono tracking-wide leading-relaxed">
                    * Kindly arrive 10 minutes prior to your time window. Our eco-sanctuary gate is ready for your entry!
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="bg-navy-800 text-white font-heading text-sm font-bold px-6 py-3 rounded-lg hover:bg-navy-950 transition-colors cursor-pointer"
                  >
                    Register Another Candidate
                  </button>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="border border-navy-800 text-navy-800 font-heading text-sm font-bold px-5 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Print Confirmation</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
