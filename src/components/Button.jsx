import React from 'react'

const Button = ({type = "button", children, color = "blue", onClick, className}) => {
    const colorClasses = {
        white: "bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border",
        blue: "bg-blue-500 hover:bg-blue-600 text-white",
        red: "bg-red-500 hover:bg-red-600 text-white",
        green: "bg-green-500 hover:bg-green-600 text-white",
        gray: "bg-gray-500 hover:bg-gray-600 text-white",
        yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
    };

    return (
        <button type={type} onClick={onClick} className={`px-4 py-2 rounded font-semibold cursor-pointer ${colorClasses[color]} ${className}`}>{children}</button>
    )
}

export default Button