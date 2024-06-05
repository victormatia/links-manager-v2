import vituLogo from '@/assets/VITU-logo.svg'
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='w-full h-10  flex items-center justify-between bg-black px-4 absolute bottom-0'>
      <span className='text-xs font-light flex items-center'>© Todos os direitos reservados</span>
      <span className='text-xs font-light flex items-center'>
        Um site desenvolvido por
        <a target='_blank' href='https://vitu-portfolio.vercel.app/' rel="noreferrer">
          <Image className='w-9 ml-1' src={ vituLogo } alt="VITU-logo" />
        </a>
      </span>
    </footer>
  );
}