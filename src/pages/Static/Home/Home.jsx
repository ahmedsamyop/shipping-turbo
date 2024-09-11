import mainImage from "/main.png";

const Home = () => {
  return (
    <section className="min-h-[calc(100vh-70px)] py-10 overflow-hidden">
      <div className="container lg:flex items-center">
        {/* text content */}
        <div>
          <h1 className="gradient-text text-7xl leading-[75px] tracking-[-0.04em] font-extrabold mb-5">
            Dynamic Shipping System
          </h1>
          <p className="text-mainColor text-xl font-normal leading-7 max-w-[580px] mb-5">
            market leading express delivery and logistics services to the Middle East and other
            emerging economies. As a leading global provider of comprehensive logistics and
            transportation solutions, our breadth of services include express courier delivery,
            freight forwarding, logistics, supply chain management, e-commerce .
          </p>
        </div>
        {/* image */}
        <div className="max-w-3xl">
          <img src={mainImage} alt="shiping delivery" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Home;
