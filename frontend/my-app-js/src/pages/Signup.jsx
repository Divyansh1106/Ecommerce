import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import citiesByState from "../assets/states"; 
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckoutPage from "./Checkout";
import UseUserStore from "../store/userStore";
/* ================= YUP SCHEMAS ================= */

const stage1Schema = yup.object({
  name: yup.string().min(3, "Min 3 characters").required(),
  email: yup.string().email("Invalid email").required(),
  phone: yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone").required(),
  password: yup.string().min(6, "Min 6 characters").required(),
  otp: yup.string().length(6, "OTP must be 6 digits").required(),
});

const stage2Schema = yup.object({
  address: yup.string().min(10, "Min 10 characters").required(),
  state: yup.string().required("Please select state"),
  city: yup.string().required("Please select city"),
  PIN: yup.string().matches(/^\d{6}$/, "Invalid PIN").required(),
});

/* ================= MOCK DATA ================= */

const citiesByStates=citiesByState;



/* ================= COMPONENT ================= */

const Signup = () => {
  const {user,setUser,addAddress} = UseUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from;

  const handleSignupSuccess = () => {
    if (fromPage === "cart") {
      navigate("/checkout");
    } else {
      navigate("/");
    }
  };
  const [stage, setStage] = useState(1);

  /* ---------- STAGE 1 FORM ---------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stage1Schema),
  });

  /* ---------- STAGE 2 FORM ---------- */
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(stage2Schema),
  });

  /* ---------- DROPDOWN STATE ---------- */
  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  /* ---------- FILTERS ---------- */
  const filteredStates = Object.keys(citiesByState).filter((state) =>
    state.toLowerCase().includes(stateQuery.toLowerCase())
  );

  const filteredCities = selectedState
    ? citiesByStates[selectedState].filter((city) =>
        city.toLowerCase().includes(cityQuery.toLowerCase())
      )
    : [];

  /* ---------- SUBMIT HANDLERS ---------- */
  const onSubmitStage1 = (data) => {
    if (data.otp !== "123456") {
      alert("Invalid OTP");
      return;
    }
    
   setUser({name:data.name,email:data.email,password:data.password,phone:data.phone});
    setStage(2);
  };

  const onSubmitStage2 = (data) => {
    addAddress({
  id: user.addresses.length + 1,
  ...data
});
    
    handleSignupSuccess();
    alert("Signup Completed ✅");
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-500 to-emerald-600">
      {/* HEADER */}
      <header className="h-16 bg-white shadow-md flex items-center justify-center">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white text-xl font-bold">S</span>
        </div>
        <h1 className="text-2xl font-bold text-emerald-600">ShopEase</h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {/* ================= STAGE 1 ================= */}
        {stage === 1 && (
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Step 1 · Verify</h2>

            <div className="mb-4">
              <input 
                {...register("name")} 
                placeholder="Name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>}
            </div>

            <div className="mb-4">
              <input 
                {...register("email")} 
                placeholder="Email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
            </div>

            <div className="mb-4">
              <input 
                {...register("phone")} 
                placeholder="Phone" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>}
            </div>

            <div className="mb-6">
              <input
                {...register("otp")}
                placeholder="OTP (123456)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp?.message}</p>}
            </div>

            <button 
              onClick={handleSubmit(onSubmitStage1)}
              className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Continue
            </button>
          </div>
        )}

        {/* ================= STAGE 2 ================= */}
        {stage === 2 && (
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Step 2 · Address
            </h2>

            {/* STATE */}
            <div className="mb-4 relative">
              <input
                {...register2("state")}
                value={stateQuery}
                onChange={(e) => {
                  setStateQuery(e.target.value);
                  setOpenState(true);
                }}
                onFocus={() => setOpenState(true)}
                onBlur={() => setTimeout(() => setOpenState(false), 200)}
                placeholder="State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />

              {openState && filteredStates.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                  {filteredStates.map((state) => (
                    <li
                      key={state}
                      onMouseDown={(e) => {
                        e.preventDefault();

                        setSelectedState(state);
                        setStateQuery(state);
                        setValue("state", state);
                        setOpenState(false);
                        setCityQuery("");
                      }}
                      className="px-4 py-2 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      {state}
                    </li>
                  ))}
                </ul>
              )}
              {errors2.state && <p className="text-red-500 text-sm mt-1">{errors2.state?.message}</p>}
            </div>

            {/* CITY */}
            <div className="mb-4 relative">
              <input
                {...register2("city")}
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setOpenCity(true);
                }}
                onFocus={() => setOpenCity(true)}
                onBlur={() => setTimeout(() => setOpenCity(false), 200)}
                placeholder="City"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />

              {openCity && filteredCities.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                  {filteredCities.map((city) => (
                    <li
                      key={city}
                        onMouseDown={(e) => {
                        e.preventDefault();
                        setCityQuery(city);
                        setValue("city", city);
                        setOpenCity(false);
                      }}
                      className="px-4 py-2 hover:bg-emerald-50 cursor-pointer transition"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
              {errors2.city && <p className="text-red-500 text-sm mt-1">{errors2.city?.message}</p>}
            </div>

            <div className="mb-4">
              <input
                {...register2("address")}
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors2.address && <p className="text-red-500 text-sm mt-1">{errors2.address?.message}</p>}
            </div>

            <div className="mb-6">
              <input 
                {...register2("PIN")} 
                placeholder="PIN" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              {errors2.PIN && <p className="text-red-500 text-sm mt-1">{errors2.PIN?.message}</p>}
            </div>

            <button 
              onClick={handleSubmit2(onSubmitStage2)}
              className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Signup;