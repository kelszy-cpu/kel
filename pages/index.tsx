import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Confession } from '@/types';
import SubmitConfession from '@/components/SubmitConfession';
import ConfessionFeed from '@/components/ConfessionFeed';

const Home: NextPage = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/confessions');
      const data = await response.json();
      setConfessions(data);
    } catch (error) {
      console.error('Failed to fetch confessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (content: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/confessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        await fetchConfessions();
      } else {
        alert('Failed to post confession');
      }
    } catch (error) {
      console.error('Failed to submit confession:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`/api/confessions/${id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        // Update local state to reflect the like
        setConfessions((prevConfessions) =>
          prevConfessions.map((confession) =>
            confession.id === id
              ? {
                  ...confession,
                  likes: confession.likes + (confession.liked ? -1 : 1),
                  liked: !confession.liked,
                }
              : confession
          )
        );
      }
    } catch (error) {
      console.error('Failed to like confession:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Confessions</title>
        <meta name="description" content="Share your anonymous confessions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <header className="header">
          <h1>✨ Confessions ✨</h1>
          <p>Share what's on your mind, anonymously</p>
        </header>

        <SubmitConfession onSubmit={handleSubmit} isLoading={isSubmitting} />

        {isLoading ? (
          <div className="loading">Loading confessions...</div>
        ) : (
          <ConfessionFeed confessions={confessions} onLike={handleLike} />
        )}
      </main>
    </>
  );
};

export default Home;
