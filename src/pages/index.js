
import Banner from '@/components/home/Banner';
import Navbar from '../components/home/navbar/Navbar'
import Footer from '@/components/home/Footer';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';



export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="bg-white" >
      <Navbar />
      <Banner />
      <Footer />
    </div>
  );
}
