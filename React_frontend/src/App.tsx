import { Header } from './components/Header';
import { SleepForm } from './components/SleepForm';
export function App() {
  return (
    <div className="min-h-screen w-full bg-midnight-900 text-white selection:bg-accent-teal selection:text-midnight-900 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-teal/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-violet/5 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
        <Header />

        <main className="w-full flex justify-center">
          <SleepForm />
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Sleep Quality Predictor. Local AI
            Inference System.
          </p>
        </footer>
      </div>
    </div>);

}