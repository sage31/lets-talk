import { Textfit } from "react-textfit";

export default function Header() {
  return (
    <div className="relative mx-auto w-[95%] pt-10 laptop:w-[59%] laptop:pt-0">
      <div className="flex w-full items-end">
        <img
          src="./images/me_nobg.png"
          alt="Stevie Dean"
          className="inline aspect-auto w-[23%] laptop:pr-4"
        />
        <div className="ml-1 mt-3 self-center laptop:ml-0 laptop:mt-0 laptop:pt-10">
          <div>
            <Textfit mode="single">
              <span className="inline flex text-lg font-light max-se:text-xs laptop:text-3xl lg:text-4xl">
                Stevie Dean |&nbsp;
                <div className="mt-1 flex items-center text-xs font-light laptop:items-end laptop:text-lg lg:text-2xl">
                  <a
                    href="https://docs.google.com/document/d/1VTOeQvjoh9H5I34Ci9Hzr04WyFetJ8yR/edit?usp=sharing&ouid=104446278302311002073&rtpof=true&sd=true"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link mr-2 inline text-chill-blue laptop:mr-4"
                  >
                    Resume
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href="https://www.linkedin.com/in/stephendean4/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link mx-2 inline text-chill-blue laptop:mx-4"
                  >
                    LinkedIn
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href="https://github.com/sage31"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link ml-2 inline text-chill-blue laptop:ml-4"
                  >
                    GitHub
                  </a>
                </div>
              </span>
            </Textfit>
            <h2 className="text-xs font-light laptop:text-xl lg:mt-2 lg:text-xl">
              Santa Clara CS '25 • Aspiring Software Engineer
            </h2>
          </div>
        </div>
      </div>

      <hr className="absolute top-[100%] w-[95%] w-full" height="10px"></hr>
    </div>
  );
}
