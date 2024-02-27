'use client'
import { useState } from 'react';


export default function Home() {
  const [test, setTest] = useState("test");

  return (
      <h1>{test}</h1>
  );
}
