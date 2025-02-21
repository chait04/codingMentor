"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";

export function Welcome() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to onboarding if the user is signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate("/onboarding");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
              CodeMentor
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Learn, Practice, Master Coding
          </h1>

          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Your AI-powered coding mentor. Get personalized paths, daily
            challenges, and progress tracking.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <SignUpButton mode="modal">
              <button className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="inline-block px-8 py-3 bg-white text-emerald-500 border-2 border-emerald-500 rounded-full font-medium hover:bg-emerald-50 transition-colors">
                Login
              </button>
            </SignInButton>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <div className="space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-emerald-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-emerald-500 transition-colors">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}