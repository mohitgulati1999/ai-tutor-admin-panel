
import { useState } from 'react';
import { PlusCircle, X, Upload, ChevronDown, ChevronUp, Lightbulb, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type ContentType = 'text' | 'file';
type MediaFile = File | null;
type MediaType = 'download' | 'link'; // Define a specific type for media types

type SubTopic = {
  id: string;
  title: string;
  contentType: ContentType;
  content: string;
  file: MediaFile;
  videoFile: MediaFile;
  mediaFiles: { id: string; file: MediaFile; title: string; type: MediaType; url: string }[];
};

type Topic = {
  id: string;
  title: string;
  expanded: boolean;
  subTopics: SubTopic[];
};

// Prompt type options
type PromptType = 'standard' | 'custom';

const CourseForm = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New state for prompt configuration
  const [promptType, setPromptType] = useState<PromptType>('standard');
  const [customPrompt, setCustomPrompt] = useState('');

  // Default standard prompt text
  const standardPrompt = "You are an AI trainer that helps students understand course material and answers questions based on the provided content. Be clear, concise, and helpful in your responses.";

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
          { 
            id: crypto.randomUUID(), 
            title: '', 
            contentType: 'text',
            content: '', 
            file: null,
            videoFile: null,
            mediaFiles: []
          }
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
      updateSubTopic(topicId, subTopicId, { file, content, contentType: 'file' });
      toast.success(`File "${file.name}" uploaded successfully`);
    };
    reader.readAsText(file);
  };

  const handleVideoUpload = (topicId: string, subTopicId: string, file: File) => {
    // Only accept video files
    if (!file.type.startsWith('video/')) {
      toast.error('Only video files are allowed');
      return;
    }
    
    updateSubTopic(topicId, subTopicId, { videoFile: file });
    toast.success(`Video "${file.name}" uploaded successfully`);
  };

  const addMediaFile = (topicId: string, subTopicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    const subTopic = topic.subTopics.find(st => st.id === subTopicId);
    if (!subTopic) return;
    
    const newMediaFiles = [
      ...subTopic.mediaFiles,
      { id: crypto.randomUUID(), file: null, title: '', type: 'download' as MediaType, url: '' }
    ];
    
    updateSubTopic(topicId, subTopicId, { mediaFiles: newMediaFiles });
  };

  const updateMediaFile = (topicId: string, subTopicId: string, mediaId: string, updates: Partial<{file: MediaFile, title: string, type: MediaType, url: string}>) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    const subTopic = topic.subTopics.find(st => st.id === subTopicId);
    if (!subTopic) return;
    
    const updatedMediaFiles = subTopic.mediaFiles.map(media => 
      media.id === mediaId ? { ...media, ...updates } : media
    );
    
    updateSubTopic(topicId, subTopicId, { mediaFiles: updatedMediaFiles });
  };

  const removeMediaFile = (topicId: string, subTopicId: string, mediaId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    const subTopic = topic.subTopics.find(st => st.id === subTopicId);
    if (!subTopic) return;
    
    const updatedMediaFiles = subTopic.mediaFiles.filter(media => media.id !== mediaId);
    
    updateSubTopic(topicId, subTopicId, { mediaFiles: updatedMediaFiles });
  };

  const handleMediaFileUpload = (topicId: string, subTopicId: string, mediaId: string, file: File) => {
    updateMediaFile(topicId, subTopicId, mediaId, { file });
    toast.success(`File "${file.name}" added successfully`);
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

    // If prompt type is custom, validate custom prompt
    if (promptType === 'custom' && !customPrompt.trim()) {
      toast.error('Please enter a custom prompt or use the standard prompt');
      return;
    }

    // Submit form
    setIsSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare submission data including prompt
      const finalPrompt = promptType === 'standard' ? standardPrompt : customPrompt;
      
      // Here you would typically send the data to the backend
      console.log('Course data:', { 
        courseTitle, 
        topics, 
        promptType,
        aiPrompt: finalPrompt 
      });
      
      toast.success('Course created successfully');
      // Reset form after successful submission
      setCourseTitle('');
      setTopics([]);
      setPromptType('standard');
      setCustomPrompt('');
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

      {/* AI Prompt Configuration section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">AI Trainer Prompt</h2>
        </div>
        
        <div className="space-y-4">
          <RadioGroup 
            value={promptType} 
            onValueChange={(value) => setPromptType(value as PromptType)}
            className="space-y-3"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="standard" id="standard-prompt" />
              <div className="grid gap-1.5">
                <Label htmlFor="standard-prompt" className="font-medium">
                  Use Standard Prompt
                </Label>
                <p className="text-sm text-muted-foreground">
                  The AI trainer will use the following default prompt:
                </p>
                <div className="bg-secondary/30 p-3 rounded-md border border-border text-sm">
                  {standardPrompt}
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="custom" id="custom-prompt" />
              <div className="grid gap-1.5 w-full">
                <Label htmlFor="custom-prompt" className="font-medium">
                  Use Custom Prompt
                </Label>
                <p className="text-sm text-muted-foreground">
                  Provide a custom prompt for the AI trainer to better understand how to respond to students.
                </p>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Write a custom prompt for the AI trainer..."
                  disabled={promptType !== 'custom'}
                  className={cn(
                    "min-h-[120px]",
                    promptType !== 'custom' && "opacity-60"
                  )}
                />
              </div>
            </div>
          </RadioGroup>
          
          <div className="text-sm text-muted-foreground mt-2 flex items-start gap-2">
            <div className="h-5 w-5 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <p>
              The prompt helps guide how the AI responds to students. A good prompt clearly defines the AI's role,
              tone, and constraints when interacting with course content.
            </p>
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

                            {/* Content Section */}
                            <div className="space-y-3 p-3 border border-dashed rounded-md">
                              <h6 className="text-xs font-semibold flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5" />
                                Content
                              </h6>
                              
                              <div className="space-y-2">
                                <RadioGroup 
                                  value={subTopic.contentType || 'text'} 
                                  onValueChange={(value) => updateSubTopic(
                                    topic.id, 
                                    subTopic.id, 
                                    { contentType: value as ContentType }
                                  )}
                                  className="flex gap-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="text" id={`text-${subTopic.id}`} />
                                    <Label htmlFor={`text-${subTopic.id}`} className="text-xs">Write Text</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="file" id={`file-${subTopic.id}`} />
                                    <Label htmlFor={`file-${subTopic.id}`} className="text-xs">Upload File</Label>
                                  </div>
                                </RadioGroup>
                                
                                {subTopic.contentType === 'text' ? (
                                  <Textarea
                                    value={subTopic.content}
                                    onChange={(e) => updateSubTopic(
                                      topic.id, 
                                      subTopic.id, 
                                      { content: e.target.value }
                                    )}
                                    placeholder="Enter content"
                                    className="min-h-[100px] text-sm"
                                  />
                                ) : (
                                  <div className={cn(
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
                                      id={`file-upload-${subTopic.id}`}
                                    />
                                    <label htmlFor={`file-upload-${subTopic.id}`} className="w-full h-full flex items-center justify-center">
                                      <div className="flex flex-col items-center text-center p-2">
                                        <Upload className="h-5 w-5 mb-1 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                                          {subTopic.file ? subTopic.file.name : 'Upload content (.txt)'}
                                        </span>
                                      </div>
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Video Section */}
                            <div className="space-y-3 p-3 border border-dashed rounded-md">
                              <h6 className="text-xs font-semibold flex items-center gap-1">
                                <Video className="h-3.5 w-3.5" />
                                Video Content
                              </h6>
                              
                              <div className={cn(
                                "flex-1 flex items-center justify-center h-20 border border-dashed rounded-md cursor-pointer",
                                "hover:bg-secondary/50 transition-colors",
                                subTopic.videoFile ? "border-primary/40 bg-primary/5" : "border-border"
                              )}>
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleVideoUpload(topic.id, subTopic.id, file);
                                    }
                                  }}
                                  id={`video-upload-${subTopic.id}`}
                                />
                                <label htmlFor={`video-upload-${subTopic.id}`} className="w-full h-full flex items-center justify-center">
                                  <div className="flex flex-col items-center text-center p-2">
                                    <Video className="h-5 w-5 mb-1 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {subTopic.videoFile ? subTopic.videoFile.name : 'Upload video'}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                            
                            {/* Additional Materials Section */}
                            <div className="space-y-3 p-3 border border-dashed rounded-md">
                              <div className="flex items-center justify-between">
                                <h6 className="text-xs font-semibold flex items-center gap-1">
                                  <LinkIcon className="h-3.5 w-3.5" />
                                  Additional Materials
                                </h6>
                                <Button
                                  type="button"
                                  onClick={() => addMediaFile(topic.id, subTopic.id)}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 text-xs flex items-center gap-1"
                                >
                                  <PlusCircle className="h-3 w-3" />
                                  Add Material
                                </Button>
                              </div>
                              
                              {subTopic.mediaFiles.length === 0 && (
                                <div className="text-center py-2 text-muted-foreground text-xs">
                                  No additional materials yet. Add downloadable files or links.
                                </div>
                              )}
                              
                              <div className="space-y-3">
                                {subTopic.mediaFiles.map((media, mediaIndex) => (
                                  <div key={media.id} className="p-2 bg-background/50 rounded-md border border-border">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-medium">Material {mediaIndex + 1}</span>
                                      <Button
                                        type="button"
                                        onClick={() => removeMediaFile(topic.id, subTopic.id, media.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <Input
                                        value={media.title}
                                        onChange={(e) => updateMediaFile(
                                          topic.id, 
                                          subTopic.id,
                                          media.id,
                                          { title: e.target.value }
                                        )}
                                        placeholder="Material title"
                                        className="text-xs h-7"
                                      />
                                      
                                      <RadioGroup 
                                        value={media.type} 
                                        onValueChange={(value) => updateMediaFile(
                                          topic.id, 
                                          subTopic.id,
                                          media.id,
                                          { type: value as 'download' | 'link' }
                                        )}
                                        className="flex gap-4"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="download" id={`download-${media.id}`} />
                                          <Label htmlFor={`download-${media.id}`} className="text-xs">Downloadable File</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem value="link" id={`link-${media.id}`} />
                                          <Label htmlFor={`link-${media.id}`} className="text-xs">External Link</Label>
                                        </div>
                                      </RadioGroup>
                                      
                                      {media.type === 'download' ? (
                                        <div className={cn(
                                          "flex-1 flex items-center justify-center h-14 border border-dashed rounded-md cursor-pointer",
                                          "hover:bg-secondary/50 transition-colors",
                                          media.file ? "border-primary/40 bg-primary/5" : "border-border"
                                        )}>
                                          <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                handleMediaFileUpload(topic.id, subTopic.id, media.id, file);
                                              }
                                            }}
                                            id={`media-upload-${media.id}`}
                                          />
                                          <label htmlFor={`media-upload-${media.id}`} className="w-full h-full flex items-center justify-center">
                                            <div className="flex flex-col items-center text-center p-1">
                                              <Upload className="h-4 w-4 mb-1 text-muted-foreground" />
                                              <span className="text-xs text-muted-foreground">
                                                {media.file ? media.file.name : 'Upload file'}
                                              </span>
                                            </div>
                                          </label>
                                        </div>
                                      ) : (
                                        <Input
                                          value={media.url}
                                          onChange={(e) => updateMediaFile(
                                            topic.id, 
                                            subTopic.id,
                                            media.id,
                                            { url: e.target.value }
                                          )}
                                          placeholder="Enter URL"
                                          className="text-xs h-7"
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
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
