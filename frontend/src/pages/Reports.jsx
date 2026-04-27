import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchReports, downloadReport } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load reports', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, [toast]);

  const handleDownload = async (reportId, reportTitle) => {
    try {
      const blob = await downloadReport(reportId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportTitle.replace(/\s+/g, '_')}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to download report', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading reports...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Reports</h1>
          <p className="text-xl text-muted-foreground">Download and view your investment reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="mt-1">{report.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{report.date}</span>
                    </div>
                    <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{report.type}</Badge>
                    <Button 
                      size="sm" 
                      className="flex items-center space-x-1"
                      disabled={report.status !== 'Ready'}
                      onClick={() => handleDownload(report.id, report.title)}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Custom Report Generator</CardTitle>
            <CardDescription>Generate customized reports based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2"
                onClick={() => {
                  // Generate performance report
                  toast({ title: 'Report Generated', description: 'Performance Report is ready for download', variant: 'default' });
                }}
              >
                <FileText className="h-6 w-6" />
                <span>Performance Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2"
                onClick={() => {
                  // Generate tax report
                  toast({ title: 'Report Generated', description: 'Tax Report is ready for download', variant: 'default' });
                }}
              >
                <FileText className="h-6 w-6" />
                <span>Tax Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2"
                onClick={() => {
                  // Generate holdings report
                  toast({ title: 'Report Generated', description: 'Holdings Report is ready for download', variant: 'default' });
                }}
              >
                <FileText className="h-6 w-6" />
                <span>Holdings Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Reports;









