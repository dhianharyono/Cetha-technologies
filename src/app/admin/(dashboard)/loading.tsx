import React from 'react';

export default function DashboardLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-9 w-64 bg-white/5 rounded-xl" />
                    <div className="h-5 w-80 max-w-full bg-white/5 rounded-lg" />
                </div>
                <div className="h-11 w-40 bg-white/5 rounded-xl shrink-0" />
            </div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#131826]/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2.5 flex-1">
                                <div className="h-4 w-24 bg-white/5 rounded" />
                                <div className="h-8 w-16 bg-white/5 rounded-lg" />
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics/Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Left Card */}
                <div className="bg-[#131826]/40 border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-lg" />
                        <div className="h-6 w-48 bg-white/5 rounded-md" />
                    </div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-4 w-28 bg-white/5 rounded" />
                                    <div className="h-4 w-16 bg-white/5 rounded" />
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2.5" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Card */}
                <div className="bg-[#131826]/40 border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-lg" />
                        <div className="h-6 w-48 bg-white/5 rounded-md" />
                    </div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-4 w-28 bg-white/5 rounded" />
                                    <div className="h-4 w-16 bg-white/5 rounded" />
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2.5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
