import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const LazyLoadVideo = ({ videoUrl, imageUrl }) => {
    const [isInViewport, setIsInViewport] = useState(false);
    const playerRef = useRef(null);

    // Intersection Observer callback to detect when the video is in the viewport
    const handleScroll = () => {
        if (playerRef.current) {
            const rect = playerRef.current.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                setIsInViewport(true);
            }
        }
    };

    useEffect(() => {
        // Initialize the intersection observer for lazy loading
        const observer = new IntersectionObserver(handleScroll, {
            threshold: 0.25, // 25% of the video should be visible to trigger loading
        });

        if (playerRef.current) {
            observer.observe(playerRef.current);
        }

        return () => {
            if (playerRef.current) {
                observer.unobserve(playerRef.current);
            }
        };
    }, []);

    return (
        <div ref={playerRef} style={{ width: '100%', height: '100%' }}>
            {/* Lazy load video when it's in the viewport */}
            {isInViewport && (
                <ReactPlayer
                    url={videoUrl}
                    light={<img src={imageUrl} alt="Video Thumbnail" />}
                    playing={true}
                    loop={true}
                    controls={false}
                    muted={true}
                    width="100%"
                    height="100%"
                    className="object-cover"
                    preload="metadata" // Preload metadata to optimize for mobile
                    config={{
                        file: {
                            attributes: {
                                preload: 'metadata',
                                autoPlay: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default LazyLoadVideo;
