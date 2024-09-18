"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleLogo from "@/images/google-logo.png";
import config from "@/config";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceId?: string;
}

const AuthModal = ({ isOpen, onClose, priceId }: AuthModalProps) => {
  const handleSignIn = () => {

    let callbackUrl = "/";
    
    if (priceId === null || priceId === undefined) {
      callbackUrl = `${window.location.origin}/pricing`;
    } else {
      callbackUrl = `${window.location.origin}/pricing?redirectToCheckout=true&priceId=${priceId}`;
    }

    signIn("google", { callbackUrl });
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-focus bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Sign In to Continue
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-center text-gray-500">
                    Your First Step To Accessing The Trading Bot Is Signing With Google
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    className="btn btn-gradient-green flex items-center gap-2"
                    onClick={handleSignIn}
                  >
                    <Image src={googleLogo} alt="Google logo" width={20} height={20} />
                    Sign in with Google
                  </button>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="btn btn-ghost"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
