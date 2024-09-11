import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userlogin } from '../../../app/features/userSlice'
import { canAccessRole, icons } from '../../../constants'

// Download Application android and iOS
// const androidApp = "/Mobile/Android/shipping-turbo.apk";
// const qrAndroidApp = "/Mobile/Android/qr-Android.png";
// const iosApp = "/Mobile/IOS/shipping-turbo.tar.gz";
// const qriosApp = "/Mobile/IOS/qr-ios.png";

const androidApp = '/login'
const iosApp = '/login'

const Login = () => {
  const { userData, loading } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData.id && userData.role == canAccessRole.admin) {
      navigate('/dashboard')
    } else if (userData.id && userData.role == canAccessRole.da) {
      navigate('/dashboard/da')
    }
  }, [userData, navigate])

  const handelLogin = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form)
    dispatch(userlogin(formData))
  }

  return (
    <div className="relative min-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="container flex items-center flex-col-reverse md:flex-row md:justify-evenly gap-5">
        {/* Download */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="gradient-text text-3xl md:text-4xl font-extrabold my-5">
            Download Application
          </h1>
          {/* buttons */}
          <div className="flex items-center justify-center gap-5 mb-5">
            <Link to={androidApp} className="btn flex items-center gap-1 w-fit">
              <span className="text-2xl text-receivColor">{icons.androidIcon}</span>
              <span>Android</span>
            </Link>
            <Link to={iosApp} className="btn flex items-center gap-1 w-fit">
              <span className="text-2xl ">{icons.iosIcon}</span>
              <span>Apple</span>
            </Link>
          </div>
          {/* Qr Code */}
          {/* <div className="flex items-center justify-center gap-5">
            <div className="p-2 rounded-lg border-2 border-mainColor">
              <img src={qrAndroidApp} alt="shipping-turbo-qr-Android-App" />
            </div>
            <div className="p-2 rounded-lg border-2 border-mainColor">
              <img src={qriosApp} alt="shipping-turbo-qr-Android-App" />
            </div>
          </div> */}
        </div>
        <form
          className="w-96 bg-transparent p-8 rounded-3xl border-2 shadow-xl shadow-white"
          onSubmit={handelLogin}
        >
          {/* Text Header */}
          <h3 className="gradient-text text-center text-6xl font-extrabold mb-8">Login</h3>
          {/* Email input */}
          <div className="flex flex-col gap-4 mb-5">
            <label htmlFor="username" className="label-input">
              Email
            </label>
            <input type="email" id="username" name="email" className="input-faild" required />
          </div>
          {/* Password input */}
          <div className="flex flex-col gap-4 mb-8">
            <label htmlFor="password" className="label-input">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-faild"
              required
            />
          </div>
          {/* button submite */}
          <button
            className="btn block m-auto disabled:bg-black disabled:border-black disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex gap-1 items-center">
                <span className="animate-spin text-mainColor text-2xl">{icons.spin}</span>
                loading...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
