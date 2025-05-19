import React from 'react'

const Button = ({children, color = "blue", onClick, className}) => {
    const colorClasses = {
        blue: "bg-blue-500 hover:bg-blue-600",
        red: "bg-red-500 hover:bg-red-600",
        green: "bg-green-500 hover:bg-green-600",
        gray: "bg-gray-500 hover:bg-gray-600",
        yellow: "bg-yellow-500 hover:bg-yellow-600",
    };

    return (
        <button onClick={onClick} className={`px-4 py-2 rounded text-white font-semibold ${colorClasses[color]} ${className}`}>{children}</button>
    )
}

export default Button