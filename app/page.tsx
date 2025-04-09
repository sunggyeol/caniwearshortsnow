import LocationWeather from '@/components/LocationWeather';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 whitespace-nowrap">Can I Wear Shorts Now?</h1>
        <LocationWeather />
      </main>
    </div>
  );
}
