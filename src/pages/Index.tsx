import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, BookOpen, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">ExamPaper Generator</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/question-bank">
                <Button variant="ghost">Question Bank</Button>
              </Link>
              <Link to="/generate-paper">
                <Button variant="ghost">Generate Paper</Button>
              </Link>
              <Link to="/papers">
                <Button variant="ghost">My Papers</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Create Professional Exam Papers in Minutes
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build comprehensive question papers with our intelligent generator. 
            Manage question banks, set difficulty levels, and export ready-to-use exam papers.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/generate-paper">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-5 w-5" />
                Generate New Paper
              </Button>
            </Link>
            <Link to="/question-bank">
              <Button size="lg" variant="outline">
                <BookOpen className="mr-2 h-5 w-5" />
                Manage Questions
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
                Question Bank
              </CardTitle>
              <CardDescription>
                Create and organize questions by subject, topic, and difficulty level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/question-bank">
                <Button className="w-full">Manage Questions</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 text-green-600 mr-2" />
                Paper Generator
              </CardTitle>
              <CardDescription>
                Automatically generate papers based on your criteria and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/generate-paper">
                <Button className="w-full">Generate Paper</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-6 w-6 text-purple-600 mr-2" />
                Paper Library
              </CardTitle>
              <CardDescription>
                View, edit, and export your previously generated exam papers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/papers">
                <Button className="w-full">View Papers</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Platform Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">150+</div>
              <div className="text-gray-600">Questions Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25+</div>
              <div className="text-gray-600">Papers Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-gray-600">Subjects Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">3</div>
              <div className="text-gray-600">Difficulty Levels</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;