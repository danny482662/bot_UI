import Image from 'next/image';
import landing_image from '@/images/landing-page-pic.jpg';
import ButtonLead from './ButtonLead';

const MainHero = () => {

  return (
    <section className="max-w-screen-2xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row justify-between gap-16 lg:gap-20 pt-12 pb-10 sm:pt-10 lg:pb-20">
      <div className="mx-auto max-w-3xl flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-5xl lg:text-6xl xl:text-7xl tracking-tight text-slate-100">
          Unlock the Power of Automated Trading 🦾 
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 bg-clip-text text-transparent"> Financial Freedom </span> with 
          <span className="bg-gradient-to-r from-red-500 via-red-300 to-red-400 bg-clip-text text-transparent"> No-Code Trading Bots </span>! 💸
        </h1>
        <p className="text-xl opacity-80 leading-relaxed">
          The easiest way to run & monitor your trading bot. Leave the emotions out of your way!
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <ButtonLead extraStyle="mt-4 lg:mt-0" />
          <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2">
            <p className="text-sm md:text-base text-center lg:text-left lg:ml-4">
              👈  Add your email to get notified when we go fully live!
            </p>
            <div className="text-sm md:text-base flex items-center gap-2">
              <div className="component-iconify text-green-500" style={{ width: 20, height: 20 }}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--mingcute" width="20" height="20" viewBox="0 0 24 24">
                  <g fill="none">
                    <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                    <path fill="currentColor" d="M15 2a5 5 0 0 1 4.49 2.799l.094.201H21a1 1 0 0 1 .9 1.436l-.068.119l-1.552 2.327a1 1 0 0 0-.166.606l.014.128l.141.774c.989 5.438-3.108 10.451-8.593 10.606l-.262.004H3a1 1 0 0 1-.832-1.555l3.992-6.01l2.012-2.995l1.441-2.163A2.3 2.3 0 0 0 10 7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-2.995 2.824L12 7a4.3 4.3 0 0 1-.493 2A3.5 3.5 0 0 1 15 12.5c0 1.368-.675 2.43-1.582 3.227c-.889.78-2.051 1.356-3.2 1.806c-.826.323-1.686.596-2.489.835l-1.945.565L5.56 19h5.853c4.368 0 7.669-3.955 6.887-8.252l-.14-.774a3 3 0 0 1 .455-2.201L19.131 7c-.54 0-1.072-.154-1.226-.75A3.002 3.002 0 0 0 15 4m-3.5 7c-.271 0-.663.07-1.036.209c-.375.14-.582.295-.654.378l-3.384 5.077c.998-.287 2.065-.603 3.063-.994c1.067-.417 1.978-.892 2.609-1.446c.612-.537.902-1.092.902-1.724a1.5 1.5 0 0 0-1.5-1.5M15 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2"></path>
                  </g>
                </svg>
              </div>
              <span>
                <span className="text-green-500">-100% off</span> for the first 15 customers <u>forever</u>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl w-full relative mx-auto">
        <Image
          alt="Profits Up"
          src={landing_image}
          fill
          className="rounded-xl sm:rounded-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default MainHero;
