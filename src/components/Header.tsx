export default function Header() {
  const RESUME_URL = `https://docs.google.com/document/d/11OdNfTwyVy1r4Cw_RiOcNZXbNFCecW_f/edit?usp=sharing&ouid=104446278302311002073&rtpof=true&sd=true`;
  const LINKEDIN_URL = `https://www.linkedin.com/in/swdean/`;
  const GITHUB_URL = `https://github.com/sage31`;

  return (
    <div className=" mx-auto w-[95%] pt-4 laptop:w-[59%] laptop:pt-2">
      <div className="flex w-full items-end">
        <img
          src={`/lets-talk/images/me_no_bg.png`}
          alt="Stevie Dean"
          className="inline aspect-auto w-[23%] laptop:pr-4"
        />
        <div className="ml-1 mt-3 self-center laptop:ml-0 laptop:mt-0">
          <div>
            <span className="laptop:text-lgl inline flex text-lg font-light ">
              Stevie Dean |&nbsp;
              <div className="text-md laptop:text-mdl mt-2 flex items-center font-light ">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link mr-2 inline text-chill-blue laptop:mr-4"
                >
                  Resume
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link mx-2 inline text-chill-blue laptop:mx-4"
                >
                  LinkedIn
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link ml-2 inline text-chill-blue laptop:ml-4"
                >
                  GitHub
                </a>
              </div>
            </span>
            <h2 className="text-md laptop:text-mdl font-light lg:mt-2 ">
              Santa Clara CS '25 • Aspiring Software Engineer
            </h2>
          </div>
        </div>
      </div>
      <hr className="w-full"></hr>
    </div>
  );
}
