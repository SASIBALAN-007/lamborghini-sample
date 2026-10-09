
function ModelCard({
  name,
  subtitle,
  image,
  description,
  reverse = false,
}) {
  return (
    <article className="group relative min-h-[75vh] w-full overflow-hidden bg-black">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            group-hover:scale-105
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 transition-all duration-700 group-hover:bg-black/30" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Side gradient */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-gradient-to-r from-black/50 to-transparent ${
            reverse ? "right-0 rotate-180" : "left-0"
          }`}
        />
      </div>

      {/* Content */}
      <div
        className={`
          relative z-10
          flex min-h-[75vh]
          items-end
          px-6 py-12
          md:px-12 md:py-16
          lg:px-16 lg:py-20
          ${reverse ? "justify-end" : "justify-start"}
        `}
      >
        <div
          className={`
            w-full
            max-w-xl
            ${reverse ? "text-right" : "text-left"}
          `}
        >
          {/* Subtitle */}
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[4px] text-white/60 md:text-xs">
            {subtitle}
          </p>

          {/* Model Name */}
          <h3
            className="
              text-6xl
              font-light
              uppercase
              leading-[0.85]
              tracking-[-3px]
              text-white
              transition-transform
              duration-700
              group-hover:-translate-y-2
              md:text-8xl
              lg:text-[9rem]
            "
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className={`
              mt-7
              max-w-lg
              text-sm
              leading-7
              text-white/70
              md:text-base
              ${reverse ? "ml-auto" : ""}
            `}
          >
            {description}
          </p>

          {/* Buttons */}
          <div
            className={`
              mt-8
              flex
              flex-wrap
              gap-3
              ${reverse ? "justify-end" : "justify-start"}
            `}
          >
            <button
              className="
                border
                border-white
                bg-white
                px-7
                py-4
                text-[10px]
                font-medium
                uppercase
                tracking-[2px]
                text-black
                transition-all
                duration-300
                hover:bg-transparent
                hover:text-white
              "
            >
              Explore Model
            </button>

            <button
              className="
                border
                border-white/50
                px-7
                py-4
                text-[10px]
                font-medium
                uppercase
                tracking-[2px]
                text-white
                transition-all
                duration-300
                hover:border-white
                hover:bg-white
                hover:text-black
              "
            >
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Model number */}
      <div
        className={`
          absolute
          top-8
          z-20
          text-[10px]
          uppercase
          tracking-[3px]
          text-white/40
          md:top-12
          ${reverse ? "right-6 md:right-12 lg:right-16" : "left-6 md:left-12 lg:left-16"}
        `}
      >
        Lamborghini / {name}
      </div>

      {/* Scroll/line decoration */}
      <div
        className={`
          absolute
          bottom-10
          z-20
          hidden
          h-px
          w-24
          bg-white/30
          md:block
          ${reverse ? "right-6 md:right-12 lg:right-16" : "left-6 md:left-12 lg:left-16"}
        `}
      />
    </article>
  );
}

export default ModelCard;
