import { ReactNode } from 'react';

interface ContainerProps {
    children?: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
    return <div className="flex-1 bg-primary-600 p-8">{children}</div>;
};
