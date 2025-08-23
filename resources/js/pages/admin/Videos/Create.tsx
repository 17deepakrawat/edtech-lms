import React, { useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

export default function VideoField() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoType, setVideoType] = useState<'youtube' | 'gdrive' | ''>('');
  const [videoId, setVideoId] = useState('');
  const [preview, setPreview] = useState('');
  const [duration, setDuration] = useState<string | null>(null);

  const ytPlayerRef = useRef<HTMLDivElement>(null);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
  }, []);

  // Format seconds into hh:mm:ss
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (hrs > 0) parts.push(String(hrs).padStart(2, '0'));
    parts.push(String(mins).padStart(2, '0'));
    parts.push(String(secs).padStart(2, '0'));

    return parts.join(':');
  };

  // Create YouTube player when videoId changes
  useEffect(() => {
    if (videoType !== 'youtube' || !videoId) return;

    const waitYT = setInterval(() => {
      if (window.YT && window.YT.Player && ytPlayerRef.current) {
        clearInterval(waitYT);

        new window.YT.Player(ytPlayerRef.current, {
          videoId,
          playerVars: { rel: 0, modestbranding: 1 },
          events: {
            onReady: (event: any) => {
              const dur = event.target.getDuration();
              setDuration(formatDuration(dur));
            },
          },
        });
      }
    }, 300);

    return () => clearInterval(waitYT);
  }, [videoType, videoId]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setVideoUrl(url);
    setDuration(null);

    // YouTube link detection
    const ytMatch = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
      setVideoType('youtube');
      setVideoId(ytMatch[1]);
      setPreview(`https://www.youtube.com/embed/${ytMatch[1]}`);
      return;
    }

    // Google Drive link detection
    const gdriveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (gdriveMatch) {
      setVideoType('gdrive');
      setPreview(`https://drive.google.com/file/${gdriveMatch[1]}/preview`);
      return;
    }

    // Invalid link
    setVideoType('');
    setPreview('');
    setVideoId('');
  };

  return (
    <div className="p-4">
      <Label>Video URL (YouTube or Google Drive)</Label>
      <Input
        placeholder="Paste YouTube or Google Drive link"
        value={videoUrl}
        onChange={handleUrlChange}
      />

      {preview && (
        <div className="mt-4">
          <Label>Preview</Label>
          {videoType === 'youtube' && <div ref={ytPlayerRef} className="mt-2 aspect-video w-full rounded-md overflow-hidden" />}
          {videoType === 'gdrive' && (
            <iframe
              src={preview}
              className="mt-2 aspect-video w-full rounded-md overflow-hidden"
              allow="autoplay"
              allowFullScreen
            />
          )}
        </div>  
      )}

      {duration && videoType === 'youtube' && (
        <p className="mt-2 font-medium">Duration: {duration}</p>
      )}

      {videoType === 'gdrive' && (
        <p className="mt-2 text-gray-500">Duration cannot be calculated for Google Drive videos</p>
      )}
    </div>
  );
}
