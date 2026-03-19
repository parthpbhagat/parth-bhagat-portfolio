import { Mail, Phone, MapPin, Github, Linkedin, Printer, ExternalLink, Download, Database, BarChart3, FileSpreadsheet, Code, Target, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const Resume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingATS, setIsGeneratingATS] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    const opt = {
      margin: 0.3,
      filename: 'Parth_Bhagat_PowerBI_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(resumeRef.current).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadATS = async () => {
    setIsGeneratingATS(true);
    // Create a simple, ATS-friendly HTML structure for Data Analyst role
    const atsHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #000; padding: 40px; max-width: 800px;">
        <h1 style="font-size: 20pt; margin: 0 0 5px 0; text-transform: uppercase; text-align: center;">PARTH BHAGAT</h1>
        <p style="font-size: 13pt; margin: 0 0 10px 0; text-align: center; font-weight: bold;">Data Analyst</p>
        
        <p style="font-size: 10pt; margin: 0 0 20px 0; text-align: center;">
          Email: <a href="mailto:parthpbhagat@gmail.com" style="color: #0066cc; text-decoration: none;">parthpbhagat@gmail.com</a> | Phone: +91 9011494385 | Location: Ahmedabad, Gujarat<br/>
          GitHub: <a href="https://github.com/parthpbhagat" style="color: #0066cc; text-decoration: none;">github.com/parthpbhagat</a> | LinkedIn: <a href="https://www.linkedin.com/in/parth-p-bhagat-203162369" style="color: #0066cc; text-decoration: none;">linkedin.com/in/parth-p-bhagat</a>
        </p>


        <h2 style="font-size: 12pt; margin: 20px 0 10px 0; border-bottom: 2px solid #000; padding-bottom: 3px; text-transform: uppercase;">Professional Summary</h2>
        <p style="font-size: 11pt; margin: 0 0 15px 0;">
          Detail-oriented Data Analyst with expertise in Python, SQL, Advanced Excel, and Power BI. Skilled in transforming raw data into actionable insights through data cleaning, analysis, and visualization. Proven ability to create interactive dashboards and reports that drive data-driven decision making. Seeking to leverage analytical skills and technical expertise to contribute to organizational success.
        </p>
        
        <h2 style="font-size: 12pt; margin: 20px 0 10px 0; border-bottom: 2px solid #000; padding-bottom: 3px; text-transform: uppercase;">Technical Skills</h2>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Programming & Scripting:</strong> Python (Pandas, NumPy, Matplotlib), SQL (Advanced)</p>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Data Visualization:</strong> Power BI, DAX, Power Query, Excel Charts</p>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Spreadsheets:</strong> Advanced Excel (Pivot Tables, VLOOKUP, XLOOKUP, Macros, Conditional Formatting)</p>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Database Management:</strong> SQL Server, MySQL, Data Modeling</p>
        <p style="font-size: 11pt; margin: 0 0 15px 0;"><strong>Core Competencies:</strong> Data Cleaning, ETL, Statistical Analysis, Report Generation, Dashboard Development</p>
        
        <h2 style="font-size: 12pt; margin: 20px 0 10px 0; border-bottom: 2px solid #000; padding-bottom: 3px; text-transform: uppercase;">Projects</h2>
        
        <p style="font-size: 11pt; margin: 0 0 3px 0;"><strong>AdventureWorks Sales Dashboard</strong></p>
        <p style="font-size: 10pt; margin: 0 0 5px 0; font-style: italic;">Tools: Power BI, DAX, Power Query, SQL</p>
        <ul style="font-size: 11pt; margin: 0 0 15px 0; padding-left: 20px;">
          <li>Developed comprehensive sales analytics dashboard analyzing $24.9M revenue and 25.2K orders</li>
          <li>Created KPIs for revenue trending, product performance, and customer segmentation</li>
          <li>Implemented interactive filters enabling drill-down analysis by category, product, and time period</li>
          <li>Identified return rate patterns (2.2%) using key influencer analysis to improve product quality</li>
        </ul>

        <p style="font-size: 11pt; margin: 0 0 3px 0;"><strong>IPL Match Analysis Dashboard</strong></p>
        <p style="font-size: 10pt; margin: 0 0 5px 0; font-style: italic;">Tools: Power BI, DAX, Power Query, SQL</p>
        <ul style="font-size: 11pt; margin: 0 0 15px 0; padding-left: 20px;">
          <li>Interactive Dashboards: Dynamic filtering by season, team, and venue for customized insights.</li>
          <li>Advanced DAX Calculations: Custom measures developed for calculating Batting Strike Rates, Bowling Economy, and Phase-wise play analysis.</li>
          <li>Data Modeling: Optimized Star Schema connecting fact tables (ball-by-ball deliveries, match results) with dimension tables (players, teams) for efficient querying.</li>
          <li>UI/UX Design: Clean and intuitive interface for seamless data exploration and storytelling. </li>
        </ul>

        <p style="font-size: 11pt; margin: 0 0 3px 0;"><strong>Hotel Booking Analysis</strong></p>
        <p style="font-size: 10pt; margin: 0 0 5px 0; font-style: italic;">Tools: Python, SQL, Excel</p>
        <ul style="font-size: 11pt; margin: 0 0 15px 0; padding-left: 20px;">
          <li>Performed exploratory data analysis on hotel booking dataset using Python and SQL</li>
          <li>Identified booking trends, cancellation patterns, and revenue optimization opportunities</li>
          <li>Created visualizations and reports presenting actionable business recommendations</li>
        </ul>
        
        <p style="font-size: 11pt; margin: 0 0 3px 0;"><strong>Coffee Shop Sales Analysis</strong></p>
        <p style="font-size: 10pt; margin: 0 0 5px 0; font-style: italic;">Tools: Advanced Excel</p>
        <ul style="font-size: 11pt; margin: 0 0 15px 0; padding-left: 20px;">
          <li>Built interactive sales dashboard using Pivot Tables, Charts, and advanced Excel formulas</li>
          <li>Analyzed sales trends, product performance, and customer purchasing patterns</li>
          <li>Developed KPI tracking system for monitoring key business metrics</li>
        </ul>
        
        <h2 style="font-size: 12pt; margin: 20px 0 10px 0; border-bottom: 2px solid #000; padding-bottom: 3px; text-transform: uppercase;">Certifications</h2>
        <ul style="font-size: 11pt; margin: 0 0 15px 0; padding-left: 20px;">
          <li>SQL Advanced Certification - HackerRank</li>
          <li>SQL Intermediate Certification - HackerRank</li>
          <li>SQL Basic Certification - HackerRank</li>
          <li>Python Basic Certification - HackerRank</li>
          <li>Power BI for Beginners - SimpliLearn</li>
          <li>Power BI Workshop - OfficeMaster</li>
          <li>Introduction to MS Excel - SimpliLearn</li>
          <li>Data Science & Analytics - HP Life</li>
          <li>Introduction to Data Science - SimpliLearn</li>
          <li>Databricks for Machine Learning - SimpliLearn</li>
          <li>Software Engineer Certification - HackerRank</li>
          <li>Future Forward Certificate</li>
          <li>Tech War Certificate</li>
        </ul>
        
        <h2 style="font-size: 12pt; margin: 20px 0 10px 0; border-bottom: 2px solid #000; padding-bottom: 3px; text-transform: uppercase;">Education</h2>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>NSDC Skill Certificate</strong> - Continuing</p>
        <p style="font-size: 10pt; margin: 0 0 10px 0;">Skills: Python, SQL, Excel, Power BI, Data Analytics</p>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Bachelor's Degree</strong> - 2018</p>
        <p style="font-size: 11pt; margin: 0 0 5px 0;"><strong>Higher Secondary (12th)</strong> - 2015</p>
        <p style="font-size: 11pt; margin: 0 0 15px 0;"><strong>Secondary School (10th)</strong> - 2013</p>
        
        <h2 style="font-size: 12pt; margin: 20px 0 10px 0; border-bottom: 2px solid #000; padding-bottom: 3px; text-transform: uppercase;">Key Strengths</h2>
        <p style="font-size: 11pt; margin: 0;">Data Analysis | Data Visualization | Dashboard Development | SQL Query Optimization | Excel Automation | Problem Solving | Attention to Detail | Critical Thinking | Team Collaboration</p>
      </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = atsHTML;
    document.body.appendChild(tempDiv);

    const opt = {
      margin: 0.4,
      filename: 'Parth_Bhagat_Data_Analyst_Resume_ATS.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(tempDiv).save();
    } finally {
      document.body.removeChild(tempDiv);
      setIsGeneratingATS(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background py-12 md:py-20 px-4 sm:px-6">
        {/* Action buttons - hidden when printing */}
        <div className="print:hidden fixed bottom-6 right-6 md:top-24 md:right-8 z-50 flex flex-col md:flex-row gap-3 items-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleDownloadATS} disabled={isGeneratingATS} variant="secondary" className="gap-2 shadow-lg backdrop-blur-sm bg-secondary/90">
                <FileText size={18} className={isGeneratingATS ? "animate-pulse" : ""} />
                <span className="hidden sm:inline">{isGeneratingATS ? 'Generating...' : 'ATS Resume'}</span>
                <span className="sm:hidden">ATS</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[250px] text-center">
              <p>ATS-friendly format is plain text that can be easily parsed by Applicant Tracking Systems used by recruiters</p>
            </TooltipContent>
          </Tooltip>
          <Button onClick={handleDownloadPDF} disabled={isDownloading} className="gap-2 shadow-lg">
            <Download size={18} />
            <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download PDF'}</span>
            <span className="sm:hidden">PDF</span>
          </Button>
          <Button onClick={handlePrint} variant="outline" className="gap-2 shadow-lg bg-background/90 backdrop-blur-sm">
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </Button>
        </div>

        {/* Resume content */}
        <div ref={resumeRef} className="max-w-[850px] mx-auto bg-white text-black p-6 sm:p-10 md:p-16 shadow-2xl rounded-sm print:p-8 print:shadow-none print:max-w-none">
          {/* Header */}
          <header className="border-b-2 border-blue-600 pb-6 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-2 tracking-tight">PARTH BHAGAT</h1>
            <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 uppercase tracking-wider">Data Analyst</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href="mailto:parthpbhagat@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Mail size={16} />
                parthpbhagat@gmail.com
              </a>
              <a href="tel:+919011494385" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Phone size={16} />
                +91 9011494385
              </a>
              <span className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} />
                Ahmedabad, Gujarat
              </span>
              <a href="https://github.com/parthpbhagat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Github size={16} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/parth-p-bhagat-203162369" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </header>

          {/* Career Objective */}
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-100 pb-2 mb-4 flex items-center gap-3">
              <Target size={20} />
              Career Objective
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              Aspiring Data Analyst seeking an internship opportunity to leverage my skills in data analysis, SQL, Python,
              and data visualization tools like Power BI and Excel to derive actionable insights from complex datasets.
              Eager to apply my analytical mindset and problem-solving abilities to help organizations make data-driven decisions.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-800 border-b border-blue-200 pb-1 mb-2 flex items-center gap-2">
              <Code size={14} />
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BarChart3 size={12} className="text-blue-600" />
                  <span className="font-semibold">Data Visualization:</span>
                  <span className="text-gray-700">Power BI, DAX, Power Query</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database size={12} className="text-blue-600" />
                  <span className="font-semibold">Database:</span>
                  <span className="text-gray-700">SQL (Basic, Intermediate, Advanced)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet size={12} className="text-blue-600" />
                  <span className="font-semibold">Spreadsheets:</span>
                  <span className="text-gray-700">Advanced Excel, Pivot Tables, VLOOKUP</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Code size={12} className="text-blue-600" />
                  <span className="font-semibold">Programming:</span>
                  <span className="text-gray-700">Python, SQL</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={12} className="text-blue-600" />
                  <span className="font-semibold">Analytics:</span>
                  <span className="text-gray-700">Data Cleaning, ETL, Data Modeling</span>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-800 border-b border-blue-200 pb-1 mb-2 flex items-center gap-2">
              <BarChart3 size={14} />
              Projects
            </h2>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-blue-600 pl-3 bg-blue-50/50 py-2 -ml-0.5">
                <h3 className="font-bold text-blue-800">AdventureWorks Sales Dashboard (Power BI)</h3>
                <p className="text-gray-500 text-[10px] mb-1">Technologies: Power BI, DAX, Power Query, Data Modeling</p>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                  <li>Built comprehensive dashboard analyzing $24.9M revenue, $10.5M profit, and 25.2K orders</li>
                  <li>Designed revenue trending, product performance, and customer segmentation visualizations</li>
                  <li>Implemented key influencer analysis and return rate tracking (2.2%)</li>
                  <li>Created interactive filters for category, product, and time-based analysis</li>
                </ul>
              </div>
              <div className="border-l-2 border-blue-400 pl-3">
                <h3 className="font-bold text-gray-800">Hotel Booking Analysis Dashboard</h3>
                <p className="text-gray-500 text-[10px] mb-1">Technologies: Python, SQL, Excel, HTML, CSS</p>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                  <li>Analyzed hotel booking data to identify trends, cancellation patterns, and revenue insights</li>
                  <li>Created interactive visualizations to present key metrics and business recommendations</li>
                </ul>
              </div>
              <div className="border-l-2 border-blue-400 pl-3">
                <h3 className="font-bold text-gray-800">Coffee Shop Sales Analysis</h3>
                <p className="text-gray-500 text-[10px] mb-1">Technologies: Microsoft Excel</p>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                  <li>Analyzed sales data using Excel pivot tables, charts, and advanced formulas</li>
                  <li>Created comprehensive sales dashboard with key performance indicators</li>
                </ul>
              </div>
              <div className="border-l-2 border-blue-600 pl-3 bg-blue-50/50 py-2 -ml-0.5">
                <h3 className="font-bold text-blue-800">IPL Match Analysis Dashboard (Power BI)</h3>
                <p className="text-gray-500 text-[10px] mb-1">Technologies: Power BI, DAX, Power Query, Data Modeling</p>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                  <li>Interactive Dashboards: Dynamic filtering by season, team, and venue for customized insights.</li>
                  <li>Advanced DAX Calculations: Custom measures developed for calculating Batting Strike Rates, Bowling Economy, and Phase-wise play analysis.</li>
                  <li>Data Modeling: Optimized Star Schema connecting fact tables (ball-by-ball deliveries, match results) with dimension tables (players, teams) for efficient querying.</li>
                  <li>UI/UX Design: Clean and intuitive interface for seamless data exploration and storytelling.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-blue-800 border-b border-blue-200 pb-1 mb-2">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {[
              { name: "Power BI for Beginners", org: "SimpliLearn", color: "bg-blue-500" },
              { name: "Power BI Workshop", org: "OfficeMaster", color: "bg-blue-500" },
              { name: "SQL (Advanced)", org: "HackerRank", color: "bg-green-500", link: "https://www.hackerrank.com/certificates/iframe/2485af92b929" },
              { name: "SQL (Intermediate)", org: "HackerRank", color: "bg-green-500", link: "https://www.hackerrank.com/certificates/iframe/71e49cece4ce" },
              { name: "SQL (Basic)", org: "HackerRank", color: "bg-green-500", link: "https://www.hackerrank.com/certificates/iframe/d15b330465ee" },
              { name: "Python (Basic)", org: "HackerRank", color: "bg-purple-500", link: "https://www.hackerrank.com/certificates/iframe/e089c7e204d7" },
              { name: "Data Science & Analytics", org: "HP Life", color: "bg-orange-500", link: "https://www.life-global.org/certificate/6a9c6aff-a83b-4cf0-9500-aefcbb8bc14a" },
              { name: "Introduction to MS Excel", org: "SimpliLearn", color: "bg-orange-500" },
              { name: "Databricks for ML", org: "SimpliLearn", color: "bg-red-500" },
              { name: "Software Engineer", org: "HackerRank", color: "bg-blue-500", link: "https://www.hackerrank.com/certificates/1282187483c1" },
              { name: "Future Forward", org: "Certificate", color: "bg-cyan-500" },
              { name: "Tech War", org: "Certificate", color: "bg-cyan-500" }
            ].map((cert, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 ${cert.color} rounded-full`}></div>
                  <span className="font-medium">{cert.name}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors print:hidden">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <span className="text-gray-500 text-xs shrink-0 ml-2">{cert.org}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Skills Certificate */}
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div>
                <span className="font-bold text-base">NSDC Skill Certificate</span>
                <p className="text-gray-600">Python, SQL, Excel, HTML, CSS, Power BI, Data Analytics</p>
              </div>
              <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full text-xs">Continuing</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div>
                <span className="font-bold text-base">Bachelor's Degree</span>
                <p className="text-gray-600">Undergraduate Program</p>
              </div>
              <span className="text-gray-500 text-xs font-medium">Completed 2018</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div>
                <span className="font-bold text-base">Higher Secondary (12th Standard)</span>
                <p className="text-gray-600">Arts Stream | Result: 53.54%</p>
              </div>
              <span className="text-gray-500 text-xs font-medium">2015</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div>
                <span className="font-bold text-base">Secondary School (10th Standard)</span>
                <p className="text-gray-600">Result: 55.60%</p>
              </div>
              <span className="text-gray-500 text-xs font-medium">2013</span>
            </div>
          </div>
        </section>

        {/* Key Strengths */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest text-blue-800 border-b-2 border-blue-100 pb-2 mb-4">
            Key Strengths
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Dashboard Development", "Data Visualization", "Data Cleaning & ETL", 
              "Report Generation", "Problem Solving", "Quick Learner", "Team Collaboration"
            ].map((strength, i) => (
              <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 font-medium text-xs md:text-sm shadow-sm">
                {strength}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 pt-8 border-t border-gray-100 italic">
          References available upon request
        </footer>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
      </div>
    </TooltipProvider>
  );
};

export default Resume;
