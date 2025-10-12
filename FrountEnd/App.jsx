import { useState } from 'react';
import { UserCircle, Stethoscope, Shield, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function HealthcareAuthApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  // Simulated API calls (replace with real API endpoints)
  const API_URL = 'http://localhost:5000/api'; // Your backend URL

  // Simulated backend API call for login
  const apiLogin = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // THIS IS TEMPORARY - In production, this would be:
    // const response = await fetch(`${API_URL}/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // return await response.json();
    
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    if (user) {
      return { success: true, userData: { name: user.name, role: user.role } };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  // Simulated backend API call for registration
  const apiRegister = async (email, password, name, role) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // THIS IS TEMPORARY - In production, this would be:
    // const response = await fetch(`${API_URL}/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, name, role })
    // });
    // return await response.json();
    
    const userExists = registeredUsers.find(u => u.email === email);
    if (userExists) {
      return { success: false, error: 'User already exists' };
    }
    
    const newUser = { email, password, name, role };
    setRegisteredUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await apiLogin(formData.email, formData.password);
      
      if (result.success) {
        setSelectedRole(result.userData.role);
        alert(`Welcome back, ${result.userData.name}! You are logged in as ${result.userData.role}.`);
        setCurrentPage('success');
      } else {
        alert(`Login failed: ${result.error}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleRegister = () => {
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields!');
      return;
    }
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Check password length
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }
    
    // Check if user already exists
    const userExists = registeredUsers.find(u => u.email === formData.email);
    if (userExists) {
      alert('An account with this email already exists!');
      return;
    }
    
    // All validations passed, move to role selection
    setCurrentPage('roleSelection');
  };

  const handleRoleSelection = async (role) => {
    setIsLoading(true);
    
    try {
      const result = await apiRegister(
        formData.email,
        formData.password,
        formData.name,
        role
      );
      
      if (result.success) {
        setSelectedRole(role);
        alert(`Account created successfully as ${role}!`);
        setCurrentPage('success');
      } else {
        alert(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setSelectedRole(null);
    setCurrentPage('login');
  };

  // Login Page
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <UserCircle className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Registration Page
  if (currentPage === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our healthcare platform</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Min. 6 characters"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 flex items-center justify-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Continue to Role Selection'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Role Selection Page
  if (currentPage === 'roleSelection') {
    const roles = [
      {
        id: 'patient',
        name: 'Patient',
        icon: UserCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        hoverBorder: 'hover:border-blue-400',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        description: 'Book appointments and manage your health records'
      },
      {
        id: 'doctor',
        name: 'Doctor',
        icon: Stethoscope,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        hoverBorder: 'hover:border-green-400',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        description: 'Manage patients and provide medical consultations'
      },
      {
        id: 'administrator',
        name: 'Administrator',
        icon: Shield,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        hoverBorder: 'hover:border-red-400',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        description: 'Manage system settings and user accounts'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Role</h1>
            <p className="text-gray-600">Select how you want to use our platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelection(role.name)}
                  disabled={isLoading}
                  className={`p-6 border-2 rounded-xl hover:shadow-lg transition duration-200 text-center ${role.bgColor} ${role.borderColor} ${role.hoverBorder} group disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${role.iconBg} rounded-full mb-4 group-hover:scale-110 transition duration-200`}>
                    <Icon className={`w-10 h-10 ${role.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{role.name}</h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage('register')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back to Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success Page
  if (currentPage === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Success!</h1>
          <p className="text-gray-600 mb-8">
            {selectedRole 
              ? `Your account has been created as ${selectedRole}.`
              : 'You have successfully logged in.'}
          </p>
          <button
            onClick={resetForm}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }
}