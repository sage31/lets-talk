export default function Header() {
  return (
    <div className="relative w-[95%] pt-10 laptop:pt-0 laptop:w-[59%] mx-auto">
      <div className="w-full flex items-end">
        <img
          src="./lets-talk/images/me_nobg.png"
          alt="Stevie Dean"
          className="inline w-[23%]  laptop:w-[23%] left-[0%] laptop:pr-4 aspect-auto"
        />
        <div className="self-center ml-3 mt-3 laptop:ml-0 laptop:mt-0 laptop:pt-10">
          <div>
            <span className="inline flex max-se:text-sm text-lg laptop:text-3xl lg:text-4xl font-bold">
              Stevie Dean |&nbsp;
              <div className="text-xs font-semibold laptop:text-lg lg:text-2xl flex items-center mt-1 laptop:items-end">
                <a
                  href="https://docs.google.com/document/d/1VTOeQvjoh9H5I34Ci9Hzr04WyFetJ8yR/edit?usp=sharing&ouid=104446278302311002073&rtpof=true&sd=true"
                  target="_blank"
                  rel="noreferrer"
                  className="inline text-chill-blue social-link mr-2 laptop:mr-4"
                >
                  Resume
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://www.linkedin.com/in/stephendean4/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline text-chill-blue social-link mx-2 laptop:mx-4"
                >
                  LinkedIn
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://github.com/sage31"
                  target="_blank"
                  rel="noreferrer"
                  className="inline text-chill-blue social-link ml-2 laptop:ml-4"
                >
                  GitHub
                </a>
              </div>
            </span>
            <h2 className="font-bold text-xs laptop:text-xl lg:text-xl lg:mt-2">
              Santa Clara CS '25 • Aspiring Software Engineer
            </h2>
          </div>
        </div>
      </div>

      <hr className="w-[95%] absolute w-full top-[100%]" height="10px"></hr>
    </div>
  );
}
