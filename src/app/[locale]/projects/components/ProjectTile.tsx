'use client';

import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ProjectTileProps {
    index: number;
    title: string;
    backgroundImage: StaticImageData;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ index, title, backgroundImage }) => {
    const overlayColors = [
        'bg-black/50',
        'bg-zinc-400/50',
        'bg-gray-700/50',
        'bg-orange-400/50',
        'bg-sky-800/50',
        'bg-zinc-950/50',
        'bg-slate-900/50',
        'bg-zinc-950/50',
        'bg-zinc-700/50'
    ];

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 aspect-square relative overflow-hidden group">
            {/* Use Next/Image for better image optimization */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className={`absolute inset-0 transition-opacity duration-500 ${overlayColors[index % 9]} group-hover:opacity-0`}></div>
            </div>

            {/* Title that moves up on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-y-15">
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-white  font-['Lato']">
                    {title}
                </h3>
            </div>

            {/* Button that transitions from bottom to center */}
            <div className="absolute inset-x-0  bottom-20 flex items-center justify-center transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-1/2 group-hover:translate-y-1/2">
                <Link href="projects/5">
                    <button className="w-32 sm:w-40 bg-white h-10 sm:h-12  rounded-lg text-text-text-on-color text-sm sm:text-base  font-['Lato'] capitalize transition-all duration-300 hover:bg-actions-primary">
                        view project
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProjectTile;