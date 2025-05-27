import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PaperConfig {
  title: string;
  duration: number;
  totalMarks: number;
  instructions: string;
  subjects: string[];
  difficulties: string[];
  questionTypes: string[];
  mcqCount: number;
  shortAnswerCount: number;
  longAnswerCount: number;
}

const GeneratePaper = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<PaperConfig>({
    title: '',
    duration: 180,
    totalMarks: 100,
    instructions: 'Read all questions carefully before answering.',
    subjects: [],
    difficulties: [],
    questionTypes: [],
    mcqCount: 10,
    shortAnswerCount: 5,
    longAnswerCount: 3
  });

  const [generatedPaper, setGeneratedPaper] = useState<any>(null);

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const questionTypes = ['MCQ', 'Short Answer', 'Long Answer'];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setConfig({...config, subjects: [...config.subjects, subject]});
    } else {
      setConfig({...config, subjects: config.subjects.filter(s => s !== subject)});
    }
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setConfig({...config, difficulties: [...config.difficulties, difficulty]});
    } else {
      setConfig({...config, difficulties: config.difficulties.filter(d => d !== difficulty)});
    }
  };

  const generatePaper = () => {
    if (!config.title || config.subjects.length === 0) {
      toast({
        title: "Error",
        description: "Please provide a title and select at least one subject",
        variant: "destructive"
      });
      return;
    }

    // Mock paper generation
    const mockPaper = {
      id: Date.now().toString(),
      title: config.title,
      duration: config.duration,
      totalMarks: config.totalMarks,
      instructions: config.instructions,
      generatedAt: new Date().toISOString(),
      sections: [
        {
          title: "Section A - Multiple Choice Questions",
          instructions: "Choose the correct answer from the given options.",
          questions: Array.from({length: config.mcqCount}, (_, i) => ({
            id: `mcq_${i + 1}`,
            question: `Sample MCQ question ${i + 1} from ${config.subjects[i % config.subjects.length]}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            marks: 2
          }))
        },
        {
          title: "Section B - Short Answer Questions",
          instructions: "Answer in 50-100 words.",
          questions: Array.from({length: config.shortAnswerCount}, (_, i) => ({
            id: `short_${i + 1}`,
            question: `Sample short answer question ${i + 1} from ${config.subjects[i % config.subjects.length]}.`,
            marks: 5
          }))
        },
        {
          title: "Section C - Long Answer Questions",
          instructions: "Answer in 200-300 words.",
          questions: Array.from({length: config.longAnswerCount}, (_, i) => ({
            id: `long_${i + 1}`,
            question: `Sample long answer question ${i + 1} from ${config.subjects[i % config.subjects.length]}.`,
            marks: 10
          }))
        }
      ]
    };

    setGeneratedPaper(mockPaper);
    
    toast({
      title: "Success",
      description: "Paper generated successfully!"
    });
  };

  const downloadPaper = () => {
    const content = `
EXAMINATION PAPER
${generatedPaper.title}
Duration: ${generatedPaper.duration} minutes
Total Marks: ${generatedPaper.totalMarks}

INSTRUCTIONS:
${generatedPaper.instructions}

${generatedPaper.sections.map((section: any, index: number) => `
${section.title}
${section.instructions}

${section.questions.map((q: any, qIndex: number) => `
Q${qIndex + 1}. ${q.question} [${q.marks} marks]
${q.options ? q.options.map((opt: string, optIndex: number) => `
   ${String.fromCharCode(65 + optIndex)}. ${opt}`).join('') : ''}

`).join('')}
`).join('')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPaper.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: "Paper downloaded successfully!"
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
              <h1 className="text-2xl font-bold text-gray-900 ml-4">Generate Paper</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paper Configuration</CardTitle>
                <CardDescription>Set up your examination paper parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Paper Title</Label>
                  <Input
                    id="title"
                    value={config.title}
                    onChange={(e) => setConfig({...config, title: e.target.value})}
                    placeholder="e.g., Mathematics Final Examination"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={config.duration}
                      onChange={(e) => setConfig({...config, duration: parseInt(e.target.value)})}
                      min="30"
                      max="300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      value={config.totalMarks}
                      onChange={(e) => setConfig({...config, totalMarks: parseInt(e.target.value)})}
                      min="50"
                      max="200"
                    />
                  </div>
                </div>

                <div>
                  <Label>Subjects</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={config.subjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                        />
                        <Label htmlFor={`subject-${subject}`} className="text-sm">{subject}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Difficulty Levels</Label>
                  <div className="flex space-x-4 mt-2">
                    {difficulties.map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`difficulty-${difficulty}`}
                          checked={config.difficulties.includes(difficulty)}
                          onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                        />
                        <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">{difficulty}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Question Distribution</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="mcqCount" className="text-sm">MCQ Questions</Label>
                      <Input
                        id="mcqCount"
                        type="number"
                        value={config.mcqCount}
                        onChange={(e) => setConfig({...config, mcqCount: parseInt(e.target.value)})}
                        min="0"
                        max="20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shortAnswerCount" className="text-sm">Short Answer</Label>
                      <Input
                        id="shortAnswerCount"
                        type="number"
                        value={config.shortAnswerCount}
                        onChange={(e) => setConfig({...config, shortAnswerCount: parseInt(e.target.value)})}
                        min="0"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longAnswerCount" className="text-sm">Long Answer</Label>
                      <Input
                        id="longAnswerCount"
                        type="number"
                        value={config.longAnswerCount}
                        onChange={(e) => setConfig({...config, longAnswerCount: parseInt(e.target.value)})}
                        min="0"
                        max="5"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={generatePaper} className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Paper
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            {generatedPaper ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Generated Paper</CardTitle>
                      <CardDescription>Preview and download your exam paper</CardDescription>
                    </div>
                    <Button onClick={downloadPaper}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="text-center border-b pb-4">
                      <h2 className="text-xl font-bold">{generatedPaper.title}</h2>
                      <p className="text-sm text-gray-600">
                        Duration: {generatedPaper.duration} minutes | Total Marks: {generatedPaper.totalMarks}
                      </p>
                    </div>

                    <div className="text-sm">
                      <strong>Instructions:</strong> {generatedPaper.instructions}
                    </div>

                    {generatedPaper.sections.map((section: any, index: number) => (
                      <div key={index} className="border-t pt-4">
                        <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{section.instructions}</p>
                        <div className="space-y-3">
                          {section.questions.slice(0, 3).map((question: any, qIndex: number) => (
                            <div key={question.id} className="text-sm">
                              <p className="font-medium">Q{qIndex + 1}. {question.question} [{question.marks} marks]</p>
                              {question.options && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {question.options.map((option: string, optIndex: number) => (
                                    <p key={optIndex} className="text-gray-600">
                                      {String.fromCharCode(65 + optIndex)}. {option}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          {section.questions.length > 3 && (
                            <p className="text-sm text-gray-500 italic">
                              ... and {section.questions.length - 3} more questions
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Configure your paper settings and click "Generate Paper" to preview</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeneratePaper;