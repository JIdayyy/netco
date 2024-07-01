import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAppContext } from '$contexts/AppContext';

export default function SignIn() {
  const router = useRouter();
  const { handleSignIn } = useAppContext();
  return (
    <div className={'text-white relative w-screen bg-background h-screen flex'}>
      <div
        className={
          'absolute tablet:h-screen top-0 left-0 brightness-10  tablet:relative flex items-center align-middle justify-center w-full z-0 tablet:w-1/2 h-full'
        }
      >
        <Image
          layout={'fill'}
          className={'object-cover brightness-[01]'}
          src={
            'https://dev-onrewind.imgix.net/thumbnails/1c08d7e1-0b44-4874-b10c-a72e55b23c24/img-59554.png'
          }
        />
      </div>

      <div className="flex z-10 flex-grow items-center min-h-screen ">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <Image
                className={'cursor-pointer !hidden tablet:!block'}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                src={
                  'https://assets-eu-01.kc-usercontent.com:443/604c2fe8-9bc6-010e-8c13-73c42e66ce87/2e8ef975-6ffa-45f5-a37d-b5fa705b2e6e/HOR_OriginsLogo_WHITE%403x.png'
                }
                alt={'origins digital logo'}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                width={150}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                height={50}
              />
              <p className="text-white">Sign in to access your account</p>
            </div>
            <div className="m-7">
              <form action="">
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-slate-100 focus:border-slate-300 dark:bg-gray-700 text-black dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-white">
                      Password
                    </label>
                    <a
                      href="#!"
                      className="text-sm text-white focus:outline-none focus:text-slate-500 hover:text-slate-500 "
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-slate-100 focus:border-slate-300 dark:bg-gray-700 text-black dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <button
                    onClick={() => {
                      handleSignIn();
                      router.push('/');
                    }}
                    type="button"
                    className="w-full px-3 py-4 text-white bg-primary rounded-md focus:bg-slate-600 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-sm text-center text-white">
                  Don&apos;t have an account yet?{' '}
                  <a href="#!" className="text-primary focus:outline-none focus: ">
                    Sign up
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
