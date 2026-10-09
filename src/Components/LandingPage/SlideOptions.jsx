
import { X, ChevronRight } from "lucide-react";
import { useState } from "react";

function SlideOptions({ open, onClose }) {
  const [modelsOpen, setModelsOpen] = useState(false);

  return (
    <div
      className={`
        fixed inset-0 z-[100]
        bg-black text-white
        transition-all duration-500
        ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }
      `}
    >

      {/* TOP BAR */}
      <div className="flex h-20 items-center justify-between px-6 md:px-10 lg:px-12">


        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            text-white
            transition-opacity
            hover:opacity-50
          "
          aria-label="Close menu"
        >
          <X
            size={30}
            strokeWidth={1.5}
          />
        </button>

      </div>


      {/* MENU CONTENT */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto">

        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">

          <nav className="flex flex-col">

            {/* MODELS */}
            <div className="border-b border-white/20">

              <button
                onClick={() => setModelsOpen(!modelsOpen)}
                className="
                  flex w-full
                  items-center justify-between
                  py-6
                  text-left
                  text-2xl
                  font-light
                  uppercase
                  tracking-[2px]
                  transition-opacity
                  hover:opacity-50
                  md:text-4xl
                "
              >
                <span>Models</span>

                <ChevronRight
                  size={28}
                  strokeWidth={1}
                  className={`
                    transition-transform duration-300
                    ${modelsOpen ? "rotate-90" : ""}
                  `}
                />
              </button>


              {/* MODELS SUB MENU */}
              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-500
                  ${
                    modelsOpen
                      ? "max-h-96 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <div className="flex flex-col gap-4 pl-4 md:pl-8">

                  <a
                    href="#revuelto"
                    onClick={onClose}
                    className="
                      text-sm
                      uppercase
                      tracking-[2px]
                      text-gray-400
                      transition-colors
                      hover:text-white
                      md:text-base
                    "
                  >
                    Revuelto
                  </a>

                  <a
                    href="#temerario"
                    onClick={onClose}
                    className="
                      text-sm
                      uppercase
                      tracking-[2px]
                      text-gray-400
                      transition-colors
                      hover:text-white
                      md:text-base
                    "
                  >
                    Temerario
                  </a>

                  <a
                    href="#urus"
                    onClick={onClose}
                    className="
                      text-sm
                      uppercase
                      tracking-[2px]
                      text-gray-400
                      transition-colors
                      hover:text-white
                      md:text-base
                    "
                  >
                    Urus
                  </a>

                </div>
              </div>

            </div>


            {/* OTHER MENU ITEMS */}

            <a
              href="#ownership"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Ownership
            </a>


            <a
              href="#dealerships"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Dealerships
            </a>


            <a
              href="#beyond"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Beyond
            </a>


            <a
              href="#company"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Company
            </a>


            <a
              href="#motorsport"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Motorsport
            </a>


            <a
              href="#museum"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Museum
            </a>


            <a
              href="#store"
              onClick={onClose}
              className="
                border-b border-white/20
                py-6
                text-2xl
                font-light
                uppercase
                tracking-[2px]
                transition-opacity
                hover:opacity-50
                md:text-4xl
              "
            >
              Store
            </a>

          </nav>

        </div>

      </div>
    </div>
  );
}

export default SlideOptions;

