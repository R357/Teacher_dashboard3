'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye, EyeOff, GraduationCap, Users, UserCog, Shield, Loader2, CheckCircle2, XCircle, AlertCircle, Mail, User, Lock, Phone, Calendar, MapPin, BookOpen, School, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import studentAnimation from '../../login(animations)/Student.json';
import teacherAnimation from '../../login(animations)/Teacher.json';
import parentAnimation from '../../login(animations)/Parenting.json';
import adminAnimation from '../../login(animations)/admin.json';

type Role = 'student' | 'parent' | 'teacher' | 'admin';
type AuthMode = 'login' | 'signup';

// Country codes mapping
const countryCodes: Record<string, string> = {
  'India': '+91',
  'Saudi Arabia': '+966',
  'Nigeria': '+234',
  'Egypt': '+20',
  'South Africa': '+27',
  'Kenya': '+254',
  'Ghana': '+233',
  'Morocco': '+212',
  'Tanzania': '+255',
  'Ethiopia': '+251',
};

const countries = Object.keys(countryCodes);

const AuthPage = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<Role>(() => {
    // Restore last selected role from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lastSelectedRole');
        if (saved && ['student', 'parent', 'teacher', 'admin'].includes(saved)) {
          return saved as Role;
        }
      } catch (error) {
        console.error('Failed to load last selected role from localStorage:', error);
      }
    }
    return 'student';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isTeacherInitialMount, setIsTeacherInitialMount] = useState(false);
  const [isParentInitialMount, setIsParentInitialMount] = useState(false);
  const [isAdminInitialMount, setIsAdminInitialMount] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formProgress, setFormProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    phone: '',
    academicRegion: '',
    class: '',
    relationship: '',
    country: '',
    region: '',
    subjectSpecialization: '',
    qualification: '',
  });

  // Helper function to calculate password strength
  const calculatePasswordStrength = useCallback((password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 4); // Max 4 levels
  }, []);

  // Helper function to calculate form progress
  const calculateFormProgress = useCallback((): number => {
    if (authMode !== 'signup') return 0;
    
    let totalFields = 0;
    let filledFields = 0;

    if (selectedRole === 'student') {
      const requiredFields = ['fullName', 'dateOfBirth', 'email', 'phone', 'academicRegion', 'class', 'username', 'password', 'confirmPassword'];
      totalFields = requiredFields.length;
      requiredFields.forEach(field => {
        if (formData[field as keyof typeof formData]?.toString().trim()) {
          filledFields++;
        }
      });
    } else if (selectedRole === 'parent') {
      const requiredFields = ['fullName', 'email', 'country', 'phone', 'username', 'relationship', 'password', 'confirmPassword'];
      totalFields = requiredFields.length;
      requiredFields.forEach(field => {
        if (formData[field as keyof typeof formData]?.toString().trim()) {
          filledFields++;
        }
      });
    } else if (selectedRole === 'teacher') {
      // For teacher, username is not shown (email is used as username)
      const requiredFields = ['fullName', 'email', 'country', 'phone', 'region', 'subjectSpecialization', 'qualification', 'password', 'confirmPassword'];
      totalFields = requiredFields.length;
      requiredFields.forEach(field => {
        if (formData[field as keyof typeof formData]?.toString().trim()) {
          filledFields++;
        }
      });
    }

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  }, [authMode, selectedRole, formData]);

  // Update password strength when password changes
  useEffect(() => {
    if (authMode === 'signup') {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }
  }, [formData.password, authMode, calculatePasswordStrength]);

  // Update form progress when form data changes
  useEffect(() => {
    if (authMode === 'signup') {
      setFormProgress(calculateFormProgress());
    }
  }, [formData, authMode, selectedRole, calculateFormProgress]);

  // Auto-save form data to localStorage
  useEffect(() => {
    if (authMode === 'signup' && typeof window !== 'undefined') {
      try {
        const saveData = {
          ...formData,
          role: selectedRole,
          timestamp: Date.now()
        };
        localStorage.setItem('signupFormData', JSON.stringify(saveData));
      } catch (error) {
        console.error('Failed to save form data to localStorage:', error);
      }
    }
  }, [formData, authMode, selectedRole]);

  // Load saved form data on mount (signup mode)
  useEffect(() => {
    if (authMode === 'signup' && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('signupFormData');
        if (saved) {
          try {
            const data = JSON.parse(saved);
            // Only restore if saved less than 24 hours ago
            if (data.timestamp && Date.now() - data.timestamp < 24 * 60 * 60 * 1000 && data.role === selectedRole) {
              const { role, timestamp, ...formDataToRestore } = data;
              setFormData(prev => ({ ...prev, ...formDataToRestore }));
            }
          } catch (e) {
            // Invalid data, ignore
            console.error('Failed to parse saved form data:', e);
          }
        }
      } catch (error) {
        console.error('Failed to load form data from localStorage:', error);
      }
    }
  }, [authMode, selectedRole]);
  
  // Load remembered user data on mount (for login)
  useEffect(() => {
    if (authMode === 'login' && typeof window !== 'undefined') {
      try {
        const remembered = localStorage.getItem('rememberedUser');
        if (remembered) {
          try {
            const data = JSON.parse(remembered);
            setFormData(prev => ({
              ...prev,
              username: data.username || '',
            }));
            if (data.role) {
              setSelectedRole(data.role as Role);
              try {
                localStorage.setItem('lastSelectedRole', data.role);
              } catch (error) {
                console.error('Failed to save last selected role to localStorage:', error);
              }
            }
            setRememberMe(true);
          } catch (e) {
            // Invalid data, ignore
            console.error('Failed to parse remembered user data:', e);
          }
        }
      } catch (error) {
        console.error('Failed to load remembered user from localStorage:', error);
      }
    }
  }, [authMode]);

  // Auto-focus on username field when login mode is active
  useEffect(() => {
    if (authMode === 'login' && usernameInputRef.current) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        usernameInputRef.current?.focus();
      }, 100);
    }
  }, [authMode, selectedRole]);

  // Format phone number with proper spacing
  const formatPhoneNumber = (value: string, countryCode?: string): string => {
    // Remove all non-digit characters except +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // If country code is provided and phone doesn't start with it, add it
    if (countryCode && !cleaned.startsWith(countryCode.replace(/\s/g, ''))) {
      cleaned = countryCode.replace(/\s/g, '') + cleaned.replace(/^\+?\d{1,4}/, '');
    }
    
    // Format: +XX XXX XXX XXXX (example: +91 123 456 7890)
    if (cleaned.length > 4) {
      const code = cleaned.substring(0, cleaned.length - 10);
      const number = cleaned.substring(cleaned.length - 10);
      if (number.length > 6) {
        return `${code} ${number.substring(0, 5)} ${number.substring(5)}`;
      } else if (number.length > 3) {
        return `${code} ${number.substring(0, 3)} ${number.substring(3)}`;
      }
      return `${code} ${number}`;
    }
    
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      let updatedValue = value;
      
      // Format phone number on input
      if (name === 'phone') {
        const country = prev.country || prev.academicRegion;
        const countryCode = country && countryCodes[country] ? countryCodes[country] : '';
        updatedValue = formatPhoneNumber(value, countryCode);
      }
      
      const updated = {
        ...prev,
        [name]: updatedValue
      };
      
      // Auto-update phone number with country code when country/academicRegion is selected
      if (name === 'country' || name === 'academicRegion') {
        if (value && countryCodes[value]) {
          // If phone is empty or starts with a country code pattern, replace it with new country code
          const currentPhone = prev.phone || '';
          const countryCodePattern = /^\+?\d{1,4}\s*/;
          if (!currentPhone.trim() || countryCodePattern.test(currentPhone)) {
            updated.phone = countryCodes[value] + ' ';
          } else {
            // Format existing phone with new country code
            updated.phone = formatPhoneNumber(prev.phone, countryCodes[value]);
          }
        } else if (!value) {
          // If country is cleared, remove the country code from phone if it exists
          const currentPhone = prev.phone || '';
          const countryCodePattern = /^\+?\d{1,4}\s*/;
          if (countryCodePattern.test(currentPhone)) {
            updated.phone = '';
          }
        }
      }
      
      return updated;
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Helper function to validate username based on role
  const validateUsernameField = (value: string): string | null => {
    if (!value.trim()) {
      if (selectedRole === 'student' && authMode === 'login') {
        return 'Student ID or email is required';
      } else if (selectedRole === 'student' && authMode === 'signup') {
        return 'Student ID is required';
      } else if (selectedRole === 'teacher') {
        return 'Email is required';
      } else if (selectedRole === 'parent') {
        return 'Student ID is required';
      } else if (selectedRole === 'admin') {
        return 'Email is required';
      }
      return 'This field is required';
    }

    // Validate format based on role
    if (authMode === 'login') {
      if (selectedRole === 'teacher' || selectedRole === 'admin') {
        // Must be email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
      } else if (selectedRole === 'parent') {
        // Must be student ID format (alphanumeric, typically)
        // You can adjust this regex based on your student ID format requirements
        if (!/^[A-Za-z0-9]+$/.test(value.trim())) {
          return 'Please enter a valid student ID';
        }
      } else if (selectedRole === 'student') {
        // Can be either email or student ID
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        const isStudentID = /^[A-Za-z0-9]+$/.test(value.trim());
        if (!isEmail && !isStudentID) {
          return 'Please enter a valid student ID or email address';
        }
      }
    } else {
      // signup mode
      if (selectedRole === 'teacher' || selectedRole === 'admin') {
        // Must be email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
      } else if (selectedRole === 'student' || selectedRole === 'parent') {
        // Must be student ID format
        if (!/^[A-Za-z0-9]+$/.test(value.trim())) {
          return 'Please enter a valid student ID';
        }
      }
    }

    return null; // No error
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate student sign-up specific fields
    if (authMode === 'signup' && selectedRole === 'student') {
      // Full name validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      // Date of birth validation
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
        
        if (isNaN(birthDate.getTime())) {
          newErrors.dateOfBirth = 'Please enter a valid date';
        } else if (actualAge < 5) {
          newErrors.dateOfBirth = 'You must be at least 5 years old';
        } else if (actualAge > 100) {
          newErrors.dateOfBirth = 'Please enter a valid date of birth';
        }
      }

      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      }

      // Academic region validation
      if (!formData.academicRegion.trim()) {
        newErrors.academicRegion = 'Academic region is required';
      }

      // Class validation
      if (!formData.class.trim()) {
        newErrors.class = 'Class is required';
      }
    }

    // Validate parent sign-up specific fields
    if (authMode === 'signup' && selectedRole === 'parent') {
      // Full name validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Country validation
      if (!formData.country.trim()) {
        newErrors.country = 'Country is required';
      }

      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      }

      // Student ID validation (username field for parent)
      if (!formData.username.trim()) {
        newErrors.username = 'Student ID is required';
      } else if (!/^[A-Za-z0-9]+$/.test(formData.username.trim())) {
        newErrors.username = 'Please enter a valid student ID';
      }

      // Relationship validation
      if (!formData.relationship.trim()) {
        newErrors.relationship = 'Relationship is required';
      } else if (formData.relationship.trim().length < 2) {
        newErrors.relationship = 'Relationship must be at least 2 characters';
      }
    }

    // Validate teacher sign-up specific fields
    if (authMode === 'signup' && selectedRole === 'teacher') {
      // Full name validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Phone validation
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      }

      // Country validation
      if (!formData.country.trim()) {
        newErrors.country = 'Country is required';
      }

      // Region validation
      if (!formData.region.trim()) {
        newErrors.region = 'Region is required';
      }

      // Subject specialization validation
      if (!formData.subjectSpecialization.trim()) {
        newErrors.subjectSpecialization = 'Subject specialization is required';
      }

      // Qualification validation
      if (!formData.qualification.trim()) {
        newErrors.qualification = 'Qualification is required';
      } else if (formData.qualification.trim().length < 2) {
        newErrors.qualification = 'Qualification must be at least 2 characters';
      }
    }

    // Validate login - ensure valid email when email is used
    if (authMode === 'login') {
      if (selectedRole === 'teacher' || selectedRole === 'admin') {
        // Must use valid email for login
        if (!formData.username.trim()) {
          newErrors.username = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username.trim())) {
          newErrors.username = 'Please enter a valid email address';
        }
      } else if (selectedRole === 'student') {
        // Can use either email or student ID, but if email is provided, it must be valid
        if (!formData.username.trim()) {
          newErrors.username = 'Student ID or email is required';
        } else {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username.trim());
          const isStudentID = /^[A-Za-z0-9]+$/.test(formData.username.trim());
          if (!isEmail && !isStudentID) {
            newErrors.username = 'Please enter a valid student ID or email address';
          }
        }
      } else if (selectedRole === 'parent') {
        // Parent uses student ID for login
        if (!formData.username.trim()) {
          newErrors.username = 'Student ID is required';
        } else if (!/^[A-Za-z0-9]+$/.test(formData.username.trim())) {
          newErrors.username = 'Please enter a valid student ID';
        }
      }
    }

    // Validate username field based on role (skip for student, parent, and teacher signup)
    if (!(authMode === 'signup' && (selectedRole === 'student' || selectedRole === 'parent' || selectedRole === 'teacher'))) {
      const usernameError = validateUsernameField(formData.username);
      if (usernameError && !newErrors.username) {
        newErrors.username = usernameError;
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (authMode === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (authMode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call (replace with actual authentication logic)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in sessionStorage (in production, use proper auth state management)
      // For teacher signup, use email as username since username field is not shown
      const username = (authMode === 'signup' && selectedRole === 'teacher') 
        ? formData.email 
        : formData.username;
      
      const userData = {
        role: selectedRole,
        username: username,
        email: formData.email,
        isAuthenticated: true,
      };
      
      try {
        sessionStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Failed to save user data to sessionStorage:', error);
      }
      
      // If Remember Me is checked, also store in localStorage
      if (authMode === 'login' && rememberMe && typeof window !== 'undefined') {
        try {
          localStorage.setItem('rememberedUser', JSON.stringify({
            username: formData.username,
            role: selectedRole,
          }));
        } catch (error) {
          console.error('Failed to save remembered user to localStorage:', error);
        }
      } else if (authMode === 'login' && !rememberMe && typeof window !== 'undefined') {
        // Clear remembered user if unchecked
        try {
          localStorage.removeItem('rememberedUser');
        } catch (error) {
          console.error('Failed to remove remembered user from localStorage:', error);
        }
      }
      
      // Clear saved form data on successful submission
      if (authMode === 'signup' && typeof window !== 'undefined') {
        try {
          localStorage.removeItem('signupFormData');
        } catch (error) {
          console.error('Failed to remove signup form data from localStorage:', error);
        }
      }
      
      // Redirect to respective dashboard based on role
      const dashboardRoutes = {
        student: '/student-dashboard',
        parent: '/parent-dashboard',
        teacher: '/teacher-dashboard',
        admin: '/admin-dashboard',
      };
      
      router.push(dashboardRoutes[selectedRole]);
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const roleConfig = {
    student: {
      title: 'Welcome to Student Portal',
      subtitle: 'Login to access your account',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      accent: 'bg-blue-500',
    },
    parent: {
      title: 'Welcome to Parent Portal',
      subtitle: 'Monitor your child\'s progress',
      icon: Users,
      color: 'from-blue-400 to-blue-500',
      accent: 'bg-blue-400',
    },
    teacher: {
      title: 'Welcome to Teacher Portal',
      subtitle: 'Manage your classes and students',
      icon: UserCog,
      color: 'from-blue-600 to-blue-700',
      accent: 'bg-blue-600',
    },
    admin: {
      title: 'Welcome to Admin Portal',
      subtitle: 'Manage the entire platform',
      icon: Shield,
      color: 'from-blue-700 to-blue-800',
      accent: 'bg-blue-700',
    },
  };

  const currentRole = roleConfig[selectedRole];

  // Helper function to get username field label based on role and auth mode
  const getUsernameLabel = (): string => {
    if (authMode === 'signup') {
      if (selectedRole === 'student') return 'Student ID';
      if (selectedRole === 'teacher') return 'Email';
      if (selectedRole === 'parent') return 'Student ID';
      if (selectedRole === 'admin') return 'Email';
    } else {
      // login mode
      if (selectedRole === 'student') return 'Student ID or Email';
      if (selectedRole === 'teacher') return 'Email';
      if (selectedRole === 'parent') return 'Student ID';
      if (selectedRole === 'admin') return 'Email';
    }
    return 'Username';
  };

  // Helper function to get username field placeholder based on role and auth mode
  const getUsernamePlaceholder = (): string => {
    if (authMode === 'signup') {
      if (selectedRole === 'student') return 'Enter student ID';
      if (selectedRole === 'teacher') return 'Enter your email';
      if (selectedRole === 'parent') return 'Enter student ID';
      if (selectedRole === 'admin') return 'Enter your email';
    } else {
      // login mode
      if (selectedRole === 'student') return 'Enter student ID or email';
      if (selectedRole === 'teacher') return 'Enter your email';
      if (selectedRole === 'parent') return 'Enter student ID';
      if (selectedRole === 'admin') return 'Enter your email';
    }
    return 'Enter your username';
  };

  // Track initial mount for student animation
  useEffect(() => {
    // Keep isInitialMount true initially so animation plays on page load
    // Set to false after animation completes (0.8s animation + buffer)
    const timer = setTimeout(() => {
      setIsInitialMount(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Track teacher role selection for animation
  useEffect(() => {
    if (selectedRole === 'teacher') {
      setIsTeacherInitialMount(true);
      // Set to false after animation completes (0.8s animation + buffer)
      const timer = setTimeout(() => {
        setIsTeacherInitialMount(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedRole]);

  // Track parent role selection for animation
  useEffect(() => {
    if (selectedRole === 'parent') {
      setIsParentInitialMount(true);
      // Set to false after animation completes (0.8s animation + buffer)
      const timer = setTimeout(() => {
        setIsParentInitialMount(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedRole]);

  // Track admin role selection for animation
  useEffect(() => {
    if (selectedRole === 'admin') {
      setIsAdminInitialMount(true);
      // Set to false after animation completes (0.8s animation + buffer)
      const timer = setTimeout(() => {
        setIsAdminInitialMount(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedRole]);

  // Parallax effect based on mouse movement - DISABLED
  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     if (containerRef.current) {
  //       const rect = containerRef.current.getBoundingClientRect();
  //       const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  //       const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  //       setMousePosition({ x, y });
  //     }
  //   };

  //   const container = containerRef.current;
  //   if (container) {
  //     container.addEventListener('mousemove', handleMouseMove);
  //     return () => container.removeEventListener('mousemove', handleMouseMove);
  //   }
  // }, []);

  // Calculate parallax transforms - DISABLED (all set to 0,0 to keep animations static)
  const parallaxTransform = {
    background: `translate(0px, 0px)`,
    illustration: `translate(0px, 0px)`,
    wave1: `translate(0px, 0px)`,
    wave2: `translate(0px, 0px)`,
    floating1: `translate(0px, 0px)`,
    floating2: `translate(0px, 0px)`,
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 relative overflow-hidden"
    >
      {/* Floating parallax background elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: parallaxTransform.floating1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Additional floating elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: parallaxTransform.floating2 }}
      >
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-300 rounded-full opacity-10 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-pink-300 rounded-full opacity-10 animate-float"></div>
      </div>
      <div 
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Panel - Login/Signup Form */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 transition-all duration-300">
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </h1>
                <p className="text-blue-200 text-sm">
                  Enter your account details to {authMode === 'login' ? 'access' : 'create'} your account
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-blue-200 text-sm font-medium flex items-center gap-2">
                  <span>I am a...</span>
                  <span className="text-xs text-blue-300">(Select your role)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {((authMode === 'login' ? ['student', 'parent', 'teacher', 'admin'] : ['student', 'parent', 'teacher']) as Role[]).map((role) => {
                    const config = roleConfig[role];
                    const Icon = config.icon;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role);
                          // Save selected role to localStorage
                          if (typeof window !== 'undefined') {
                            try {
                              localStorage.setItem('lastSelectedRole', role);
                            } catch (error) {
                              console.error('Failed to save last selected role to localStorage:', error);
                            }
                          }
                          setErrors({}); // Clear errors when changing role
                        }}
                        className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg transition-all duration-300 transform ${
                          selectedRole === role
                            ? `${config.accent} text-white shadow-xl scale-105 ring-2 ring-blue-300 ring-opacity-50`
                            : 'bg-slate-800 text-blue-200 hover:bg-slate-700 hover:scale-[1.02] border border-slate-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 transition-transform duration-300 ${
                          selectedRole === role ? 'scale-110' : ''
                        }`} />
                        <span className="text-xs font-semibold capitalize tracking-wide">{role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Progress Indicator (Signup only) */}
              {authMode === 'signup' && (
                <div className="mb-4 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-200 font-medium">Form Progress</span>
                    <span className="text-blue-300">{formProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${formProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-300 text-sm animate-fade-in transition-all duration-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.submit}</span>
                  </div>
                )}

                {/* Student Sign-Up Specific Fields */}
                {authMode === 'signup' && selectedRole === 'student' && (
                  <>
                    {/* Personal Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50">
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Personal Information</h3>
                      
                      <div>
                        <label htmlFor="fullName" className="block text-blue-200 text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.fullName ? 'border-red-500' : formData.fullName.trim() && !errors.fullName ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200`}
                          />
                          {errors.fullName && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.fullName && formData.fullName.trim() && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.fullName && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="dateOfBirth" className="block text-blue-200 text-sm font-medium mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none z-10">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            max={new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split('T')[0]}
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.dateOfBirth ? 'border-red-500' : formData.dateOfBirth && !errors.dateOfBirth ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200 [color-scheme:dark]`}
                          />
                          {errors.dateOfBirth && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.dateOfBirth && formData.dateOfBirth && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.dateOfBirth && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50">
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Contact Information</h3>
                      
                      <div>
                        <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.email ? 'border-red-500' : formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !errors.email ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200`}
                          />
                          {errors.email && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.email && formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="academicRegion" className="block text-blue-200 text-sm font-medium mb-2">
                          Academic Region
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none z-10">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <select
                            id="academicRegion"
                            name="academicRegion"
                            value={formData.academicRegion}
                            onChange={handleInputChange}
                            required
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.academicRegion ? 'border-red-500' : formData.academicRegion && !errors.academicRegion ? 'border-green-500' : 'border-blue-500'
                            } text-white focus:outline-none focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer`}
                          >
                            <option value="" className="bg-slate-800">Select your country</option>
                            {countries.map((country) => (
                              <option key={country} value={country} className="bg-slate-800">
                                {country}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {errors.academicRegion && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.academicRegion && formData.academicRegion && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.academicRegion && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.academicRegion}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-blue-200 text-sm font-medium mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your phone number"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.phone ? 'border-red-500' : formData.phone.trim().replace(/\D/g, '').length >= 10 && !errors.phone ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200`}
                          />
                          {errors.phone && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.phone && formData.phone.trim().replace(/\D/g, '').length >= 10 && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50">
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Academic Information</h3>

                      <div>
                        <label htmlFor="class" className="block text-blue-200 text-sm font-medium mb-2">
                          Class
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="class"
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your class"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.class ? 'border-red-500' : formData.class.trim() && !errors.class ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200`}
                          />
                          {errors.class && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.class && formData.class.trim() && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.class && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.class}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Parent Sign-Up Specific Fields */}
                {authMode === 'signup' && selectedRole === 'parent' && (
                  <>
                    {/* Parent Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50 animate-fade-in">
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Parent Information</h3>
                      
                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="fullName" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.fullName ? 'border-red-500' : formData.fullName.trim() && !errors.fullName ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.fullName && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.fullName && formData.fullName.trim() && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.fullName && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.email ? 'border-red-500' : formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !errors.email ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.email && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.email && formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="country" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Country
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.country ? 'border-red-500' : 'border-blue-500'
                            } text-white focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80 appearance-none cursor-pointer`}
                          >
                            <option value="" className="bg-slate-800">Select your country</option>
                            {countries.map((country) => (
                              <option key={country} value={country} className="bg-slate-800">
                                {country}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {errors.country && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.country && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.country}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="phone" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Phone
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your phone number"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.phone ? 'border-red-500' : formData.phone.trim().replace(/\D/g, '').length >= 10 && !errors.phone ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.phone && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.phone && formData.phone.trim().replace(/\D/g, '').length >= 10 && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Student Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Student Information</h3>
                      
                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="username" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Student ID
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter student ID"
                            className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                              errors.username ? 'border-red-500' : formData.username.trim() && /^[A-Za-z0-9]+$/.test(formData.username.trim()) && !errors.username ? 'border-green-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.username && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          {!errors.username && formData.username.trim() && /^[A-Za-z0-9]+$/.test(formData.username.trim()) && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                        {errors.username && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.username}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="relationship" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Relationship
                        </label>
                        <div className="relative">
                          <select
                            id="relationship"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.relationship ? 'border-red-500' : 'border-blue-500'
                            } text-white focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80 appearance-none cursor-pointer`}
                          >
                            <option value="" className="bg-slate-800">Select relationship</option>
                            <option value="Mother" className="bg-slate-800">Mother</option>
                            <option value="Father" className="bg-slate-800">Father</option>
                            <option value="Guardian" className="bg-slate-800">Guardian</option>
                            <option value="Other" className="bg-slate-800">Other</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {errors.relationship && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.relationship && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.relationship}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Teacher Sign-Up Specific Fields */}
                {authMode === 'signup' && selectedRole === 'teacher' && (
                  <>
                    {/* Personal Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50 animate-fade-in">
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Personal Information</h3>
                      
                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="fullName" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.fullName ? 'border-red-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.fullName && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.fullName && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.email ? 'border-red-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.email && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="country" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Country
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.country ? 'border-red-500' : 'border-blue-500'
                            } text-white focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80 appearance-none cursor-pointer`}
                          >
                            <option value="" className="bg-slate-800">Select your country</option>
                            {countries.map((country) => (
                              <option key={country} value={country} className="bg-slate-800">
                                {country}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {errors.country && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.country && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.country}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="phone" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Phone
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your phone number"
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.phone ? 'border-red-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.phone && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Location Information</h3>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="region" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Region
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your region"
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.region ? 'border-red-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.region && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.region && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.region}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Professional Information Section */}
                    <div className="space-y-4 pb-2 border-b border-slate-700/50 animate-fade-in" style={{ animationDelay: '200ms' }}>
                      <h3 className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Professional Information</h3>
                      
                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="subjectSpecialization" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Subject Specialization
                        </label>
                        <div className="relative">
                          <select
                            id="subjectSpecialization"
                            name="subjectSpecialization"
                            value={formData.subjectSpecialization}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.subjectSpecialization ? 'border-red-500' : 'border-blue-500'
                            } text-white focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80 appearance-none cursor-pointer`}
                          >
                            <option value="" className="bg-slate-800">Select subject specialization</option>
                            <option value="English" className="bg-slate-800">English</option>
                            <option value="Mathematics" className="bg-slate-800">Mathematics</option>
                            <option value="Environmental Studies" className="bg-slate-800">Environmental Studies</option>
                            <option value="Social Studies" className="bg-slate-800">Social Studies</option>
                            <option value="Art and Craft" className="bg-slate-800">Art and Craft</option>
                            <option value="Physical and Health Education" className="bg-slate-800">Physical and Health Education</option>
                            <option value="General Science" className="bg-slate-800">General Science</option>
                            <option value="Signs" className="bg-slate-800">Signs</option>
                            <option value="Physics" className="bg-slate-800">Physics</option>
                            <option value="Chemistry" className="bg-slate-800">Chemistry</option>
                            <option value="Biology" className="bg-slate-800">Biology</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {errors.subjectSpecialization && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.subjectSpecialization && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.subjectSpecialization}
                          </p>
                        )}
                      </div>

                      <div className="transform transition-all duration-300 hover:scale-[1.01]">
                        <label htmlFor="qualification" className="block text-blue-200 text-sm font-medium mb-2 transition-colors">
                          Qualification
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your qualification"
                            className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                              errors.qualification ? 'border-red-500' : 'border-blue-500'
                            } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-300 hover:border-blue-400/80`}
                          />
                          {errors.qualification && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade-in">
                              <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.qualification && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                            <AlertCircle className="w-3 h-3" />
                            {errors.qualification}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Email field for other signup roles (not student, parent, or teacher) */}
                {authMode === 'signup' && selectedRole !== 'parent' && selectedRole !== 'student' && selectedRole !== 'teacher' && (
                  <div>
                    <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required={true}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 bg-slate-800 border-b-2 ${
                          errors.email ? 'border-red-500' : 'border-blue-500'
                        } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors`}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                )}

                {/* Username/Student ID field - hidden for student, parent, and teacher signup */}
                {!(authMode === 'signup' && (selectedRole === 'student' || selectedRole === 'parent' || selectedRole === 'teacher')) && (
                  <div>
                    <label htmlFor="username" className="block text-blue-200 text-sm font-medium mb-2">
                      {getUsernameLabel()}
                    </label>
                    <div className="relative">
                      {/* Icon for email or user */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                        {(selectedRole === 'teacher' || selectedRole === 'admin' || (selectedRole === 'student' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username.trim()))) ? (
                          <Mail className="w-5 h-5" />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </div>
                      <input
                        ref={usernameInputRef}
                        type={selectedRole === 'teacher' || selectedRole === 'admin' ? 'email' : 'text'}
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder={getUsernamePlaceholder()}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-800 border-b-2 ${
                          errors.username ? 'border-red-500' : 'border-blue-500'
                        } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-colors`}
                        aria-label={getUsernameLabel()}
                        aria-invalid={!!errors.username}
                        aria-describedby={errors.username ? 'username-error' : undefined}
                      />
                      {/* Show success indicator when field is valid */}
                      {!errors.username && formData.username.trim() && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {((selectedRole === 'teacher' || selectedRole === 'admin') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username.trim())) || 
                           (selectedRole === 'student' && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username.trim()) || /^[A-Za-z0-9]+$/.test(formData.username.trim()))) ||
                           ((selectedRole === 'parent') && /^[A-Za-z0-9]+$/.test(formData.username.trim())) ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : null}
                        </div>
                      )}
                      {errors.username && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.username && (
                      <p id="username-error" className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                        <AlertCircle className="w-3 h-3" />
                        {errors.username}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-blue-200 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    {/* Lock icon */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your password"
                      className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                        errors.password ? 'border-red-500' : formData.password && !errors.password && (authMode === 'login' || passwordStrength >= 2) ? 'border-green-500' : 'border-blue-500'
                      } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200`}
                      aria-label="Password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator (Signup only) */}
                  {authMode === 'signup' && formData.password && (
                    <div className="mt-2 space-y-1 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              passwordStrength === 0 ? 'w-0' :
                              passwordStrength === 1 ? 'w-1/4 bg-red-500' :
                              passwordStrength === 2 ? 'w-1/2 bg-orange-500' :
                              passwordStrength === 3 ? 'w-3/4 bg-yellow-500' :
                              'w-full bg-green-500'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength === 0 ? 'text-slate-400' :
                          passwordStrength === 1 ? 'text-red-400' :
                          passwordStrength === 2 ? 'text-orange-400' :
                          passwordStrength === 3 ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {passwordStrength === 0 ? 'Weak' :
                           passwordStrength === 1 ? 'Weak' :
                           passwordStrength === 2 ? 'Fair' :
                           passwordStrength === 3 ? 'Good' :
                           'Strong'}
                        </span>
                      </div>
                      {formData.password.length > 0 && formData.password.length < 6 && (
                        <p className="text-yellow-400 text-xs">Password must be at least 6 characters</p>
                      )}
                    </div>
                  )}
                  
                  {errors.password && (
                    <p id="password-error" className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-blue-200 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      {/* Lock icon */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={authMode === 'signup'}
                        placeholder="Confirm your password"
                        className={`w-full pl-11 pr-10 py-3 bg-slate-800 border-b-2 ${
                          errors.confirmPassword ? 'border-red-500' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-500' : 'border-blue-500'
                        } text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all duration-200`}
                      />
                      {errors.confirmPassword ? (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                      ) : formData.confirmPassword && formData.password === formData.confirmPassword ? (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                      ) : null}
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fade-in transition-all duration-200">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Remember Me checkbox for login */}
                {authMode === 'login' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                        aria-label="Remember me"
                      />
                      <label htmlFor="rememberMe" className="text-blue-200 text-sm cursor-pointer select-none">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        // TODO: Implement forgot password functionality
                        alert('Forgot password functionality coming soon!');
                      }}
                      className="text-blue-300 hover:text-blue-100 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${currentRole.accent} hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900`}
                  aria-label={authMode === 'login' ? 'Login to your account' : 'Create new account'}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{authMode === 'login' ? 'Login' : 'Sign Up'}</span>
                  )}
                </button>
              </form>

              {/* Toggle between Login and Sign Up */}
              <div className="text-center pt-4 border-t border-slate-700">
                <p className="text-blue-200 text-sm">
                  {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => {
                      const newAuthMode = authMode === 'login' ? 'signup' : 'login';
                      setAuthMode(newAuthMode);
                      // Reset to student if switching to signup and admin is selected (since admin is not available in signup)
                      if (newAuthMode === 'signup' && selectedRole === 'admin') {
                        setSelectedRole('student');
                      }
                      setFormData({ username: '', email: '', password: '', confirmPassword: '', fullName: '', dateOfBirth: '', phone: '', academicRegion: '', class: '', relationship: '', country: '', region: '', subjectSpecialization: '', qualification: '' });
                      setErrors({});
                    }}
                    className="text-white font-semibold hover:underline underline-offset-2 transition-colors hover:text-blue-300"
                  >
                    {authMode === 'login' ? 'Sign up' : 'Login'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Dynamic Illustration */}
          <div className={`bg-gradient-to-br ${currentRole.color} p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden`}>
            {/* Wave pattern overlay with parallax */}
            <div 
              className="absolute inset-0 opacity-20 transition-transform duration-75 ease-out"
              style={{ transform: parallaxTransform.wave1 }}
            >
              <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                <path
                  d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
                  fill="white"
                />
                <path
                  d="M0,250 Q100,200 200,250 T400,250 L400,400 L0,400 Z"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>
            {/* Second wave layer with different parallax speed */}
            <div 
              className="absolute inset-0 opacity-10 transition-transform duration-75 ease-out"
              style={{ transform: parallaxTransform.wave2 }}
            >
              <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                <path
                  d="M0,180 Q150,130 250,180 T400,180 L400,400 L0,400 Z"
                  fill="white"
                />
                <path
                  d="M0,230 Q150,180 250,230 T400,230 L400,400 L0,400 Z"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <div key={selectedRole} className="transition-all duration-500 animate-fade-in">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {currentRole.title}
                </h2>
                <p className="text-blue-100 text-lg">
                  {currentRole.subtitle}
                </p>
              </div>

              {/* Dynamic Illustration based on role with parallax */}
              <div className="mt-8 transition-all duration-500 ease-in-out relative min-h-[300px]">
                <div
                  key={selectedRole}
                  className="animate-fade-in transition-transform duration-75 ease-out"
                  style={{ 
                    transform: parallaxTransform.illustration
                  }}
                >
                  {selectedRole === 'student' && <StudentIllustration isInitialMount={isInitialMount} />}
                  {selectedRole === 'parent' && <ParentIllustration isInitialMount={isParentInitialMount} />}
                  {selectedRole === 'teacher' && <TeacherIllustration isInitialMount={isTeacherInitialMount} />}
                  {selectedRole === 'admin' && <AdminIllustration isInitialMount={isAdminInitialMount} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Illustration Component
const StudentIllustration = ({ isInitialMount }: { isInitialMount: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${isInitialMount ? 'animate-pop-up-bottom-left' : ''}`}>
      <Lottie
        animationData={studentAnimation}
        loop={true}
        className="w-full h-full max-w-md"
      />
    </div>
  );
};

// Parent Illustration Component
const ParentIllustration = ({ isInitialMount }: { isInitialMount: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${isInitialMount ? 'animate-pop-up-bottom-left' : ''}`}>
      <Lottie
        animationData={parentAnimation}
        loop={true}
        className="w-full h-full max-w-md"
      />
    </div>
  );
};

// Teacher Illustration Component
const TeacherIllustration = ({ isInitialMount }: { isInitialMount: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${isInitialMount ? 'animate-pop-up-bottom-left' : ''}`}>
      <Lottie
        animationData={teacherAnimation}
        loop={true}
        className="w-full h-full max-w-3xl"
      />
    </div>
  );
};

// Admin Illustration Component
const AdminIllustration = ({ isInitialMount }: { isInitialMount: boolean }) => {
  return (
    <div className={`flex items-center justify-center ${isInitialMount ? 'animate-pop-up-bottom-left' : ''}`}>
      <Lottie
        animationData={adminAnimation}
        loop={true}
        className="w-full h-full max-w-md"
      />
    </div>
  );
};

export default AuthPage;

