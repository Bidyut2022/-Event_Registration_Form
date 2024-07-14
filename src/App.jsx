import React from 'react';
import EventRegistrationForm from './components/EventRegistrationForm';

function App() {
  return (
    <div className="App h-screen w-full bg-zinc-400">
      <header className="bg-indigo-600 text-white py-4">
        <h1 className="text-center text-3xl">Event Registration Form</h1>
      </header>
      <main className="mt-8">
        <EventRegistrationForm />
      </main>
    </div>
  );
}

export default App;
