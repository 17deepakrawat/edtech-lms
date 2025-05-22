import React, { useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';

interface Course {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  title: string;
}

interface Topic {
  id: number;
  name: string;
}

interface Props {
  courses: Course[];
}

export default function Create({ courses }: Props) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCalculatingDuration, setIsCalculatingDuration] = useState(false);

  const { data, setData, post, errors, reset } = useForm({
    course_id: '',
    unit_id: '',
    topic_id: '',
    name: '',
    video_type: 'local',
    video_path: null as File | null,
    embed_url: '',
    duration: '',
  });

  // Fetch units when course changes
  useEffect(() => {
    if (data.course_id) {
      fetch(`/videos/get-units-by-course/${data.course_id}`)
        .then(res => res.json())
        .then(json => {
          setUnits(json);
          setData('unit_id', '');
          setTopics([]);
          setData('topic_id', '');
        })
        .catch(() => {
          setUnits([]);
          setTopics([]);
          setData('unit_id', '');
          setData('topic_id', '');
        });
    } else {
      setUnits([]);
      setTopics([]);
      setData('unit_id', '');
      setData('topic_id', '');
    }
  }, [data.course_id]);

  // Fetch topics when unit changes
  useEffect(() => {
    if (data.unit_id) {
      fetch(`/videos/get-topics-by-unit/${data.unit_id}`)
        .then(res => res.json())
        .then(json => {
          setTopics(json);
          setData('topic_id', '');
        })
        .catch(() => {
          setTopics([]);
          setData('topic_id', '');
        });
    } else {
      setTopics([]);
      setData('topic_id', '');
    }
  }, [data.unit_id]);

  const calculateVideoDuration = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        resolve(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };

      video.onerror = () => {
        reject('Error calculating video duration');
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('video_path', file);
      setPreview(URL.createObjectURL(file));
      
      // Calculate duration for local videos
      if (data.video_type === 'local') {
        setIsCalculatingDuration(true);
        try {
          const duration = await calculateVideoDuration(file);
          setData('duration', duration);
        } catch (error) {
          toast.error('Failed to calculate video duration');
        } finally {
          setIsCalculatingDuration(false);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Only append if values exist
    if (data.course_id) {
      formData.append('course_id', data.course_id);
    }
    if (data.unit_id) {
      formData.append('unit_id', data.unit_id);
    }
    if (data.topic_id) {
      formData.append('topic_id', data.topic_id);
    }
    
    formData.append('name', data.name);
    formData.append('video_type', data.video_type);
    formData.append('duration', data.duration);

    if (data.video_type === 'local') {
      if (data.video_path) {
        formData.append('video_path', data.video_path);
      }
    } else if (data.video_type === 'embed') {
      formData.append('embed_url', data.embed_url);
    }

    router.post(route('videos.store'), formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setPreview(null);
        toast.success('Video created successfully');
        router.visit(route('videos.index'), {
          preserveState: false,
          preserveScroll: false,
          replace: true
        });
      },
      onError: (errors) => {
        toast.error(Object.values(errors)[0] || 'Failed to create video');
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Create Video" />
      <Card className="shadow-none border-0">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course */}
            <div>
              <Label>Course (Optional)</Label>
              <Select value={data.course_id} onValueChange={val => setData('course_id', val)}>
                <SelectTrigger>
                  <div>{data.course_id ? courses.find(c => c.id === Number(data.course_id))?.name : 'Select Course'}</div>
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={String(course.id)}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}
            </div>

            {/* Unit */}
            {units.length > 0 && (
              <div>
                <Label>Unit (Optional)</Label>
                <Select value={data.unit_id} onValueChange={val => setData('unit_id', val)}>
                  <SelectTrigger>
                    <div>{data.unit_id ? units.find(u => u.id === Number(data.unit_id))?.title : 'Select Unit'}</div>
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit.id} value={String(unit.id)}>{unit.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.unit_id && <div className="text-red-500 text-sm">{errors.unit_id}</div>}
              </div>
            )}

            {/* Topic */}
            {topics.length > 0 && (
              <div>
                <Label>Topic (Optional)</Label>
                <Select value={data.topic_id} onValueChange={val => setData('topic_id', val)}>
                  <SelectTrigger>
                    <div>{data.topic_id ? topics.find(t => t.id === Number(data.topic_id))?.name : 'Select Topic'}</div>
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map(topic => (
                      <SelectItem key={topic.id} value={String(topic.id)}>{topic.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.topic_id && <div className="text-red-500 text-sm">{errors.topic_id}</div>}
              </div>
            )}

            {/* Video Title */}
            <div>
              <Label>Video Title</Label>
              <Input value={data.name} onChange={e => setData('name', e.target.value)} />
              {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
            </div>

            {/* Duration */}
            <div>
              <Label>Duration {data.video_type === 'local' ? '(Auto-calculated)' : '(e.g., 05:23)'}</Label>
              <Input 
                value={data.duration} 
                onChange={e => setData('duration', e.target.value)} 
                placeholder={data.video_type === 'local' ? 'Calculating...' : 'HH:MM or MM:SS'}
                disabled={data.video_type === 'local' || isCalculatingDuration}
              />
              {isCalculatingDuration && <div className="text-sm text-gray-500">Calculating duration...</div>}
              {errors.duration && <div className="text-red-500 text-sm">{errors.duration}</div>}
            </div>

            {/* Video Type */}
            <div>
              <Label>Video Type</Label>
              <div className="flex gap-4 mt-2">
                <label>
                  <input
                    type="radio"
                    value="local"
                    checked={data.video_type === 'local'}
                    onChange={() => setData('video_type', 'local')}
                    className="mr-1"
                  />
                  Upload
                </label>
                <label>
                  <input
                    type="radio"
                    value="embed"
                    checked={data.video_type === 'embed'}
                    onChange={() => setData('video_type', 'embed')}
                    className="mr-1"
                  />
                  Embed URL
                </label>
              </div>
              {errors.video_type && <div className="text-red-500 text-sm">{errors.video_type}</div>}
            </div>

            {/* Local Upload */}
            {data.video_type === 'local' && (
              <div>
                <Label>Upload Video</Label>
                <Input type="file" accept="video/*" onChange={handleFileChange} />
                {errors.video_path && <div className="text-red-500 text-sm">{errors.video_path}</div>}
                {preview && (
                  <video src={preview} className="mt-4 rounded-md w-full" controls />
                )}
              </div>
            )}

            {/* Embed URL */}
            {data.video_type === 'embed' && (
              <div>
                <Label>Embed URL</Label>
                <Input type="url" value={data.embed_url} onChange={e => setData('embed_url', e.target.value)} />
                {errors.embed_url && <div className="text-red-500 text-sm">{errors.embed_url}</div>}
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.visit('/videos')}>
                Cancel
              </Button>
              <Button type="submit">Create Video</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
