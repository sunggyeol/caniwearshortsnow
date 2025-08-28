import LocationWeather from '@/components/LocationWeather';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <main className="flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 text-center px-4">Can I Wear Shorts Now?</h1>
          <LocationWeather />
        </main>
      </div>
      
      {/* Bottom links */}
      <footer className="flex justify-center items-center gap-4 pb-4 px-4">
        <a 
          href="https://github.com/sunggyeol" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 sm:p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 touch-manipulation"
          aria-label="GitHub Profile"
        >
          <Image 
            src="/github-mark-white.svg" 
            alt="GitHub" 
            width={20} 
            height={20}
            className="dark:invert-0 invert"
          />
        </a>
        
        <a 
          href="https://sungohdev.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 sm:p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 touch-manipulation"
          aria-label="Personal Website"
        >
          <Image 
            src="/personal-center-svgrepo-com.svg" 
            alt="Personal Website" 
            width={20} 
            height={20}
            className="dark:invert-0 invert"
          />
        </a>
      </footer>
    </div>
  );
}
