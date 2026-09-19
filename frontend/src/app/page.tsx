'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Container } from '@/components/layout/Container';
import { HeroCard } from '@/components/features/hero/HeroCard';
import { ApiConsole } from '@/components/features/console/ApiConsole';
import { Toast } from '@/components/ui/Toast';
import { useApiRequest } from '@/hooks/use-api-request';

export default function HomePage() {
  const { isLoading, result, execute } = useApiRequest();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastError, setIsToastError] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string, error = false) => {
    setToastMessage(message);
    setIsToastError(error);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3200);
  };

  const handleExecute = async (method: string, path: string, payload?: string) => {
    const res = await execute(method, path, payload);
    showToast(`${method} ${path} → ${res.status || 'Error'}`, !res.isOk);
    return res;
  };

  const handleTestHello = () => {
    handleExecute('GET', '/hello');
  };

  const handleScrollToConsole = () => {
    document.getElementById('tester')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <Container>
        {/* Floating Navbar */}
        <Navbar onExploreClick={handleScrollToConsole} />

        {/* Light Hero Card */}
        <HeroCard onTestHello={handleTestHello} isLoading={isLoading} />

        {/* Dark Developer API Console */}
        <ApiConsole onExecute={handleExecute} isLoading={isLoading} result={result} />
      </Container>

      {/* Live Toast Feedback */}
      <Toast message={toastMessage} isError={isToastError} isVisible={isToastVisible} />
    </main>
  );
}
