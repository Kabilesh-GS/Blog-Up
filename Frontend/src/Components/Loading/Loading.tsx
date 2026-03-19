import Logo from '../../../public/Logo transparent.png'

export default function Loading() {
  return (
      <div className={`flex h-lvh justify-center items-center`}>
        <div className=''>
          <img className='w-60 animate-ping' src={Logo}/>
        </div>
      </div>
  )
}