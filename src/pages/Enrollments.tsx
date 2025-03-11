
import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, UserCheck, UserMinus } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

// Mock data for enrolled candidates
const mockEnrolledCandidates = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    enrolledCourses: [
      { id: 'c1', name: 'Machine Learning Basics', enrollmentDate: '2023-10-15' },
      { id: 'c2', name: 'Deep Learning Fundamentals', enrollmentDate: '2023-09-20' }
    ]
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 987-6543',
    enrolledCourses: [
      { id: 'c1', name: 'Machine Learning Basics', enrollmentDate: '2023-10-14' },
      { id: 'c3', name: 'Natural Language Processing', enrollmentDate: '2023-10-05' }
    ]
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    enrolledCourses: [
      { id: 'c2', name: 'Deep Learning Fundamentals', enrollmentDate: '2023-09-30' }
    ]
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1 (555) 567-8901',
    enrolledCourses: [
      { id: 'c3', name: 'Natural Language Processing', enrollmentDate: '2023-09-15' },
      { id: 'c4', name: 'Reinforcement Learning', enrollmentDate: '2023-10-10' }
    ]
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '+1 (555) 234-5678',
    enrolledCourses: [
      { id: 'c1', name: 'Machine Learning Basics', enrollmentDate: '2023-09-25' },
      { id: 'c4', name: 'Reinforcement Learning', enrollmentDate: '2023-10-08' }
    ]
  }
];

const Enrollments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledCandidates, setEnrolledCandidates] = useState(mockEnrolledCandidates);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const filteredCandidates = enrolledCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.enrolledCourses.some(course => 
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalRegisteredCandidates = enrolledCandidates.length;
  const totalEnrollments = enrolledCandidates.reduce(
    (total, candidate) => total + candidate.enrolledCourses.length, 0
  );

  const handleRemoveCourseDialog = (candidate: any, course: any) => {
    setSelectedCandidate(candidate);
    setSelectedCourse(course);
    setShowRemoveDialog(true);
  };

  const handleRemoveCourse = () => {
    // Find the candidate
    const updatedCandidates = enrolledCandidates.map(candidate => {
      if (candidate.id === selectedCandidate.id) {
        // Remove the selected course
        const updatedCourses = candidate.enrolledCourses.filter(
          course => course.id !== selectedCourse.id
        );
        
        return {
          ...candidate,
          enrolledCourses: updatedCourses
        };
      }
      return candidate;
    });
    
    // Filter out candidates with no enrolled courses
    const filteredCandidates = updatedCandidates.filter(
      candidate => candidate.enrolledCourses.length > 0
    );
    
    setEnrolledCandidates(filteredCandidates);
    setShowRemoveDialog(false);
    
    toast({
      title: "Course removed",
      description: `${selectedCourse.name} has been removed from ${selectedCandidate.name}'s enrollments.`,
    });
  };

  return (
    <Layout>
      <PageHeader 
        title="Enrollments" 
        subtitle="Manage candidate course enrollments" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Candidates</CardTitle>
            <CardDescription>Registered candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-primary mr-4" />
              <span className="text-3xl font-bold">{totalRegisteredCandidates}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Total Enrollments</CardTitle>
            <CardDescription>Across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-blue-500 mr-4" />
              <span className="text-3xl font-bold">{totalEnrollments}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search candidates, courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full md:w-auto">
            Filter
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            Export
          </Button>
        </div>
      </div>
      
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <h3 className="text-lg font-medium mb-2">No candidates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{candidate.name}</CardTitle>
                    <CardDescription>
                      {candidate.email} | {candidate.phone}
                    </CardDescription>
                  </div>
                  <Badge className="bg-primary">
                    {candidate.enrolledCourses.length} {candidate.enrolledCourses.length === 1 ? 'Course' : 'Courses'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidate.enrolledCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{new Date(course.enrollmentDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => handleRemoveCourseDialog(candidate, course)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Course Enrollment</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this course from the candidate's enrollments?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && selectedCourse && (
            <div className="py-4">
              <p><span className="font-medium">Candidate:</span> {selectedCandidate.name}</p>
              <p><span className="font-medium">Course:</span> {selectedCourse.name}</p>
              <p><span className="font-medium">Enrollment Date:</span> {new Date(selectedCourse.enrollmentDate).toLocaleDateString()}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveCourse}>
              <UserMinus className="h-4 w-4 mr-2" />
              Remove Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Enrollments;
