import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AGE_ELIGIBILITY_RULES } from '../data';

interface CalculatorProps {
  onEligibleGradeSelected: (grade: string) => void;
}

export default function AgeEligibilityCalculator({ onEligibleGradeSelected }: CalculatorProps) {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{
    eligible: boolean;
    grade?: string;
    age?: number;
    message?: string;
  } | null>(null);

  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    // CBSE cut-off is calculated relative to March 31 of the academic year start (March 31, 2026 for 2026-27 session)
    const targetDate = new Date('2026-03-31');
    
    let ageInYears = targetDate.getFullYear() - birthDate.getFullYear();
    const m = targetDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && targetDate.getDate() < birthDate.getDate())) {
      ageInYears--;
    }

    // Include fractional months for precision
    const diffTime = Math.abs(targetDate.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const agePrecise = Number((diffDays / 365.25).toFixed(1));

    if (agePrecise < 3) {
      setResult({
        eligible: false,
        message: "Your child is under 3 years old by March 31, 2026. They are encouraged to join our customized Early Years Play Consultation sessions with parents."
      });
      return;
    }

    if (agePrecise >= 18) {
      setResult({
        eligible: false,
        message: "Please contact our administrative office directly for special secondary admissions beyond 17 years of age."
      });
      return;
    }

    // Match CBSE guidelines from data
    const match = AGE_ELIGIBILITY_RULES.find(
      rule => agePrecise >= rule.minAge && agePrecise < rule.maxAge
    );

    if (match) {
      setResult({
        eligible: true,
        grade: match.grade,
        age: agePrecise,
        message: `Your child is ${agePrecise} years old by March 31, 2026, which matches CBSE Academic Boards rules for registration.`
      });
    } else {
      setResult({
        eligible: false,
        message: "No specific pre-grade detected. Kindly connect with our counselor directly."
      });
    }
  };

  return (
    <div id="calculator-section" className="bg-white border border-gray-150 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto my-12">
      <div className="bg-navy-800 p-6 text-white text-center">
        <div className="flex justify-center mb-2">
          <div className="p-2.5 bg-navy-700 rounded-full text-gold-400">
            <Calculator className="w-6 h-6" />
          </div>
        </div>
        <h3 className="font-heading text-lg sm:text-xl font-bold">Grade Eligibility & Age Checker</h3>
        <p className="text-xs font-mono text-gold-400 uppercase tracking-widest mt-1">Official CBSE Guidelines Calculator</p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <form onSubmit={calculateEligibility} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="student-dob" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Child's Date of Birth:
            </label>
            <input
              type="date"
              id="student-dob"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-800 font-mono text-sm shadow-xs"
            />
            <p className="text-[11px] text-gray-500">
              *Calculated relative to the statutory start cutoff: <strong className="font-semibold text-navy-800">March 31, 2026</strong>.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#9c1e22] hover:bg-red-800 text-white font-heading text-sm font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Evaluate Eligible Grade</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {result && (
          <div className="pt-6 border-t border-gray-100 animate-fadeIn" id="calculator-result-container">
            {result.eligible ? (
              <div className="bg-green-50/70 border border-green-200 rounded-xl p-5 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold text-green-800 uppercase tracking-wider">Verification Successful</p>
                    <p className="text-sm font-sans text-gray-700 mt-1">
                      {result.message}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-green-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#9c1e22] font-semibold">Eligible Grade Class</span>
                    <h4 className="font-heading text-xl sm:text-2xl font-black text-navy-900 mt-0.5">{result.grade}</h4>
                  </div>

                  <button
                    onClick={() => {
                      if (result.grade) {
                        onEligibleGradeSelected(result.grade);
                        const el = document.getElementById('enquiry-form-card');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white font-heading text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Autofill Form Grade</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">Guidance Alert</p>
                  <p className="text-sm font-sans text-gray-700 mt-1">
                    {result.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
