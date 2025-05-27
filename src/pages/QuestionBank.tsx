import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer?: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Short Answer' | 'Long Answer';
  marks: number;
}

const QuestionBank = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
      subject: 'Geography',
      topic: 'World Capitals',
      difficulty: 'Easy',
      type: 'MCQ',
      marks: 2
    },
    {
      id: '2',
      question: 'Explain the process of photosynthesis.',
      subject: 'Biology',
      topic: 'Plant Biology',
      difficulty: 'Medium',
      type: 'Long Answer',
      marks: 10
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: 'MCQ',
    difficulty: 'Easy',
    marks: 2
  });

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addQuestion = () => {
    if (!newQuestion.question || !newQuestion.subject || !newQuestion.topic) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.question!,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
      subject: newQuestion.subject!,
      topic: newQuestion.topic!,
      difficulty: newQuestion.difficulty!,
      type: newQuestion.type!,
      marks: newQuestion.marks!
    };

    setQuestions([...questions, question]);
    setNewQuestion({ type: 'MCQ', difficulty: 'Easy', marks: 2 });
    setShowAddForm(false);
    
    toast({
      title: "Success",
      description: "Question added successfully"
    });
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Success",
      description: "Question deleted successfully"
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
              <h1 className="text-2xl font-bold text-gray-900 ml-4">Question Bank</h1>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Question Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Question</CardTitle>
              <CardDescription>Create a new question for your question bank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newQuestion.subject || ''}
                    onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
                    placeholder="e.g., Mathematics, Science"
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={newQuestion.topic || ''}
                    onChange={(e) => setNewQuestion({...newQuestion, topic: e.target.value})}
                    placeholder="e.g., Algebra, Physics"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={newQuestion.question || ''}
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  placeholder="Enter your question here..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newQuestion.type}
                    onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value as Question['type']})}
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="Short Answer">Short Answer</option>
                    <option value="Long Answer">Long Answer</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value as Question['difficulty']})}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="marks">Marks</Label>
                  <Input
                    id="marks"
                    type="number"
                    value={newQuestion.marks || 2}
                    onChange={(e) => setNewQuestion({...newQuestion, marks: parseInt(e.target.value)})}
                    min="1"
                    max="20"
                  />
                </div>
              </div>

              {newQuestion.type === 'MCQ' && (
                <div>
                  <Label>Options (one per line)</Label>
                  <Textarea
                    placeholder="Option A&#10;Option B&#10;Option C&#10;Option D"
                    onChange={(e) => setNewQuestion({...newQuestion, options: e.target.value.split('\n').filter(o => o.trim())})}
                    rows={4}
                  />
                  <div className="mt-2">
                    <Label htmlFor="correctAnswer">Correct Answer</Label>
                    <Input
                      id="correctAnswer"
                      value={newQuestion.correctAnswer || ''}
                      onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                      placeholder="Enter the correct answer"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button onClick={addQuestion}>Add Question</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filteredQuestions.length} question(s) found
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{question.question}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">{question.subject}</Badge>
                      <Badge variant="outline">{question.topic}</Badge>
                      <Badge 
                        variant={question.difficulty === 'Easy' ? 'default' : 
                                question.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                      >
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.type}</Badge>
                      <Badge variant="outline">{question.marks} marks</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {question.options && (
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded text-sm ${
                          option === question.correctAnswer 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-gray-50'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default QuestionBank;