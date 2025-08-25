"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getData } from "@/libs/axios/server";

interface Image {
  id: number;
  src: string;
  // title: string;
  date: string;
  month: string;
}

interface ApiImage {
  id: number;
  image: string;
}

interface PaginationData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  has_more_pages: boolean;
  next_page_url: string | null;
  prev_page_url: string | null;
}

interface ApiResponse {
  status: boolean;
  msg: string;
  data: {
    images: ApiImage[];
    pagination: PaginationData;
  };
}

interface ImageCardProps {
  image: Image;
  onOpenModal: (image: Image) => void;
}

interface ModalProps {
  image: Image | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
}

const PhotoGalleryPage = () => {
  const t = useTranslations('projects');
  const params = useParams();
  const [currentFilter] = useState<string>("all");
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(false);
  // const [totalImages, setTotalImages] = useState<number>(0);
  
  // Modal state
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Extract and decode project ID from URL params
  const rawProjectId = params?.id;
  const projectId = rawProjectId ? decodeURIComponent(Array.isArray(rawProjectId) ? rawProjectId[0] : rawProjectId) : null;

  // Debug: Log the decoded project ID
  console.log('Raw Project ID:', rawProjectId);
  console.log('Decoded Project ID:', projectId);

  // Fetch images from API
  const fetchImages = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!projectId) {
      setError(t('errors.noProjectId') || 'No project ID provided');
      setLoading(false);
      return;
    }
    
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      // Use the decoded project ID for API call with pagination
      const response: ApiResponse = await getData(`property-constrication-images/${encodeURIComponent(projectId)}?page=${page}`);
      
      if (response.status && response.data && response.data.images) {
        // Transform API data to match our Image interface
        const transformedImages: Image[] = response.data.images.map((apiImage) => ({
          id: apiImage.id,
          src: apiImage.image,
          // title: t('imageTitle', { number: (page - 1) * (response.data.pagination?.per_page || 10) + index + 1 }) || `Image ${(page - 1) * (response.data.pagination?.per_page || 10) + index + 1}`,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          month: new Date().toLocaleDateString('en-US', { month: 'long' }).toLowerCase()
        }));
        
        if (append) {
          setAllImages(prev => [...prev, ...transformedImages]);
        } else {
          setAllImages(transformedImages);
        }

        // Update pagination info
        if (response.data.pagination) {
          setHasMorePages(response.data.pagination.has_more_pages);
          // setTotalImages(response.data.pagination.total);
          setCurrentPage(response.data.pagination.current_page);
        }
      } else {
        setError(t('errors.loadFailed') || 'Failed to load images');
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(t('errors.loadFailedRetry') || 'Failed to load images. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [projectId, t]);

  // Handle load more button click
  const handleLoadMore = () => {
    if (hasMorePages && !loadingMore) {
      fetchImages(currentPage + 1, true);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchImages(1, false);
  }, [fetchImages]);

  // Filter images based on selected month
  useEffect(() => {
    if (currentFilter === "all") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(
        allImages.filter((image) => image.month === currentFilter)
      );
    }
  }, [currentFilter, allImages]);

  // Modal functions
  const openModal = (image: Image) => {
    setModalImage(image);
    setIsModalOpen(true);
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setModalImage(filteredImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setModalImage(filteredImages[prevIndex]);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isModalOpen, currentImageIndex, filteredImages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const Modal = ({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }: ModalProps) => {
    if (!isOpen || !image) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-95 backdrop-blur-sm">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 text-white hover:text-gray-300 transition-colors  bg-opacity-50 rounded-full hover:bg-opacity-70"
          aria-label={t('modal.closeModal') || 'Close modal'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image container with navigation arrows */}
        <div className="relative max-w-[95vw] max-h-[95vh] flex flex-col items-center group">
          <div className="relative">
            <img
              src={image.src}
              // alt={image.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23d1d5db'%3E" + encodeURIComponent(t('errors.imageNotAvailable') || 'Image not available') + "%3C/text%3E%3C/svg%3E";
              }}
            />
            
            {/* Navigation arrows positioned on image edges */}
            {currentIndex > 0 && (
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-[#dba426] text-white hover:text-gray-300 transition-all duration-300  bg-opacity-30 hover:bg-opacity-70 rounded-full opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label={t('modal.previousImage') || 'Previous image'}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {currentIndex < totalImages - 1 && (
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 text-white hover:text-gray-300 transition-all duration-300 bg-[#dba426]  bg-opacity-30 hover:bg-opacity-70 rounded-full opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label={t('modal.nextImage') || 'Next image'}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Image info */}
          <div className="mt-4 text-center text-white  bg-opacity-50 px-6 py-3 rounded-lg backdrop-blur-sm">
            {/* <h3 className="text-lg font-semibold mb-1">{image.title}</h3> */}
            <p className="text-sm opacity-80">{image.date}</p>
            {/* <p className="text-xs opacity-60 mt-1">
              {t('modal.imageCounter', { current: currentIndex + 1, total: totalImages }) || `${currentIndex + 1} of ${totalImages}`}
            </p> */}
          </div>
        </div>

        {/* Click outside to close */}
        <div 
          className="absolute inset-0 -z-10" 
          onClick={onClose}
          aria-label={t('modal.closeModal') || 'Close modal'}
        />
      </div>
    );
  };

  const ImageCard = ({ image, onOpenModal }: ImageCardProps) => (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/50">
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          // alt={image.title}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          loading="lazy"
          onClick={() => onOpenModal(image)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280'%3E" + encodeURIComponent(t('errors.imageNotAvailable') || 'Image not available') + "%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {/* Overlay with expand icon */}
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center cursor-pointer" onClick={() => onOpenModal(image)}>
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Full view button */}
        <button
          onClick={() => onOpenModal(image)}
          className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          aria-label={t('buttons.viewFullSize') || 'View full size'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      <div className="p-3 sm:p-4 lg:p-5">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1 text-gray-800">
          {/* {image.title} */}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2">{image.date}</p>
        <span className="inline-block bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {image.month.charAt(0).toUpperCase() + image.month.slice(1)}
        </span>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6 relative">
        <div className="max-w-7xl mx-auto pt-[clamp(7rem,7vw,6rem)] relative z-10">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-800">
              📸 {t('title') || 'Photo Gallery'}
            </h1>
            {projectId && (
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-600">
                {projectId}
              </h2>
            )}
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-4 rounded-full"></div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              {t('loading') || 'Loading...'}
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6 relative">
        <div className="max-w-7xl mx-auto pt-[clamp(7rem,7vw,6rem)] relative z-10">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-800">
              📸 {t('title') || 'Photo Gallery'}
            </h1>
            {projectId && (
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-600">
                {projectId}
              </h2>
            )}
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-4 rounded-full"></div>
          </div>
          
          <div className="text-center text-red-600 text-lg sm:text-xl mt-8 sm:mt-12 px-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => {
                setCurrentPage(1);
                setAllImages([]);
                fetchImages(1, false);
              }} 
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('buttons.tryAgain') || 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="max-w-7xl mx-auto pt-[clamp(7rem,7vw,6rem)] relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-800">
            📸 {t('title') || 'Photo Gallery'}
          </h1>
          {/* Show decoded project name */}
          {projectId && (
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-600">
              {projectId}
            </h2>
          )}
          <div className="w-24 h-1 bg-gray-300 mx-auto mb-4 rounded-full"></div>
          
        </div>

        {/* Gallery */}
        {filteredImages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(index % 20) * 100}ms` }}
                >
                  <ImageCard image={image} onOpenModal={openModal} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMorePages && (
              <div className="flex justify-center mt-8 sm:mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`
                    inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 
                    text-sm sm:text-base font-semibold rounded-full 
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    ${loadingMore 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 transform'
                    }
                  `}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {t('loadingMore') || 'Loading more...'}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {t('loadMore') || 'Load More Photos'}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* All loaded message */}
            {!hasMorePages && allImages.length > 0 && (
              <div className="text-center hidden mt-8 sm:mt-12">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('allPhotosLoaded') || 'All photos loaded'}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600 text-lg sm:text-xl mt-8 sm:mt-12 px-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📷</div>
            <p>{t('noPhotos.title') || 'No photos available yet'}</p>
            <p className="text-sm mt-2 opacity-75">{t('noPhotos.subtitle') || 'Check back later for updates'}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        image={modalImage}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
        currentIndex={currentImageIndex}
        totalImages={filteredImages.length}
      />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Premium subtle texture */
        body {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }
        }

        /* Desktop optimizations */
        @media (min-width: 1025px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1536px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        /* Touch devices hover fix */
        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none !important;
          }

          .group:active {
            transform: scale(0.98);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
            opacity: 1;
          }

          .transition-all {
            transition: none;
          }

          .group:hover {
            transform: none !important;
          }
        }

        /* Dark mode support - keeping it classic */
        @media (prefers-color-scheme: dark) {
          .bg-gray-50 {
            background-color: #1f2937;
          }
          
          .bg-white {
            background-color: #374151;
          }
          
          .text-gray-800 {
            color: #f9fafb;
          }
          
          .text-gray-600 {
            color: #d1d5db;
          }
          
          .text-gray-700 {
            color: #e5e7eb;
          }
          
          .bg-gray-100 {
            background-color: #4b5563;
          }
          
          .border-gray-100 {
            border-color: #4b5563;
          }
          
          .bg-gray-300 {
            background-color: #6b7280;
          }
        }

        /* Print styles */
        @media print {
          .bg-gray-50 {
            background: white !important;
          }

          .shadow-lg, .hover\\:shadow-2xl {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PhotoGalleryPage;