import Logo from '../../../public/Logo transparent.png'

export default function Loading() {
  return (
    <div>
      <img className='w-20 animate-ping' src={Logo}/>
    </div>
  )
}