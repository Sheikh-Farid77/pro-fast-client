import Poster from '../../assets/be-a-merchant-bg.png'
import Merchant from '../../assets/location-merchant.png'

export default function BeMarchant() {
  return (
    <section className="bg-slate-100 px-4 py-8">
      <div
        className="max-w-6xl mx-auto bg-[rgba(3,55,61,1)] rounded-3xl p-6 md:p-12"
        style={{
          backgroundImage: `url(${Poster})`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-white my-4">
              Merchant and Customer Satisfaction is Our First Priority
            </h2>
            <p className="text-gray-200 text-base md:text-lg">
              We offer the lowest delivery charge with the highest value along with
              100% safety of your product. Pathao courier delivers your parcels in
              every corner of Bangladesh right on time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start">
              <button className="text-lg md:text-xl font-black py-3 md:py-4 px-6 md:px-8 rounded-full bg-[#CAEB66] text-black mt-4 sm:mt-3 sm:mr-3">
                Become a Merchant
              </button>
              <button className=" md:text-xl font-black py-3 md:py-4 px-6 md:px-8 rounded-full border-2 border-[#CAEB66] text-[#CAEB66] mt-3 sm:mt-4 md:mt-3">
                Earn with ProFast Courier
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full md:w-auto flex justify-center">
            <img
              src={Merchant}
              alt="Merchant"
              className="max-h-[300px] md:max-h-[400px] w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
