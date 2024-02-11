export default function Header() {
  return (
    <div className="w-full">
      <div className="w-1/2">
        <img
          src="/images/me_nobg.png"
          alt="Stevie Dean"
          className="absolute left-1/4 bottom-3/4"
          width="15%"
        />
        <h1 className="absolute text-4xl font-bold left-[38%]  top-[12%]">
          Stevie Dean |
        </h1>
        <h2 className="absolute font-bold left-[51.4%] top-[13.2%] text-xl">
          Santa Clara CS '25 • Aspiring Software Engineer
        </h2>
      </div>
      <div className="absolute left-[54%] top-[18%] flex items-center">
        <a
          href="https://docs.google.com/document/d/1VTOeQvjoh9H5I34Ci9Hzr04WyFetJ8yR/edit?usp=sharing&ouid=104446278302311002073&rtpof=true&sd=true"
          target="_blank"
          className="text-chill-blue social-link mr-4"
        >
          Resume
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="https://www.linkedin.com/in/stephendean4/"
          target="_blank"
          className="text-chill-blue social-link mx-4"
        >
          LinkedIn
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="https://github.com/sage31"
          target="_blank"
          className="text-chill-blue social-link ml-4"
        >
          GitHub
        </a>
      </div>

      <hr
        className="w-1/2 absolute top-1/4 left-1/4 mx-auto"
        height="10px"
      ></hr>
    </div>
  );
}
