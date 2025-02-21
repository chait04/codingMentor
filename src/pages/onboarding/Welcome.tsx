"use client";

import React, { useEffect, useRef } from "react";
import { GraduationCap, Brain, Target, Clock, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        }
      },
      {
        threshold: 0.2,
        rootMargin: '20px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        animationDelay: `${index * 150}ms`
      }}
      className={`
        p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl 
        transition-all duration-700 transform 
        opacity-0 translate-y-12 scale-95
        w-full max-w-5xl mx-auto
        hover:translate-x-2 hover:scale-[1.02]
        group
        before:absolute before:inset-0 before:rounded-3xl 
        before:bg-gradient-to-r before:from-emerald-500/5 before:to-emerald-700/5 
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
        relative overflow-hidden
      `}
    >
      <div className="flex items-start space-x-8">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 
          w-20 h-20 flex items-center justify-center flex-shrink-0
          transform group-hover:rotate-6 transition-transform duration-500
          relative">
          <Icon className="h-10 w-10 text-emerald-600 transform group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-1 relative z-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3 
            transform group-hover:translate-x-2 transition-transform duration-500">
            {title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed transform 
            group-hover:translate-x-2 transition-transform duration-500 delay-75">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-700/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    </div>
  );
};

export function Welcome() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSignedIn) {
      navigate("/onboarding");
    }
  }, [isSignedIn, navigate]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning Paths",
      description: "Our advanced AI creates personalized learning paths that evolve with your progress. Get tailored recommendations and adaptive content that matches your unique learning style and pace."
    },
    {
      icon: Target,
      title: "Intelligent Daily Challenges",
      description: "Face expertly curated coding challenges that automatically adjust to your skill level. Each challenge is designed to push your boundaries while ensuring steady, consistent progress."
    },
    {
      icon: Clock,
      title: "Smart Time Optimization",
      description: "Let our AI analyze your schedule and productivity patterns to suggest the perfect study times. Maximize your learning efficiency with personalized timing recommendations."
    },
    {
      icon: Trophy,
      title: "Advanced Progress Analytics",
      description: "Track your journey with detailed analytics and insights. Watch your skills grow through interactive visualizations, achievement milestones, and comprehensive progress reports."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <GraduationCap className="h-8 w-8 text-emerald-500 transform group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                CodeMentor
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent animate-fade-in">
            Master Coding with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in animation-delay-100">
            Your personalized AI mentor that adapts to your learning style and helps you achieve your coding goals faster.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 animate-fade-in animation-delay-200">
            <SignUpButton mode="modal">
              <button className="inline-block px-8 py-4 bg-emerald-500 text-white rounded-full font-medium 
                hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Start Learning Now
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="inline-block px-8 py-4 bg-white text-emerald-500 border-2 border-emerald-500 
                rounded-full font-medium hover:bg-emerald-50 transition-all duration-300">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}