import { Link } from 'react-router';
import LogoImage from '../assets/logo.png'

export default function Logo(){
    return (
       <Link to='/'>
        <div className='flex items-end'>
        <img className='mb-2' src={LogoImage} alt="" />
        <p className='text-3xl -ml-2 font-extrabold text-gray-900'>ProFast</p>
        </div>
       </Link>
        
    );
}