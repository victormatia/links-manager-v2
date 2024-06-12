import Image from "next/image";
import profile from '@/assets/profile.jpg'
import BioComponent from "./BioComponent";

export default function Header() {
  return (
    <header className='flex flex-col items-center justify-center w-full bg-gradient-gray-to-transparent p-6 pb-4 gap-2'>
      <Image className='w-24 h-24 object-cover rounded-full' src={ profile } alt="profile" />
      <span className='text-2xl font-semibold'>Vitória Maia</span>
      <BioComponent />
    </header>
  );
}