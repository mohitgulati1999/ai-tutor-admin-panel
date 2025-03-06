
import { useState } from 'react';
import { PlusCircle, X, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type SubTopic = {
  id: string;
  title: string;
  content: string;
  file: File | null;
};

type Topic = {
  id: string;
  title: string;
  expanded: boolean;
  subTopics: SubTopic[];
};

const CourseForm = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTopic = () => {
    setTopics([
      ...topics, 
      { 
        id: crypto.randomUUID(), 
        title: '', 
        expanded: true, 
        subTopics: []
      }
    ]);
  };

  const removeTopic = (topicId: string) => {
    setTopics(topics.filter(topic => topic.id !== topicId));
  };

  const toggleTopicExpansion = (topicId: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, expanded: !topic.expanded } : topic
    ));
  };

  const updateTopicTitle = (topicId: string, title: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, title } : topic
    ));
  };

  const addSubTopic = (topicId: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { 
        ...topic, 
        subTopics: [
          ...topic.subTopics, 
          { id: crypto.randomUUID(), title: '', content: '', file: null }
        ] 
      } : topic
    ));
  };

  const removeSubTopic = (topicId: string, subTopicId: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { 
        ...topic, 
        subTopics: topic.subTopics.filter(st => st.id !== subTopicId)
      } : topic
    ));
  };

  const updateSubTopic = (topicId: string, subTopicId: string, updates: Partial<SubTopic>) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { 
        ...topic, 
        subTopics: topic.subTopics.map(st => 
          st.id === subTopicId ? { ...st, ...updates } : st
        )
      } : topic
    ));
  };

  const handleFileUpload = (topicId: string, subTopicId: string, file: File) => {
    // Only accept text files
    if (file.type !== 'text/plain') {
      toast.error('Only text files (.txt) are allowed');
      return;
    }
    
    // Read file contents
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      updateSubTopic(topicId, subTopicId, { file, content });
      toast.success(`File "${file.name}" uploaded successfully`);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!courseTitle.trim()) {
      toast.error('Please enter a course title');
      return;
    }

    if (topics.length === 0) {
      toast.error('Please add at least one topic');
      return;
    }

    // Check if any topic is missing a title
    const invalidTopic = topics.find(topic => !topic.title.trim());
    if (invalidTopic) {
      toast.error('All topics must have a title');
      return;
    }

    // Check if any subtopic is missing a title
    for (const topic of topics) {
      const invalidSubTopic = topic.subTopics.find(st => !st.title.trim());
      if (invalidSubTopic) {
        toast.error(`All subtopics in "${topic.title}" must have a title`);
        return;
      }
    }

    // Submit form
    setIsSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to the backend
      console.log('Course data:', { courseTitle, topics });
      
      toast.success('Course created successfully');
      // Reset form after successful submission
      setCourseTitle('');
      setTopics([]);
    } catch (error) {
      toast.error('Failed to create course');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Course Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="courseTitle" className="block text-sm font-medium mb-1">
              Course Title
            </label>
            <Input
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter course title"
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Topics</h2>
          <Button
            type="button"
            onClick={addTopic}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Topic
          </Button>
        </div>

        {topics.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No topics added yet. Click the button above to add a topic.
          </div>
        )}

        <div className="space-y-6">
          {topics.map((topic, topicIndex) => (
            <div key={topic.id} className="glass-card border-primary/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-sm">
                    {topicIndex + 1}
                  </span>
                  <h3 className="text-lg font-medium">Topic</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => toggleTopicExpansion(topic.id)}
                    variant="ghost"
                    size="sm"
                  >
                    {topic.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => removeTopic(topic.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {topic.expanded && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Topic Title
                    </label>
                    <Input
                      value={topic.title}
                      onChange={(e) => updateTopicTitle(topic.id, e.target.value)}
                      placeholder="Enter topic title"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium">Subtopics</h4>
                      <Button
                        type="button"
                        onClick={() => addSubTopic(topic.id)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <PlusCircle className="h-3 w-3" />
                        Add Subtopic
                      </Button>
                    </div>

                    {topic.subTopics.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm border border-dashed rounded-md">
                        No subtopics added yet. Click the button above to add a subtopic.
                      </div>
                    )}

                    <div className="space-y-4">
                      {topic.subTopics.map((subTopic, subTopicIndex) => (
                        <div 
                          key={subTopic.id} 
                          className="p-4 border border-border rounded-md bg-secondary/30"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-xs">
                                {subTopicIndex + 1}
                              </span>
                              <h5 className="text-sm font-medium">Subtopic</h5>
                            </div>
                            <Button
                              type="button"
                              onClick={() => removeSubTopic(topic.id, subTopic.id)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium mb-1">
                                Subtopic Title
                              </label>
                              <Input
                                value={subTopic.title}
                                onChange={(e) => updateSubTopic(
                                  topic.id, 
                                  subTopic.id, 
                                  { title: e.target.value }
                                )}
                                placeholder="Enter subtopic title"
                                className="text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium mb-1">
                                Content
                              </label>
                              <div className="flex items-center gap-2 mb-2">
                                <label className={cn(
                                  "flex-1 flex items-center justify-center h-20 border border-dashed rounded-md cursor-pointer",
                                  "hover:bg-secondary/50 transition-colors",
                                  subTopic.file ? "border-primary/40 bg-primary/5" : "border-border"
                                )}>
                                  <input
                                    type="file"
                                    accept=".txt"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleFileUpload(topic.id, subTopic.id, file);
                                      }
                                    }}
                                  />
                                  <div className="flex flex-col items-center text-center p-2">
                                    <Upload className="h-5 w-5 mb-1 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {subTopic.file ? subTopic.file.name : 'Upload content (.txt)'}
                                    </span>
                                  </div>
                                </label>
                              </div>
                              
                              {subTopic.content && (
                                <Textarea
                                  value={subTopic.content}
                                  onChange={(e) => updateSubTopic(
                                    topic.id, 
                                    subTopic.id, 
                                    { content: e.target.value }
                                  )}
                                  placeholder="Enter or edit content"
                                  className="min-h-[100px] text-sm"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Saving...' : 'Save Course'}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
