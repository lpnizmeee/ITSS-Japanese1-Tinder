import logo from "../assets/img/logo.png";
export const Loader = () => {
  return (
    <div className="pointer-events-none fixed z-50 flex h-screen w-full animate-[opacity_2s_forwards] items-center justify-center bg-gradient-to-r from-darkPink to-coralRed">
      <div>
        <img
          src={logo}
          alt="ロゴ"
          className="animate-ping h-20 w-auto"
        />
      </div>
    </div>
  );
};
