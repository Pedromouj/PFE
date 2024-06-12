import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({
  heading,
  children,
  isOpen,
  setIsOpen,
  withExitButton = true,
  maxWidth = "600px",
  colorButton = "",
  addedPosition = "" ,
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 modal" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className={`fixed inset-0 overflow-y-auto ${addedPosition !== "" ? addedPosition : "left-[14rem]"}`}>
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
              <Dialog.Panel
                className={`w-full transform overflow-hidden rounded-lg color bg-white  p-3 text-left align-middle shadow-xl transition-all`}
                style={{ maxWidth }}
              >
                {withExitButton && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    <span className="mr-5">{heading}</span>
                    <button
                      onClick={closeModal}
                      className={`p-1 rounded-md cursor-pointer ${
                        colorButton !== "" ? colorButton : "text-gray-100 bg-gray-600"
                      }`}
                    >
                      <XMarkIcon className="h-5 cursor-pointer " />
                    </button>
                  </Dialog.Title>
                )}
                <div className="mt-2 w-full">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
