import { useState } from "react";
import logo_withcap from "../assets/img/logo_withcap.png";

export function Nav() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const decoLinks = [
    {
      name: "お問い合わせ",
      to: "/",
    },
    {
      name: "Q&A",
      to: "/",
    },
    {
      name: "約",
      to: "/",
    },
  ];

  return (
    <>
      <nav
        className={`flex items-center justify-between box-border w-full absolute p-[2rem]`}
      >
        <a href="/" title="ホームページに移動">
          <img
            src={logo_withcap}
            alt="ロゴ"
            className="h-20 w-auto"
          />
        </a>

        <div
          className={`flex items-center transition-all justify-center h-screen w-full absolute left-0 top-0  bg-black/50 backdrop-blur-md z-1 lg:flex lg:ml-0 lg:h-0 lg:static lg:justify-end ${isMenuClicked ? "ml-0" : "ml-[-100%]"
            }`}
        >
          <ul className="flex items-center flex-col lg:flex-row">
            {decoLinks.map((link, index) => (
              <li className="my-5 lg:my-0 lg:ml-10" key={index}>
                <a
                  className="text-white text-[20px] underline lg:no-underline font-[200] hover:text-darkPink hover:underline"
                  href={link.to}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/login"
                className="bg-white rounded-[30px] text-black text-xl lg:ml-10 my-7 lg:my-0 text-[20px] font-bold py-3 px-6"
              >
                ログイン
              </a>
            </li>
          </ul>
        </div>

        <div
          className={`lg:hidden`}
          onClick={() => {
            setIsMenuClicked(!isMenuClicked);
          }}
        >
          <div
            className={` transition-all rounded-md h-1 w-9 before:content-[''] before:absolute before:h-1 before:bg-white before:w-9  after:content-[''] after:absolute after:h-1 after:w-9  after:bg-white 
                  ${isMenuClicked
                ? "bg-transparent rotate-[360deg] after:rotate-[-45deg]  before:rotate-45 before:translate-y-0 after:translate-y-0"
                : "bg-white before:translate-y-[-10px] after:translate-y-[10px]"
              }
                  `}
          ></div>
        </div>
      </nav>
    </>
  );
}
