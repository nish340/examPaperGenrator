import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, FileText, Download, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SavedPaper {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalMarks: number;
  questionCount: number;
  createdAt: string;
  lastModified: string;
}

const Papers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [papers] = useState<SavedPaper[]>([
    {
      id: '1',
      title: 'Mathematics Final Examination',
      subject: 'Mathematics',
      duration: 180,
      totalMarks: 100,
      questionCount: 25,
      createdAt: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: '2',
      title: 'Science Mid-term Test',
      subject: 'Science',
      duration: 120,
      totalMarks: 80,
      questionCount: 20,
      createdAt: '2024-01-10',
      lastModified: '2024-01-12'
    },
    {
      id: '3',
      title: 'English Literature Quiz',
      subject: 'English',
      duration: 90,
      totalMarks: 50,
      questionCount: 15,
      createdAt: '2024-01-08',
      lastModified: '2024-01-08'
    }
  ]);

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (paper: SavedPaper) => {
    // Mock download functionality
    const content = `
EXAMINATION PAPER
${paper.title}
Duration: ${paper.duration} minutes
Total Marks: ${paper.totalMarks}

[This would contain the full paper content...]
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paper.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: `${paper.title} downloaded successfully!`
    });
  };

  const handleDelete = (paperId: string) => {
    toast({
      title: "Deleted",
      description: "Paper deleted successfully!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 ml-4">Paper Library</h1>
            </div>
            <Link to="/generate-paper">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate New Paper
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredPapers.length} paper(s) found
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                    <CardDescription className="mb-3">
                      Created: {new Date(paper.createdAt).toLocaleDateString()}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{paper.subject}</Badge>
                      <Badge variant="outline">{paper.duration} min</Badge>
                      <Badge variant="outline">{paper.totalMarks} marks</Badge>
                      <Badge variant="outline">{paper.questionCount} questions</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Modified: {new Date(paper.lastModified).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" title="Preview">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDownload(paper)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(paper.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first examination paper to get started'}
            </p>
            <Link to="/generate-paper">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate New Paper
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Papers;