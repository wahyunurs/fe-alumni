import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  
  const basePath = process.env.NEXT_PUBLIC_BASEPATH;

  return <div className='h-screen flex items-center justify-center' >

    <div>

      <Image src={`${basePath}/draw/undraw_Not_found_re_bh2e.png`} alt="Not Found Illustration" width={400} height={400} style={{ maxWidth: '100%', height: 'auto' }} />
      
      <h2 className='font-semibold text-4xl text-center text-gray-500 my-3' >404 - Not Found</h2>

      <p className='text-center' >Could not find the requested page, you can return <Link href="/" className='text-blue-500' >home</Link> </p>

    </div>

  </div>
  
}