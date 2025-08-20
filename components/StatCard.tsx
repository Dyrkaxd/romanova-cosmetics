import React, { SVGProps } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from './Icons';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.FC<SVGProps<SVGSVGElement>>;
    isLoading: boolean;
    change?: number;
    colorClass?: string;
    iconColorClass?: string;
    subValue?: string;
    tooltipText?: string;
}

const StatCard = ({ title, value, icon: Icon, isLoading, change, colorClass, iconColorClass, subValue, tooltipText }: StatCardProps) => {
    const isPositive = change !== undefined && change >= 0;

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md hover:border-rose-200 dark:hover:border-rose-500/50 relative group">
            {tooltipText && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    {tooltipText}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800"></div>
                </div>
            )}
            <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
                <Icon className={`w-7 h-7 flex-shrink-0 ${iconColorClass || 'text-slate-400 dark:text-slate-500'}`} />
            </div>
            {isLoading ? (
                <div className="mt-2 space-y-2">
                    <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                    {(change !== undefined || subValue) && <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>}
                </div>
            ) : (
                <div className="mt-2">
                    <p className={`text-3xl font-bold ${colorClass || 'text-slate-800 dark:text-slate-100'}`}>{value}</p>
                    {change !== undefined ? (
                        <div className="flex items-center text-xs font-semibold mt-1">
                            <span className={`flex items-center ${isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                {isPositive ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1"/> : <ArrowTrendingDownIcon className="w-4 h-4 mr-1"/>}
                                {change.toFixed(1)}%
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 ml-1">vs минулий період</span>
                        </div>
                    ) : subValue && (
                        <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">{subValue}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatCard;
