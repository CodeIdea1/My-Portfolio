'use client';

import { useEffect, useState, useRef } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    // ✅ منع التكرار
    if (mountedRef.current) return;
    
    mountedRef.current = true;
    
    // ✅ تأخير قليل للسماح بـ DOM stabilization
    const timeoutId = setTimeout(() => {
      setHasMounted(true);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      mountedRef.current = false;
    };
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}