import React, { useState, useEffect } from 'react';
import { X, Search, FileText, Trash2, Calendar, CheckSquare, RefreshCw, BarChart2, ShieldCheck, Mail, Phone, Clock, Download } from 'lucide-react';
import { EnquiryLead } from '../types';
import { SCHOOL_NAME } from '../data';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [leads, setLeads] = useState<EnquiryLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const stored = localStorage.getItem('akshara_enquiry_leads');
    if (stored) {
      setLeads(JSON.parse(stored));
    } else {
      setLeads([]);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        const nextStatus: EnquiryLead['status'] = 
          lead.status === 'Pending' ? 'Confirmed' : 
          lead.status === 'Confirmed' ? 'Completed' : 'Pending';
        return { ...lead, status: nextStatus };
      }
      return lead;
    });
    setLeads(updated);
    localStorage.setItem('akshara_enquiry_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Are you absolutely sure you want to delete this enquiry record from desk storage?")) {
      const filtered = leads.filter(l => l.id !== id);
      setLeads(filtered);
      localStorage.setItem('akshara_enquiry_leads', JSON.stringify(filtered));
    }
  };

  // Convert to beautiful CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["Ticket ID", "Parent Name", "Email", "Phone", "Child Name", "Child DOB", "Grade Applied", "Session", "Tour Date", "Slot", "Tour Format", "Status"];
    const rows = leads.map(l => [
      l.id,
      l.parentName,
      l.email,
      l.phone,
      l.childName,
      l.childDob,
      l.gradeApplied,
      l.academicYear,
      l.preferredTourDate,
      l.preferredTourSlot,
      l.tourMode,
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val || ''}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Akshara_Admissions_Enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => {
    const matchSearch = 
      lead.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchGrade = gradeFilter === 'All' || lead.gradeApplied === gradeFilter;
    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchSearch && matchGrade && matchStatus;
  });

  // Calculate grade requested statistics
  const gradeStats = leads.reduce((acc, lead) => {
    acc[lead.gradeApplied] = (acc[lead.gradeApplied] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueGrades = ['Pre-KG', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full border border-gray-200 overflow-hidden text-left flex flex-col max-h-[90vh]">
        
        {/* Admin Header */}
        <div className="bg-navy-950 px-6 py-4.5 text-white flex items-center justify-between border-b border-navy-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-navy-900 border border-gold-500/20 text-gold-400 rounded-lg">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold tracking-tight">Admissions Desk Console</h2>
              <p className="text-xs font-mono text-gold-400 uppercase tracking-widest mt-0.5">Real-time leads & campus walk scheduler manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Dashboard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Console Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 min-h-0">
          
          {/* Quick Metrics & Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-navy-50/50 border border-navy-100 rounded-xl p-4.5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold text-navy-800 uppercase tracking-wider">Total Enquiries</span>
              <span className="block font-heading text-3xl font-black text-navy-900 mt-2">{leads.length} leads</span>
            </div>
            
            <div className="bg-[#9c1e22]/5 border border-red-100 rounded-xl p-4.5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold text-[#9c1e22] uppercase tracking-wider">Action Pending</span>
              <span className="block font-heading text-3xl font-black text-[#9c1e22] mt-2">
                {leads.filter(l => l.status === 'Pending').length} tickets
              </span>
            </div>

            <div className="bg-green-50/50 border border-green-100 rounded-xl p-4.5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold text-green-800 uppercase tracking-wider">Confirmed slots</span>
              <span className="block font-heading text-3xl font-black text-green-700 mt-2">
                {leads.filter(l => l.status === 'Confirmed').length} slots
              </span>
            </div>

            <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4.5 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">Physical tours</span>
              <span className="block font-heading text-3xl font-black text-amber-700 mt-2">
                {leads.filter(l => l.tourMode === 'physical').length} walks
              </span>
            </div>
          </div>

          {/* Core Analytics Distribution Chart (D3 / Recharts equivalent custom CSS grid) */}
          <div className="bg-gray-50 border border-gray-150 rounded-xl p-5" id="admin-chart-area">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-5 h-5 text-[#9c1e22]" />
              <h3 className="font-heading text-sm sm:text-base font-bold text-navy-950">Grade Registration Distributions</h3>
            </div>
            {leads.length === 0 ? (
              <p className="text-xs font-sans text-gray-500 italic">Submit lead enquiries to populate dynamic stats graph charts.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-13 gap-3 items-end pt-6 border-b border-gray-200">
                {uniqueGrades.map(gr => {
                  const val = gradeStats[gr] || 0;
                  const maxVal = Math.max(...(Object.values(gradeStats) as number[]), 1);
                  const heightPercent = `${Math.ceil((val / maxVal) * 80) + 10}%`;

                  return (
                    <div key={gr} className="flex flex-col items-center gap-1.5">
                      {val > 0 && (
                        <span className="text-[10px] font-mono font-bold text-[#9c1e22] mt-0.5">{val}</span>
                      )}
                      <div className="w-full bg-gray-200 h-28 rounded-lg relative overflow-hidden flex items-end">
                        <div 
                          style={{ height: heightPercent }} 
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            val > 0 ? 'bg-gradient-to-t from-navy-900 to-gold-500' : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <span className="text-[9px] font-mono tracking-tighter text-gray-500 font-bold uppercase truncate max-w-full">
                        {gr}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filter Bar Controls */}
          <div className="bg-white border border-gray-150 rounded-xl p-4.5 flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Parent, Student state, ID or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-navy-950 text-xs"
              />
            </div>

            {/* Filters selectors */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-xs bg-white text-gray-700 focus:outline-[#9c1e22]"
              >
                <option value="All">All Grades ({leads.length})</option>
                {uniqueGrades.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-xs bg-white text-gray-700"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={handleExportCSV}
                disabled={filteredLeads.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-navy-800 border border-gray-200 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gold-600" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Lead Cards List */}
          <div className="space-y-4 font-sans">
            <h3 className="font-heading text-sm sm:text-base font-bold text-navy-800 flex items-center justify-between">
              <span>Matching Leads Records ({filteredLeads.length})</span>
              <button 
                onClick={loadLeads} 
                className="text-xs text-navy-800 font-mono flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3 h-3" /> Refresh desk
              </button>
            </h3>

            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/20">
                <FileText className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-sm font-sans text-gray-500 mt-2">No active ticket matching parameters detected.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLeads.map((lead) => (
                  <div 
                    key={lead.id}
                    className="border border-gray-150 bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow relative"
                  >
                    {/* ID Header badge */}
                    <div className="bg-gray-50 border-b border-gray-150 px-4.5 py-3 flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-navy-950">ID: {lead.id}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-gray-400 font-mono">
                          {new Date(lead.submittedAt).toLocaleDateString()}
                        </span>
                        <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          lead.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          lead.status === 'Confirmed' ? 'bg-green-50 text-green-750 border border-green-200' :
                          'bg-gray-100 text-gray-800 border border-gray-250'
                        }`}>
                          {lead.status}
                        </div>
                      </div>
                    </div>

                    <div className="p-4.5 space-y-4 text-xs">
                      {/* Family details */}
                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-gray-400 tracking-wider">Parent Full Name:</span>
                          <strong className="block text-navy-900 mt-0.5 font-sans font-bold">{lead.parentName}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-gray-400 tracking-wider">Child Name / DOB:</span>
                          <strong className="block text-gray-800 mt-0.5 font-sans font-bold">
                            {lead.childName} ({lead.childDob})
                          </strong>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-gray-400 tracking-wider">Grade Applied:</span>
                          <strong className="block text-[#9c1e22] mt-0.5 font-sans font-bold">
                            {lead.gradeApplied} ({lead.academicYear})
                          </strong>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-gray-400 tracking-wider">Tour window:</span>
                          <span className="block text-gray-700 mt-0.5 font-medium flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-gold-500" />
                            {lead.preferredTourDate} ({lead.preferredTourSlot})
                          </span>
                        </div>
                      </div>

                      {/* Communications link buttons */}
                      <div className="flex flex-wrap gap-2.5 pt-3.5 border-t border-gray-100">
                        <a 
                          href={`tel:${lead.phone}`} 
                          className="flex items-center gap-1 border bg-teal-50 border-teal-200 text-teal-800 font-bold px-2.5 py-1.5 rounded-md hover:bg-teal-100"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call parent
                        </a>
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="flex items-center gap-1 border bg-sky-50 border-sky-200 text-sky-850 font-bold px-2.5 py-1.5 rounded-md hover:bg-sky-100"
                        >
                          <Mail className="w-3.5 h-3.5" /> Email
                        </a>

                        <div className="ml-auto flex items-center gap-2">
                          {/* Toggle status control */}
                          <button
                            onClick={() => handleToggleStatus(lead.id)}
                            className="text-[11px] bg-navy-800 hover:bg-navy-900 text-white font-bold px-2.5 py-1.5 rounded-md cursor-pointer flex items-center gap-1"
                            title="Cycles status Pending -> Confirmed -> Completed"
                          >
                            <CheckSquare className="w-3.5 h-3.5 text-gold-400" /> Change status
                          </button>
                          
                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 border border-red-200 hover:bg-red-50 text-red-700 rounded-md cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Parent comments */}
                      {lead.additionalComments && (
                        <div className="bg-gray-50 p-2.5 rounded-lg text-[11px] text-gray-600 mt-2 font-sans italic border border-gray-100 text-left">
                          * Comments: "{lead.additionalComments}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer info bar */}
        <div className="px-6 py-4.5 bg-gray-50 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 shrink-0">
          <span>* Data records are securely saved into localStorage. Ideal for offline admissions walkthrough desks.</span>
          <span className="font-semibold text-navy-850 mt-1 sm:mt-0 font-mono uppercase tracking-wider">{SCHOOL_NAME}</span>
        </div>

      </div>
    </div>
  );
}
