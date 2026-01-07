import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUserStore from "../store/userStore";
import * as yup from "yup";
import logo from "../assets/images/logo.png";

const stage1Schema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required(),
  email: yup.string().email("Invalid email").required(),
  phone: yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone").required(),
  password: yup.string().min(6, "Min 6 characters").required(),
  otp: yup.string().length(6, "OTP must be 6 digits").required(),
});

const Signup = () => {
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stage1Schema),
  });

  const onSubmit = (data) => {
    if (data.otp !== "123456") {
      alert("Invalid OTP");
      return;
    }
    setUser(data);
    alert("Stage 1 Completed ✅");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-500 to-emerald-600">

      {/* Header */}
      <header className="flex items-center justify-center h-16 bg-white">
        <img src={logo} alt="Logo" className="h-10 mr-2" />
        <h1 className="text-2xl font-bold text-emerald-400">ShopEase</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Account
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Step 1 of 3 · Verify your details
          </p>

          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div>
            <input
              {...register("otp")}
              placeholder="Enter OTP (123456)"
              className="w-full px-4 py-2 border rounded-lg text-center tracking-widest focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-500 text-sm">{errors.otp?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Verify & Continue →
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-2 sm:mt-0 text-sm">
            <span className="hover:text-emerald-400 cursor-pointer">Privacy</span>
            <span className="hover:text-emerald-400 cursor-pointer">Terms</span>
            <span className="hover:text-emerald-400 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Signup;
