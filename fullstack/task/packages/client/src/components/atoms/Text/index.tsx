import React, { HTMLAttributes } from 'react';

const textVariants = {
    defaults: 'text-base text-black dark:text-white font-normal',
    h1: 'text-[32px] leading-[48px] font-medium',
    h2: 'text-[28px] leading-[42px] font-medium',
    h3: 'text-[24px] leading-[36px] font-medium',
    xl: 'text-[20px] leading-[30px]',
    lg: 'text-[18px] leading-[30px]',
    md: '',
    sm: 'text-[14px] leading-[21px]',
    xs: 'text-[12px] leading-[18px]',
    error: 'text-[12px] leading-[30px] text-danger-500',
};

interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: keyof typeof textVariants;
    className?: string;
    tx?: string;
}

export const Text = ({ variant = 'md', className = '', tx, children, ...props }: Props) => {
    const content = tx ? tx : children;
    return (
        <span
            className={`
        ${textVariants.defaults}
        ${textVariants[variant]}
        ${className}
      `}
            {...props}
        >
            {content}
        </span>
    );
};
