import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{title}</h1>
        {description && (
          <p className="text-base text-gray-600">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
