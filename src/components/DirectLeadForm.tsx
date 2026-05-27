import React, { useState } from 'react';
import { User, Phone, BookOpen, Clock, MessageSquare, CheckCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { trackAdmissionsLead } from './AnalyticsAndMetaPixel';

interface DirectLeadFormProps {
  lang: 'en' | 'ta';
}

export default function DirectLeadForm({ lang }: DirectLeadFormProps) {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    gradeApplied: '',
    preferredCallbackTime: 'morning',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  const gradesOptions = [
    'Pre-KG', 'LKG', 'UKG',
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'
  ];

  const callbackTimes = [
    { value: 'morning', label: lang === 'en' ? 'Morning (9:30 AM - 12:00 PM)' : 'காலை (9:30 - 12:00)' },
    { value: 'afternoon', label: lang === 'en' ? 'Afternoon (12:00 PM - 3:30 PM)' : 'மதியம் (12:00 - 3:30)' },
    { value: 'evening', label: lang === 'en' ? 'Evening (3:30 PM - 6:00 PM)' : 'மாலை (3:30 - 6:00)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    // Smooth validations
    if (!formData.parentName.trim()) {
      setErrorText(lang === 'en' ? 'Parent name is required.' : 'பெற்றோர் பெயர் தேவை.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\s+/g, '').replace(/[-+()]/g, '');
    if (cleanPhone.length < 10) {
      setErrorText(lang === 'en' ? 'Please enter a valid active mobile number.' : 'சரியான கைபேசி எண்ணை உள்ளிடவும்.');
      return;
    }
    if (!formData.gradeApplied) {
      setErrorText(lang === 'en' ? 'Please select a grade.' : 'வகுப்பைத் தேர்ந்தெடுக்கவும்.');
      return;
    }

    setIsSubmitting(true);

    const ticketId = 'AC' + Date.now().toString().slice(-6).toUpperCase();
    const newLead = {
      id: ticketId,
      parentName: formData.parentName,
      phone: formData.phone,
      gradeApplied: formData.gradeApplied,
      childName: `Child of ${formData.parentName}`,
      childDob: '',
      email: '',
      academicYear: '2026-2027',
      preferredTourDate: new Date().toISOString().split('T')[0],
      preferredTourSlot: (formData.preferredCallbackTime === 'evening' ? 'afternoon' : formData.preferredCallbackTime) as 'morning' | 'afternoon',
      tourMode: 'physical' as const,
      additionalComments: `Callback Time: ${formData.preferredCallbackTime}. Message: ${formData.message}`,
      submittedAt: new Date().toISOString(),
      status: 'Pending' as const
    };

    try {
      // 1. POST to backend server
      await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });

      // 2. Save to localStorage to integrate seamlessly into Admissions Desk dashboard!
      const stored = localStorage.getItem('akshara_enquiry_leads');
      const leadsList = stored ? JSON.parse(stored) : [];
      leadsList.unshift(newLead);
      localStorage.setItem('akshara_enquiry_leads', JSON.stringify(leadsList));

      // 3. Track lead conversion meta pixel
      trackAdmissionsLead('Campaign Direct Enquiry', {
        grade: formData.gradeApplied,
        mode: `Callback_${formData.preferredCallbackTime}`
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // 4. Automatically or seamlessly route to the official campaign WhatsApp number: +91 8925693013
      const textMessage = encodeURIComponent("Hello, I am interested in Akshara Vidyaashram admissions. Please share details.");
      const whatsappUrl = `https://wa.me/918925693013?text=${textMessage}`;
      
      // Delay the redirection slightly for smooth user feedback
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (err) {
      console.error("Direct enquiry submission failed", err);
      setIsSubmitting(false);
      // Fallback submission locally anyway
      const stored = localStorage.getItem('akshara_enquiry_leads');
      const leadsList = stored ? JSON.parse(stored) : [];
      leadsList.unshift(newLead);
      localStorage.setItem('akshara_enquiry_leads', JSON.stringify(leadsList));
      setSubmitted(true);
      
      const textMessage = encodeURIComponent("Hello, I am interested in Akshara Vidyaashram admissions. Please share details.");
      const whatsappUrl = `https://wa.me/918925693013?text=${textMessage}`;
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);
    }
  };

  const textMessage = encodeURIComponent("Hello, I am interested in Akshara Vidyaashram admissions. Please share details.");
  const directWhatsappUrl = `https://wa.me/918925693013?text=${textMessage}`;

  return (
    <section id="campaign-enquiry-section" className="py-12 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
      {/* Decorative vector badges for safe eco-sanctuary brand representation */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-64 h-64 bg-rose-50 rounded-full blur-3xl -z-10" />
      <div className="absolute top-12 right-0 translate-x-12 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Informative column left */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-[#9c1e22] text-xs font-bold uppercase tracking-wider font-mono">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'en' ? 'Immediate Callback Campaign' : 'உடனடித் தொடர்புத் திட்டம்'}</span>
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight">
              {lang === 'en' ? 'Direct Admissions Enquiry & Registration' : 'நேரடி சேர்க்கை மற்றும் தகவல் பதிவு'}
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {lang === 'en' 
                ? 'Fill in the direct callback request below. Your details will be submitted securely into our campaign system, and you will be routed instantly to connect with our official counselor on WhatsApp.' 
                : 'கீழே உள்ள தகவல் தாளைப் பூர்த்தி செய்க. உங்கள் விவரங்கள் பாதுகாப்பாகச் சேர்க்கப்பட்டு, உடனடியாக எங்களது சேர்க்கை ஆலோசகரை வாட்ஸ்அப் வழியாகத் தொடர்பு கொள்ளலாம்.'}
            </p>

            {/* Micro value stamps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 text-left pt-2 font-sans">
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-3xs">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide leading-none">{lang === 'en' ? '10-Minute Response' : '10 நிமிடப் பதில்'}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{lang === 'en' ? 'Prompt guidance over phone or chats.' : 'கைபேசி அல்லது வாட்ஸ்அப்பில் நேரடி வழிகாட்டுதல்.'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-3xs">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide leading-none">{lang === 'en' ? 'Syllabus Guides Included' : 'பாடத்திட்டங்கள் அடங்கும்'}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{lang === 'en' ? 'Get immediate fee sheets.' : 'கட்டண விவரங்கள் மற்றும் பாடத் திட்டங்கள் உடனே பெறவும்.'}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-sans text-xs font-extrabold px-5 py-3 rounded-xl transition-all shadow-md hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 fill-current text-white" />
                <span>{lang === 'en' ? 'Direct Admissions Chat on WhatsApp +91 8925693013' : 'வாட்ஸ்அப்பில் நேரடி ஆலோசனை +91 8925693013'}</span>
              </a>
            </div>
          </div>

          {/* Premium Form column right */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="bg-white border text-left border-slate-250/70 rounded-2xl shadow-xl overflow-hidden" id="direct-campaign-form-card">
              
              {/* Card Accent Top Line */}
              <div className="h-1.5 bg-gradient-to-r from-navy-850 via-[#9c1e22] to-gold-450" />

              <div className="p-6 sm:p-8">
                {submitted ? (
                  <div className="space-y-6 text-center py-6 animate-fadeIn" id="campaign-success-block">
                    <div className="h-16 w-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-xl font-bold text-navy-950">
                        {lang === 'en' ? 'Admission Enquiry Submitted' : 'சேர்க்கை விவரங்கள் சமர்ப்பிக்கப்பட்டது'}
                      </h3>
                      <p className="font-sans text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        {lang === 'en' 
                          ? 'Thank you. Our admissions counsellor will contact you shortly.' 
                          : 'நன்றி. எங்களது சேர்க்கை ஆலோசகர் உங்களை விரைவில் தொடர்புகொள்வார்.'}
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-500 leading-snug space-y-2.5">
                      <p>{lang === 'en' ? 'Connecting secure gateway on WhatsApp in 1.5 seconds...' : 'வாட்ஸ்அப் உடன் பாதுகாப்பாக இணைக்கப்படுகிறது (1.5 நொடிகளில்)...'}</p>
                      <div className="h-1 w-24 bg-green-500 mx-auto rounded-full animate-pulse" />
                      <a 
                        href={directWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-green-700 hover:text-green-800 font-bold underline"
                      >
                        {lang === 'en' ? 'Click here to connect immediately' : 'உடனே வாட்ஸ்அப் தொடர்பிற்கு இங்கே கிளிக் செய்யவும்'} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold text-navy-950">
                        {lang === 'en' ? '2026-2027 Admissions Enquiry' : 'சேர்க்கை விசாரணை படிவம்'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {lang === 'en' ? 'Quickly fill your callback preferences' : 'உடனடி அழைப்பு மற்றும் சேர்க்கை விவரப்பதிவு'}
                      </p>
                    </div>

                    {errorText && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-xs text-[#9c1e22] rounded-lg font-semibold">
                        {errorText}
                      </div>
                    )}

                    <div className="space-y-4">
                      
                      {/* Parent Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {lang === 'en' ? 'Parent Full Name' : 'பெற்றோர் முழுப்பெயர்'} <span className="text-[#9c1e22]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            name="parentName"
                            required
                            placeholder={lang === 'en' ? "e.g. Ramesh Kumar" : "எ.கா. ரமேஷ் குமார்"}
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-sans"
                            id="campaign-parent-name"
                          />
                        </div>
                      </div>

                      {/* Mobile phone number */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {lang === 'en' ? 'Active Mobile Number' : 'கைபேசி எண்'} <span className="text-[#9c1e22]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder={lang === 'en' ? "e.g. +91 98234 XXXXX" : "எ.கா. 98234 XXXXX"}
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-mono"
                            id="campaign-phone-num"
                          />
                        </div>
                      </div>

                      {/* Student Grade Applying For */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {lang === 'en' ? 'Student Grade Applying For' : 'விண்ணப்பிக்கும் வகுப்பு (Grade)'} <span className="text-[#9c1e22]">*</span>
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <select
                            name="gradeApplied"
                            required
                            value={formData.gradeApplied}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-sans bg-white"
                            id="campaign-grade"
                          >
                            <option value="">{lang === 'en' ? '-- Select Grade Level --' : '-- வகுப்பைத் தேர்ந்தெடுக்கவும் --'}</option>
                            {gradesOptions.map((grade) => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Preferred Callback Time */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {lang === 'en' ? 'Preferred Callback Time' : 'அழைக்க உகந்த நேரம்'}
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <select
                            name="preferredCallbackTime"
                            value={formData.preferredCallbackTime}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-sans bg-white"
                            id="campaign-callback"
                          >
                            {callbackTimes.map((item) => (
                              <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message / Enquiry */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          {lang === 'en' ? 'Message / Enquiry' : 'எங்களது கூடுதல் வினாக்கள் / குறிப்பு'}
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder={lang === 'en' ? "e.g. Any details on sports and admission dates?" : "கூடுதல் விவரங்களை இங்கே எழுதவும்"}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 text-sm font-sans"
                          id="campaign-message"
                        />
                      </div>

                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9c1e22] hover:bg-navy-950 text-white hover:text-gold-400 font-heading text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border border-transparent hover:border-gold-500 whitespace-nowrap active:scale-[0.99]"
                      id="campaign-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{lang === 'en' ? 'Registering...' : 'பதிவு செய்யப்படுகிறது...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{lang === 'en' ? 'Submit Enquiry & Chat on WhatsApp' : 'விசாரணையைச் சமர்ப்பித்து வாட்ஸ்அப் செய்யவும்'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400 font-sans mt-2">
                      🔒 {lang === 'en' ? 'No third-party sharing. Your direct details are safe in our legacy database.' : 'உங்கள் பெயர் மற்றும் விவரங்கள் எங்களது பாதுகாப்பான கோப்புகளில் மட்டுமே இருக்கும்.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
