export default function SignIn() {
  return (
    <div className="flex justify-center mt-20 font-[Urbanist]">
      <div className="w-[30%]">
        <form className="flex flex-col gap-6">
          <div className="flex justify-between items-center ">
            <label>Email</label>
            <input type="email" className="bg-gray-100 rounded p-1.5" placeholder="Email"/>
          </div>
          <div className="flex justify-between items-center">
            <label>Password</label>
            <input type="password" className="bg-gray-100 rounded p-1.5" placeholder="Password"/>
          </div>
          <button type="submit" className="bg-black text-white py-3 rounded-full cursor-pointer">Sign In</button>
        </form>
      </div>
    </div>
  )
}