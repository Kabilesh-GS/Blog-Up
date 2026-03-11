type Prop = {
  email : string
}

export default function Profile({email} : Prop) {
  return (
      email ? <div>{email}</div> : <p>login</p>
  )
}