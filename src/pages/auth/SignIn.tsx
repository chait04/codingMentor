import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { Shell } from 'lucide-react';

export function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-3">
        <Shell className="w-10 h-10 text-mint-600" />
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-1">
        <ClerkSignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-mint-600 hover:bg-mint-700 text-white",
              footerActionLink: 
                "text-mint-600 hover:text-mint-700",
              card: "shadow-none",
            },
          }}
          routing="path"
          path="/sign-in"
        />
      </div>
    </div>
  );
}