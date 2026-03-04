import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
        <div>
          <div className="mx-auto h-12 w-auto bg-green-500 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome to GreenPath
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Track your eco-friendly journeys and make a positive impact!
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Continue as Guest
            </Link>
            <p className="mt-4 text-xs text-gray-500">
              Start exploring sustainable routes and tracking your environmental impact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
