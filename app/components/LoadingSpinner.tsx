import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'white' | 'gray';
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

export default function LoadingSpinner({
    size = 'md',
    color = 'blue',
    text = 'Loading...',
    fullScreen = false,
    className = ''
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const colorClasses = {
        blue: 'border-blue-600',
        white: 'border-white',
        gray: 'border-gray-600'
    };

    const spinner = (
        <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
            <div className={`animate-spin rounded-full border-2 border-gray-300 ${sizeClasses[size]} ${colorClasses[color]} border-t-transparent`}></div>
            {text && (
                <p className={`text-sm font-medium ${color === 'white' ? 'text-white' : 'text-gray-600'
                    }`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
} 