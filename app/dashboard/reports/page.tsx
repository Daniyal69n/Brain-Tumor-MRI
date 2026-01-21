'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, FileText, Calendar, User } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      patientId: 'Patient #001',
      generatedDate: '2025-11-20',
      reportType: 'Full Volumetric Analysis',
      fileSize: '2.4 MB',
      status: 'Available',
    },
    {
      id: 2,
      patientId: 'Patient #002',
      generatedDate: '2025-11-19',
      reportType: 'Full Volumetric Analysis',
      fileSize: '2.1 MB',
      status: 'Available',
    },
    {
      id: 3,
      patientId: 'Patient #003',
      generatedDate: '2025-11-18',
      reportType: 'Summary Report',
      fileSize: '1.8 MB',
      status: 'Available',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">View and download volumetric analysis reports</p>
        </div>
        <Button variant="primary">
          <FileText className="w-5 h-5 mr-2" />
          Generate New Report
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Report Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Generated Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">File Size</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{report.patientId}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{report.reportType}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {report.generatedDate}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{report.fileSize}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Report Generation Info */}
      <Card title="Report Information">
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Reports include comprehensive volumetric analysis data including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Detailed volumetric ratios for Gray Matter, White Matter, and CSF</li>
            <li>Performance metrics (Dice Score, IoU, Accuracy, F1-Score)</li>
            <li>Segmentation visualizations and overlays</li>
            <li>Model performance comparisons</li>
            <li>Statistical analysis and confidence intervals</li>
          </ul>
          <p className="pt-2">
            Reports are generated in PDF format and can be downloaded for clinical documentation and research purposes.
          </p>
        </div>
      </Card>
    </div>
  );
}

